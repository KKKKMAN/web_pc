<template>
  <div class="loginBox">
    <div class="loginTop">
      <div>
        <img src="../assets/logow.png" alt="" />
      </div>
      <div>欢迎登录</div>
      <div>
        <div><img src="../assets/videlo.png" alt="" />视频购物</div>
        <div><img src="../assets/anq.png" alt="" />安全放心</div>
      </div>
    </div>
    <div class="loginForm">
      <transition name="component-fade" mode="out-in">
        <component
          :is="isShow"
          @isShowInfo="ishowInfo"
          @isShowInfoSign="isShowInfoSignInfo"
        ></component>
      </transition>
    </div>
    <div class="copyrightText">copyright © 2004-2024 航科云端超市版权所有</div>
  </div>
</template>

<script>
import logIn from "../components/logIn";
import signIn from "../components/signIn";
export default {
  name: "loginpage",
  components: { logIn, signIn },
  props: {},
  data() {
    return {
      isShow: signIn,
    };
  },
  created() {},
  mounted() {
    var playLoginShow = localStorage.getItem("playLogin");
    if (playLoginShow == "true") {
      this.isShow = logIn;
    } else {
      this.isShow = signIn;
    }
  },
  methods: {
    ishowInfo() {
      this.isShow = logIn;
    },
    isShowInfoSignInfo() {
      this.isShow = signIn;
    },
  },
};
</script>
<style lang="scss" scoped>
.loginBox {
  width: 100%;
  height: 100vh;
  background: url("../assets/loginimg.png") no-repeat center;
  background-size: 100%;
  background-position: 0 100px;
  background-attachment: fixed;
  position: relative;
  .loginTop {
    height: 100px;
    padding: 0 235px 0 300px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > div:nth-child(1) {
      width: 96px;
      height: 96px;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    > div:nth-child(2) {
      flex: 1;
      text-align: left;
      padding-left: 20px;
      font-size: 28px;
      font-weight: bold;
    }
    > div:nth-child(3) {
      display: flex;
      align-items: center;
      font-size: 14px;
      > div {
        display: flex;
        align-items: center;
        img {
          width: 20px;
          height: 20px;
          margin-right: 8px;
        }
      }
      div:nth-child(1) {
        margin-right: 30px;
      }
    }
  }
  .loginForm {
    width: 350px;
    background-color: #fff;
    padding: 30px 25px;
    position: absolute;
    right: 200px;
    top: 190px;
    border-radius: 10px;
    :deep(.component-fade-enter-active, .component-fade-leave-active) {
      transition: opacity 0.3s ease;
    }
    :deep(.component-fade-enter, .component-fade-leave-to) {
      opacity: 0;
    }
  }
  .copyrightText {
    position: absolute;
    bottom: 150px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 14px;
  }
}
</style>
