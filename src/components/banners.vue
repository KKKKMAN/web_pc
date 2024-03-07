<template>
  <div class="bannersBox">
    <div class="bannersTabs">
      <!-- <div v-for="(v, i) in routerList" :key="i">
        <input type="radio" :id="v.type" name="tabs" :checked="v.checked" />
        <label class="tab" :for="v.type" @click="recommendclick(v)">{{
          v.name
        }}</label>
      </div> -->
      <div
        class="tabs_list"
        :class="v.checked ? 'active' : ''"
        v-for="(v, i) in routerList"
        :key="i"
        @click="clickInfo(v)"
      >
        {{ v.name }}
      </div>
      <!-- <ul v-if="this.$route.path == '/'">
        <li>服装店</li>
        <li>药店</li>
        <li>生鲜蔬果店</li>
        <li>烤肉店</li>
        <li>便利店</li>
        <li>卤肉熟食店</li>
        <li>早餐店</li>
        <li>火锅店</li>
      </ul> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "banners",
  components: {},
  props: {},
  data() {
    return {
      routerList: [
        // {
        //   name: "门店分类",
        //   type: "1",
        //   checked: true,
        //   path: "/",
        // },
        {
          name: "首页推荐",
          type: "1",
          checked: true,
          path: "/pc",
        },
        {
          name: "我的订单",
          type: "2",
          checked: false,
          path: "/pc/order",
        },
        {
          name: "我的优惠卷",
          type: "3",
          checked: false,
          path: "/pc/mycoupon",
        },
        {
          name: "我的资料",
          type: "4",
          checked: false,
          path: "/pc/mymessage",
        },
      ],
      show: false,
    };
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {
    let chi = sessionStorage.getItem("checkedType");
    // this.routerList.forEach((v) => {
    //   if (v.type == checked.type) {
    //     v.checked = true;
    //     this.$router.push(`${v.path}`);
    //   }
    // });
    this.clickInfo(chi)
  },
  methods: {
    clickInfo(i) {
      this.routerList.forEach((v) => {
        if (v.type == i.type) {
          v.checked = true;
          let idata = JSON.stringify(i);
          sessionStorage.setItem("checkedType", idata);
          this.$router.push(`${i.path}`);
        } else {
          v.checked = false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
:deep(.bannersTabs > div:nth-child(1) .tab) {
  padding: 12px 50px !important;
}
.bannersBox {
  width: 1280px;
  height: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  .bannersTabs {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    position: relative;

    label {
      padding: 12px 20px;
      box-sizing: border-box;
    }
    input[type="radio"] {
      display: none;
    }
    input[type="radio"]:checked + label {
      color: #fff;
      background-color: #ea6240;
    }
    input[type="radio"]:checked > ul {
      display: none;
    }

    ul {
      overflow: hidden;
      position: absolute;
      z-index: 9;
      display: block;
      width: 156px;
      height: 410px;
      top: 40px;
      list-style-type: none;
      color: #fff;
      backdrop-filter: rgb(39, 38, 38);
      background-color: rgba(255, 255, 255, 0.228);
      li {
        padding: 8px 0 8px 25px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        cursor: pointer;
      }
      li:hover {
        background-color: #ea6240;
      }
    }
    .tab:hover {
      cursor: pointer;
    }
  }
}
.tabs_list {
  padding: 12px 20px;
  cursor: pointer;
}
.active {
  background-color: #ea6240;
  color: #fff;
}
</style>
