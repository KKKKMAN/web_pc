/************* vue2 *************/
import Vue from "vue";
// 1.参数一：指令的名称，定义时指令前面不需要写v-
// 2.参数二：是一个对象，该对象中有相关的操作函数
// 3.在调用的时候必须加v-
const drag = Vue.directive("videoDrag", {
  inserted(el) {
    el.addEventListener("mousedown", (e) => {
      el.style.cursor = "pointer";

      let x = e.pageX - el.offsetLeft;
      let y = e.pageY - el.offsetTop;

      const move = (e) => {
        el.style.left = e.pageX - x + "px";
        el.style.top = e.pageY - y + "px";
      };

      document.addEventListener("mousemove", move);

      window.addEventListener("mouseup", () => {
        el.style.cursor = "";
        document.removeEventListener("mousemove", move);
      });
    });
  },
});

export default drag;
