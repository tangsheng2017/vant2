import axios from "axios";
// import md5 from "js-md5";
// import store from "@/store";
// import router from "@/router";
// import { utils } from "@/utils";
// const qs = require("qs");
import { Toast } from "vant";

// 需要在控制台打印请求参数和响应结果时，设置 isDebugRequest 为 true，否则为 false
const isDebugRequest = process.env.NODE_ENV === "development";
// const isDebugRequest = false

// create an axios instance
const service = axios.create({
  timeout: 5000 // request timeout
});
if (process.env.NODE_ENV !== "development") {
  service.defaults.baseURL = process.env.VUE_APP_BASE_API; // url = base url + request url
}

/**
 * request 拦截器
 * */
// 请求拦截器配置
service.interceptors.request.use(
  (config) => {
    // 在发送请求前做点什么
    Toast.loading({
      message: "加载中...",
      forbidClick: true
    });
    if (isDebugRequest) {
      config.url = `/api/${config.url}`;
    }
    return config;
  },
  (error) => {
    Toast.clear();
    // 请求出错时做点什么
    return Promise.error(error);
  }
);

// response 响应拦截
service.interceptors.response.use(
  (response) => {
    Toast.clear();
    return response;
  },
  (error) => {
    Toast.clear();
    return Promise.reject(error);
  }
);

export default service;
