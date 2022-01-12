import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import common from "./utils/index";
import { Toast, Dialog, Button } from "vant";
import "vant/lib/index.css"; // 全局引入样式
Vue.use(Toast).use(Button);

console.log(process.env);

Vue.use(common);

Vue.config.productionTip = false;
Vue.prototype.$alertShow = (msg, fun, title) => {
  var tips = "";
  if (!title) {
    tips = "温馨提示";
  } else {
    tips = title;
  }
  Dialog.alert({
    title: tips,
    message: msg
  }).then(() => {
    if (fun) {
      fun();
    }
  });
};

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
