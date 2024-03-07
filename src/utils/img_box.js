export default function imgInfo() {
  // 图片盒子
  var cmm_img_box = document.querySelector(".cmm_img_box");
  // 遮罩层
  var opacity_box = document.querySelector(".opacity_box");
  // 大图显示盒子
  var big_img_box = document.querySelector(".big_img_box");
  cmm_img_box.addEventListener("mouseout", (e) => {
    opacity_box.style.display = "none";
    big_img_box.style.display = "none";
  });
  cmm_img_box.addEventListener("mouseover", (e) => {
    opacity_box.style.display = "block";
    big_img_box.style.display = "block";
  });
  cmm_img_box.addEventListener("mousemove", (e) => {
    var x = e.pageX - cmm_img_box.offsetLeft;
    var y = e.pageY - cmm_img_box.offsetTop;
    var opacityBoxX = x - opacity_box.offsetWidth / 2;
    var opacityBoxy = y - opacity_box.offsetHeight / 2;
    var coWidth = cmm_img_box.offsetWidth - opacity_box.offsetWidth;
    var coHeight = cmm_img_box.offsetHeight - opacity_box.offsetHeight;
    if (opacityBoxX <= 0) {
      opacityBoxX = 0;
    } else if (opacityBoxX >= coWidth) {
      opacityBoxX = coWidth;
    }
    if (opacityBoxy <= 0) {
      opacityBoxy = 0;
    } else if (opacityBoxy >= coHeight) {
      opacityBoxy = coHeight;
    }
    opacity_box.style.left = opacityBoxX + "px";
    opacity_box.style.top = opacityBoxy + "px";
    var big_img = document.querySelector(".big_img");
    var bigMax = big_img.offsetWidth - big_img_box.offsetWidth;
    //   大图片移动X轴
    var bigImgX = (opacityBoxX * bigMax) / coWidth;
    var bigImgY = (opacityBoxy * bigMax) / coHeight;
    big_img.style.left = -bigImgX + "px";
    big_img.style.top = -bigImgY + "px";
  });
}
