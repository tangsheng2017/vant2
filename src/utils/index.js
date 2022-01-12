import {
  setlocalStorage,
  getlocalStorage,
  removelocalStorage,
  checklocalStorage
} from "@/utils/localStorage";

// 深拷贝
function deepCopy(obj) {
  var str,
    newobj = obj.constructor === Array ? [] : {};
  if (typeof obj !== "object") {
    return;
  } else if (window.JSON) {
    (str = JSON.stringify(obj)), //系列化对象
      (newobj = JSON.parse(str)); //还原
  } else {
    for (var i in obj) {
      newobj[i] = typeof obj[i] === "object" ? deepCopy(obj[i]) : obj[i];
    }
  }
  return newobj;
}

// 将 base64 转换为文件
function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}
// 将文件转换为 base64
function filetoDataURL(file, fun) {
  console.log(file);
  var imgobj = file;
  //创建文件读取相关的变量
  var imgFileBase64 = "";
  if (window.FileReader) {
    //创建读取文件的对象
    var reader = new FileReader();
    //为文件读取成功设置事件
    reader.onload = function (e) {
      //console.log("文件读取完成");
      imgFileBase64 = e.target.result;
      if (!!fun && !!imgFileBase64) {
        fun(imgFileBase64);
      }
    };
    //正式读取文件
    reader.readAsDataURL(imgobj);
  } else {
    if (!imgobj) {
      return;
    }
    // if(imgobj.size>300*1024){
    //   this.$alertShow('上传图片必须300K以内')
    //   return
    // }
    var imgsize = (imgobj.size / 1024).toFixed(0);
    var imageUrl = getObjectURL(imgobj);
    convertImgToBase64(
      imageUrl,
      function (imgele) {
        console.log(" console.log(imgele)");
        imgFileBase64 = imgele;
        if (!!fun && !!imgFileBase64) {
          fun(imgFileBase64);
        }
      },
      imgsize
    );
  }
}

function getObjectURL(file) {
  var url = null;
  if (window.createObjectURL != undefined) {
    // basic
    url = window.createObjectURL(file);
  } else if (window.URL != undefined) {
    // mozilla(firefox)
    url = window.URL.createObjectURL(file);
  } else if (window.webkitURL != undefined) {
    // web_kit or chrome
    url = window.webkitURL.createObjectURL(file);
  }
  return url;
}

function convertImgToBase64(url, callback, size) {
  var canvas = document.createElement("CANVAS");
  var ctx = canvas.getContext("2d");
  var img = new Image();
  size = parseInt(size);
  img.crossOrigin = "Anonymous";
  img.onload = function () {
    var width = img.width;
    var height = img.height;
    var rate = 1;
    if (width > 800 && size > 800) {
      rate = 800 / size;
    }
    canvas.width = width * rate;
    canvas.height = height * rate;
    ctx.drawImage(img, 0, 0, width, height, 0, 0, width * rate, height * rate);
    var dataURL = canvas.toDataURL("image/jpeg", 1);
    callback.call(this, dataURL);
    canvas = null;
  };
  img.src = url;
}

function isJSON(str) {
  if (typeof str == "string") {
    try {
      var obj = JSON.parse(str);
      if (typeof obj == "object" && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log("error：" + str + "!!!" + e);
      return false;
    }
  } else {
    return false;
  }
}

// 自定义判断元素类型
function toType(obj) {
  return {}.toString
    .call(obj)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase();
}
// 参数过滤函数
function filterNull(o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key];
    }
    if (toType(o[key]) === "string") {
      o[key] = o[key].trim();
    } else if (toType(o[key]) === "object") {
      o[key] = filterNull(o[key]);
    } else if (toType(o[key]) === "array") {
      o[key] = filterNull(o[key]);
    }
  }
  return o;
}
// 对象排序
function objKeySort(arys) {
  // 先用 Object 内置类的 keys 方法获取要排序对象的属性名，再利用 Array 原型上的 sort 方法对获取的属性名进行排序，newkey 是一个数组
  var newkey = Object.keys(arys).sort();
  var newObj = {}; // 创建一个新的对象，用于存放排好序的键值对
  // 遍历 newkey 数组
  for (var i = 0; i < newkey.length; i++) {
    // 向新创建的对象中按照排好的顺序依次增加键值对
    newObj[newkey[i]] = arys[newkey[i]];
  }
  return newObj; // 返回排好序的新对象
}

let common = {
  setlocalStorage: setlocalStorage,
  getlocalStorage: getlocalStorage,
  removelocalStorage: removelocalStorage,
  checklocalStorage: checklocalStorage,
  deepCopy: deepCopy,
  dataURLtoFile: dataURLtoFile,
  filetoDataURL: filetoDataURL,
  isJSON: isJSON,
  toType: toType,
  filterNull: filterNull,
  objKeySort: objKeySort
};

// 返回在 vue 模板中的调用接口
export default {
  install(Vue) {
    Vue.prototype.$common = common;
    Vue.common = common;
  },
  common: common
};

export { common };
