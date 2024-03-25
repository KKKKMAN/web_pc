import Vue from "vue";
import { Rate, Upload } from 'element-ui';
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";
import "@/utils/drag";
import "@/utils/videodrag";
// 图片预览查看
import preview from "vue-photo-preview";
import "vue-photo-preview/dist/skin.css";
import "@/utils/orderStatus";
// import * as mqtt from "mqtt/dist/mqtt";
import 'element-ui/lib/theme-chalk/index.css';
// import socketApi from "@/utils/websocket";
// Vue.prototype.$socketApi = socketApi;

// Vue.use(mqtt);
Vue.use(Rate);
Vue.use(Upload);

let options = {
    fullscreenEl: false, //控制是否显示右上角全屏按钮
    bgOpacity: 0.85,
    closeEl: false, //控制是否显示右上角关闭按钮
    tapToClose: true, //点击滑动区域应关闭图库
    shareEl: false, //控制是否显示分享按钮
    zoomEl: false, //控制是否显示放大缩小按钮
    counterEl: false, //控制是否显示左上角图片数量按钮
    arrowEl: true, //控制如图的左右箭头（pc浏览器模拟手机时）
    tapToToggleControls: false, //点击应切换控件的可见性
    clickToCloseNonZoomable: true, //点击图片应关闭图库，仅当图像小于视口的大小时
};
Vue.use(preview, options);
Vue.use(preview);
// import api from "./utils/api";
// Vue.prototype.$api = api;
//
Vue.config.productionTip = false;
// 路由判断登录 根据路由配置文件的参数
router.beforeEach((to, from, next) => {
    if (to.path !== "/") {
        sessionStorage.setItem("ulShow", false);
    } else {
        sessionStorage["ulShow"] = true;
    }
    if (to.matched.some((record) => record.meta.requireAuth)) {
        // 判断该路由是否需要登录权限
        if (!localStorage.getItem("token")) {
            // 判断当前的token是否存在 ； 登录存入的token
            next({
                path: "/pc/loginpage",
                // query: { redirect: to.fullPath },
            });
        } else {
            next();
        }
    } else {
        next();
    }
});
Vue.use(ViewUI);
new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
