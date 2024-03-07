<template>
  <div class="commodityDetailContentBox">
    <!-- tab切换 -->
    <div class="tabListText">
      <div
        v-for="(v, i) in tabList"
        :key="i"
        :class="{ active: currentClass == i }"
        @click="tabListItem(v, i)"
      >
        {{ v.name }}
      </div>
    </div>
    <div class="tabListConter">
      <transition mode="out-in">
        <component
          :is="
            currentClass == 0
              ? babyDetail
              : currentClass == 1
              ? babyCriticism
              : babyMessage
          "
        ></component>
      </transition>
    </div>
  </div>
</template>

<script>
import babyDetail from "@/components/commodityData/babyDetail";
import babyCriticism from "@/components/commodityData/babyCriticism";
import babyMessage from "@/components/commodityData/babyMessage";
export default {
  name: "commodityDetailContent",
  components: {
    babyDetail,
    babyCriticism,
    babyMessage,
  },
  props: {},
  data() {
    return {
      babyDetail: babyDetail,
      babyCriticism: babyCriticism,
      babyMessage: babyMessage,
      currentClass: 0, // 默认选中按钮样式
      tabList: [
        {
          name: "宝贝详情",
          id: 1,
        },
        {
          name: "宝贝评论",
          id: 2,
        },
        {
          name: "宝贝信息",
          id: 3,
        },
      ],
    };
  },
  created() {},
  mounted() {
    var as = document.querySelector(".tabListText");
  },
  methods: {
    tabListItem(v, i) {
      document.documentElement.scrollTop = 600;
      this.currentClass = i; // 选中tab样式
      document.querySelector(".tabListText");
    },
  },
};
</script>
<style lang="scss" scoped>
.commodityDetailContentBox {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .tabListText {
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ef8f76;
    > div {
      padding: 10px 18px;
      color: #000;
      cursor: pointer;
      background-color: #fafafa;
    }
    .active {
      background-color: #ea6240;
      color: #fff;
    }
  }
  .tabListConter {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-bottom: 70px;
    min-height: 900px;
  }
}
</style>
