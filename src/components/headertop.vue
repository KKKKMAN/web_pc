<template>
  <div class="headerTop">
    <div class="headerDiv">
      <span v-if="!nuerName" @click="playLoginInfo">你好，请登录</span>
      <span @click="outLoginInfo" v-else
        >你好，{{
          nuerName.replace(nuerName.substring(3, 8), "****")
        }}[退出]</span
      >
      <span v-else class="signin" @click="loginInfo">免费注册</span>
      <span @click="orderInfo">我的订单</span>|<span @click="shoppingcart"
        >购物车</span
      >
    </div>
  </div>
</template>

<script>
import { unlogin } from "@/utils/api";
export default {
  name: "headertop",
  components: {},
  props: {},
  data() {
    return {
      nuerName: "",
      unLogin: {
        avatar: "",
        id: "",
        nickname: "",
        status: "",
        token: "",
        username: "",
      },
    };
  },
  created() {},
  mounted() {
    this.nuerName = localStorage.getItem("username");
  },
  methods: {
    loginInfo() {
      localStorage.setItem("playLogin", "false");
      this.$router.push({ path: "/pc/loginpage" });
    },
    playLoginInfo() {
      localStorage.setItem("playLogin", "true");
      this.$router.push({
        path: "/pc/loginpage",
      });
    },
    // 我的订单
    orderInfo() {
      this.$router.push("/pc/order");
    },
    // 购物车
    shoppingcart() {
      this.$router.push("/pc/shoppingCart");
    },
    // 退出登录
    outLoginInfo() {
      unlogin(this.unLogin).then((res) => {
        if (res.status == 200) {
          localStorage.removeItem("token");
          localStorage.removeItem("id");
          localStorage.removeItem("nickname");
          localStorage.removeItem("status");
          localStorage.removeItem("username");
          localStorage.removeItem("avatar");
          this.$Message.success("退出成功");
          this.$router.push({ path: "/pc/loginpage" });
        }
      });
    },
  },
  watch: {},
};
</script>
<style lang="scss">
.headerTop {
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #555555;
  background-color: #f8f8f8;
  // position: sticky;
  // top: 0;
  .headerDiv {
    width: 1280px;
    display: flex;
    justify-content: flex-start;
    display: grid;
    grid-auto-flow: column;
    column-gap: 16px;
    span:hover {
      color: #ec808d;
    }
  }
  .signin {
    color: #ec808d;
  }
  div {
    span:hover {
      cursor: pointer;
    }
  }
}
</style>
