// 实现拖动的js
import Vue from "vue";
// 自定义拖拽指令，第一个参数'drag',即是拖拽指令名称
Vue.directive("drag", {
  bind: function (el) {
    const odiv = el;
    // 缓存 clientX clientY 的对象: 用于判断是点击事件还是移动事件
    const clientOffset = {};
    odiv.style.position = "fixed";
    // odiv.onmousedown = (e) => {
    //   const disX = e.clientX - odiv.offsetLeft;
    //   const disY = e.clientY - odiv.offsetTop;
    //   // 缓存 clientX clientY
    //   clientOffset.clientX = e.clientX;
    //   clientOffset.clientY = e.clientY;
    //   document.onmousemove = (e) => {
    //     const left = e.clientX - disX;
    //     const top = e.clientY - disY;
    //     // odiv.style.left = left + 'px'; // 放开该部分，可以进行全屏的拖拽
    //     odiv.style.right = "0px"; // 限制只能沿着右侧进行拖拽
    //     odiv.style.top = top + "px";
    //     // odiv 距离顶部的距离
    //     const dragDivTop =
    //       window.innerHeight - odiv.getBoundingClientRect().height;
    //     // odiv 距离左部的距离
    //     const dragDivLeft =
    //       window.innerWidth - odiv.getBoundingClientRect().width;
    //     // 边界判断处理
    //     // 2、超出顶部处理
    //     if (odiv.getBoundingClientRect().top <= 0) {
    //       odiv.style.top = "0px";
    //     }
    //     // 3、超出底部处理
    //     if (odiv.getBoundingClientRect().top >= dragDivTop) {
    //       odiv.style.top = dragDivTop + "px";
    //     }
    //     // 4、超出右边边界区域处理
    //     if (odiv.getBoundingClientRect().left >= dragDivLeft) {
    //       // odiv.style.left = dragDivLeft + 'px'; // 放开该部分，可以进行全屏的拖拽
    //       odiv.style.right = "0px"; // 限制只能沿着右侧进行拖拽
    //     }
    //     // 5、超出左边边界区域处理
    //     if (odiv.getBoundingClientRect().left <= 0) {
    //       // odiv.style.left = '0px'; // 放开该部分，可以进行全屏的拖拽
    //       odiv.style.right = "0px"; // 限制只能沿着右侧进行拖拽
    //     }
    //   };
    //   document.onmouseup = () => {
    //     document.onmousemove = null;
    //     document.onmouseup = null;
    //   };
    // };
    // 绑定鼠标松开事件
    // odiv.addEventListener("mouseup", (event) => {
    //   const clientX = event.clientX;
    //   const clientY = event.clientY;
    //   if (
    //     clientX === clientOffset.clientX &&
    //     clientY === clientOffset.clientY
    //   ) {
    //     return false;
    //     // console.log('click 事件');
    //   } else {
    //     return false;
    //     // console.log('drag 事件');
    //   }
    // });
  },
});
