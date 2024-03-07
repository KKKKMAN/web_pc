<template>
  <div id="app">
    <Topindex v-if="this.show" />
    <router-view />
    <div class="sidebar_right" v-if="this.show" v-drag="this.vdrag">
      <div class="fu_stickyed_box">
        <div class="stickyed_box">
          <div @click="orderClick">
            <img src="./assets/wodedingdan_img.png" alt="" />
            我的订单
          </div>
          <div @click="shoppingCart">
            <img src="./assets/gouwuche_img.png" alt="" /> 购物车
          </div>
          <div @click="couponClick">
            <img src="./assets/youhuijuan_img.png" alt="" />
            优惠券
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Topindex from "./components/topindex";
export default {
  components: {
    Topindex,
  },
  props: {},
  data() {
    return {
      show: Boolean,
      vdrag: Boolean,
    };
  },
  watch: {
    $route(to, from) {
      if (to.path == "/pc/loginpage" || to.path == "/pc/404") {
        this.show = false;
        this.vdrag = false;
      } else {
        this.show = true;
        this.vdrag = true;
      }
      if (to.path == "/") {
        sessionStorage["checkedType"] = 2;
      }
    },
  },
  computed: {},
  created() {},
  mounted() {
    if (this.$route.path == "/pc/loginpage" || this.$route.path == "/pc/404") {
      this.show = false;
      this.vdrag = false;
    } else {
      this.show = true;
      this.vdrag = true;
    }
    window.onload = function () {
      window.addEventListener("scroll", function () {
        var scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop >= 800) {
          document.querySelector(".sidebar_right").style.right = "-50" + "px";
        } else {
          document.querySelector(".sidebar_right").style.right = "0" + "px";
        }
      });
    };
  },
  methods: {
    //  我的订单
    orderClick() {
      this.$router.push("/pc/order");
    },
    // 购物车
    shoppingCart() {
      this.$router.push("/pc/shoppingCart");
    },
    //优惠卷
    couponClick() {
      this.$router.push("/pc/mycoupon");
    },
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #fafafa;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
  // font-size: 15px;
  overflow-y: overlay;
}
.sidebar_right {
  z-index: 10;
  position: absolute;
  width: 50px;
  height: 100%;
  right: 0;
  top: 0;
  background-color: #2a2a2a;
  color: #fff;
  transition: all 0.3s ease-in-out;
  .fu_stickyed_box {
    width: 100%;
    height: 100%;
    position: relative;
    .stickyed_box {
      width: 100%;
      position: sticky;
      display: flex;
      flex-direction: column;
      align-items: center;
      top: 280px;
      > div {
        padding: 0 10px;
        writing-mode: vertical-rl;
        margin-bottom: 40px;
        cursor: pointer;
        img {
          margin-bottom: 8px;
        }
      }
      > div:hover {
        color: #ea6240;
      }
    }
  }
}
* {
  margin: 0;
  padding: 0;
}
/* 隐藏滚动条 */

::-webkit-scrollbar {
  width: 0;

  height: 0;

  background-color: transparent;
}

/* 隐藏滚动条轨道 */

::-webkit-scrollbar-track {
  background-color: transparent;
}

/* 隐藏滚动条滑块 */

::-webkit-scrollbar-thumb {
  background-color: transparent;
}
</style>
