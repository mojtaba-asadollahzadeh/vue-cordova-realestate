import "@babel/polyfill";
import Vue from "vue";
import "./plugins/vuetify";
import "./plugins/vuetify-extra";
import App from "./App.vue";
import router from "./router/";
import i18n from "./i18n";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";

window.$ = window.jQuery = require("jquery");
Vue.config.productionTip = false;
window.API = "http://keyten:8888/api/v1.0"; //"http://keyten:8888/api/v1.0";
window.KEYTEN = "http://keyten:8888"; //"http://keyten:8888"; //
window.language = JSON.parse(window.localStorage.getItem("language"));
window.lang = window.localStorage.getItem("lang");

const init = () => {
  new Vue({
    router,
    i18n,
    render: h => h(App)
  }).$mount("#app");
};

// Wait for the deviceready event to start the render
document.addEventListener("deviceready", () => {
  // eslint-disable-next-line
  console.log("Ready, Render the App");
  init();
});

// If we are not in Cordova, manually trigger the deviceready event
const isCordovaApp = typeof window.cordova !== "undefined";
if (!isCordovaApp) {
  document.dispatchEvent(new CustomEvent("deviceready", {}));
}
