<template>
  <Affix style="width: 100%;">
    <div class="topsearchBox_box">
      <div class="topsearchBox">
        <div class="divo">
          <div @click="reload"><img src="../assets/logow.png" alt="" /></div>
        </div>
        <div>
          <div>
            <img src="../assets/videlo.png" alt="" />
          </div>
          <div>视频网购</div>
        </div>
        <div>
          <div><img src="../assets/anq.png" alt="" /></div>
          <div>安全放心</div>
        </div>
        <div>
          <Input
            search
            enter-button
            v-model="list.queryCondition01"
            @on-search="searchGoodsData"
            placeholder="店铺名称/商品名称"
          />
        </div>
      </div>
    </div>
  </Affix>
</template>

<script>
import { getAppShopList } from "@/utils/api";
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      list: {
        currPage: this.$store.state.currentNum, //页数
        records: this.$store.state.pageSize, //每页个数
        queryCondition01: "",
        latitude: 0,
        longitude: 0,
        dateType: 0,
        endDate: "string",
        fileLink: "string",
        id: "string",
        ids: ["string"],
        queryCondition02: "string",
        queryCondition03: "string",
        queryCondition04: "string",
        startDate: "string",
        status: 1,
        type: 0,
      },
    };
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 获取商家商品列表
    searchGoodsData() {
      this.$router.push("/");
      document.scrollingElement.scrollTop = 580;
      getAppShopList(this.list).then((res) => {
        if (res && res.status == 200) {
          this.$store.dispatch("asyncUpdateUser", res.data.list);
          this.$store.dispatch("asyncUpdateTotalUser", res.data.total);
        }
      });
    },
    reload() {
      this.$router.push("/pc");
      window.location.reload();
      sessionStorage["checkedType"] = 1;
    },
  },
};
</script>
<style lang="scss" scoped>
.topsearchBox_box {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  z-index: 12 !important;
}
.topsearchBox {
  font-size: 15px;
  color: #333;
  width: 1280px;
  height: 100px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  display: grid;
  grid-auto-flow: column;
  column-gap: 16px;

  .divo {
    width: 200px;
    display: flex;
    justify-content: center;
    div {
      cursor: pointer;
    }
  }
  > div {
    display: flex;
    > div:nth-child(2) {
      margin-left: 5px;
    }
  }
  :deep(.ivu-input-group) {
    width: 550px;
    height: 36px;
  }
  :deep(.ivu-input-group .ivu-input) {
    height: 36px;
  }
  :deep(.ivu-input:focus) {
    box-shadow: 0 0 10px 2px #eb6b4b3e;
  }
  :deep(.ivu-input-search i) {
    font-size: 20px;
  }
  :deep(.ivu-input-search) {
    background-color: #ea6240 !important;
    border-color: #ea6240 !important;
  }
  // :deep(.ivu-input-group-append:hover) .ivu-input {
  //   border-color: #ea6240 !important;
  // }
  :deep(.ivu-input:hover) {
    border-color: #ea6240 !important;
  }
  :deep(.ivu-input:focus) {
    border-color: #ea6240 !important;
  }
  :deep(.ivu-input:hover) {
    border-color: #ea6240 !important;
  }
}
</style>
