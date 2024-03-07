// 帮我写一个axios 封装
import axios from "axios";
import { message } from "@/utils/message";
// 创建一个axios实例
const request = axios.create({
  baseURL: "http://ylapi.yitaoshouyin.com:8089",
  // baseURL: "/api",
  timeout: 1000 * 12,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});
// 全局配置
const tip = (type, msg) => {
  message[type]({
    top: 50,
    content: msg,
    duration: 5,
  });
};
// 跳转登录页
const toLogin = () => {
  // router.replace({
  //   path: "/loginpage",
  //   query: {
  //     redirect: router.currentRoute.value.fullPath,
  //   },
  // });
  this.$Message.confirm({
    title: "提示",
    content: "用户信息已过期，请重新登录！",
    onOk: () => {
      this.$Message.info("提示");
    },
  });
};
// 状态码判断
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    case 401:
    case 403:
      // tip((type = "warning"), (msg = "登录过期，请重新登录"));
      localStorage.clear();
      // setTimeout(() => {
      //   _this.$Message.confirm({
      //     title: "提示",
      //     content: "用户信息已过期，请重新登录！",
      //     onOk: () => {
      //       this.$Message.info("提示");
      //     },
      //   });
      // }, 1000);
      break;
    case 404:
      // tip((type = "error"), (msg = "请求的资源未找到"));
      break;
    default:
  }
};
// 请求拦截
request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.CSMToken = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截
request.interceptors.response.use(
  (response) => {
    // 状态码判断
    if (response.status === 200) {
      return Promise.resolve(response.data);
    } else if (response.status === 201) {
    }
    return Promise.reject(response);
  },
  (error) => {
    // 不在200范围
    if (error.response) {
      errorHandle(error.response.status, error.response.data.message);
    }
    // 断网处理
    if (!window.navigator.onLine) {
      // 断网时，显示断网组件
      return Promise.reject(error);
    } else {
      // 联网时，隐藏断网组件
    }
    return Promise.reject(error);
  }
);

export default request;
