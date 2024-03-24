<template>
  <div class="hearBox">
    <div class="hearBoxfff">
      <div class="hearbannerimg">
        <!-- <img src="../assets/5f1a6d5a68c76.jpg" alt="" /> -->
        <Carousel
          autoplay
          :height="500"
          :autoplay-speed="4000"
          v-model="value1"
          loop
        >
          <CarouselItem v-for="(v, i) in posterList" :key="i">
            <div class="demo-carousel">
              <img :src="v.img01" alt="" />
            </div>
          </CarouselItem>
        </Carousel>
      </div>
    </div>
    <!-- 超值优惠 -->
    <div class="hearBoxTitle" ref="topIndex">
      <span style="font-size: 30px; font-weight: bold">超值优惠</span>
      <span style="font-weight: bold; margin: 0 10px">|</span>
      <span style="font-size: 25px">Value discounts</span>
    </div>
    <!-- 综合排序、销量、距离 -->
    <Tabs value="name1">
      <TabPane label="综合排序" name="name1">
        <div class="sortBox">
          <div v-for="(v, i) in setData" :key="i" @click="shopItem(v)">
            <div class="sortBoxTopitem">
              <div
                style="
                  width: 68px;
                  height: 68px;
                  overflow: hidden;
                  border-radius: 50%;
                "
              >
                <img
                  style="width: 100%; height: 100%"
                  :src="v.logoImg"
                  alt=""
                />
              </div>

              <div class="sortBoxTopitemCenter">
                <div>
                  {{ v.shopName }} <span class="pfengBox">{{ v.score }}</span>
                </div>
                <div>
                  <span style="margin-right: 24px">起送价 ¥{{v.minCharge}}</span>
                  <!-- <span>配送费 ¥20</span> -->
                </div>
              </div>
              <div class="sortBoxTopitemright">
                <span style="margin-right: 30px">月销量 {{ v.sales }}</span>
                <span>距离 {{ v.distance }}</span>
              </div>
            </div>
            <div class="sortBoxBottomitem">
              <div
                v-for="(iv, index) in v.productList.slice(0, 3)"
                :key="index"
              >
                <div
                  style="
                    width: 100%;
                    height: 210px;
                    border-radius: 16px;
                    overflow: hidden;
                  "
                >
                  <img
                    style="width: 100%; height: 100%"
                    :src="iv.img01.split(',')[0]"
                    alt=""
                  />
                </div>
                <div
                  style="
                    margin: 10px 0;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  "
                >
                  {{ iv.name }}
                  
                </div>
                <div class="mjboxItem">
                  <!-- <div>
                    <div>满58减10</div>
                  </div> -->
                  <div>¥ {{ iv.retailPrice }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Page
          :current="currentNum"
          :total="getGoodsDataTota"
          show-total
          :page-size="pageSize"
          prev-text="上一页"
          next-text="下一页"
          @on-change="onChange"
        >
          <template>共{{ getGoodsDataTota }}条店铺</template>
        </Page>
      </TabPane>
      <!-- <TabPane label="销量" name="name2">暂无内容...</TabPane> -->
      <!-- <TabPane label="距离" name="name3">暂无内容...</TabPane> -->
    </Tabs>
  </div>
</template>

<script>
import { mapGetters } from "vuex"; //导入vuex的辅助函数
import { getLoginUserInfo, getPosterInfo, getAppShopList } from "../utils/api";
export default {
  name: "index",
  components: {},
  props: {},
  data() {
    return {
      value1: 1,
      topIndex: null, //标题距离页面高度
      posterList: [],
      currentNum: this.$store.state.currentNum, // 当前页码
      pageSize: this.$store.state.pageSize, // 每页条数
      ggdata: {
        beginDistance: 0,
        currPage: 0,
        dateType: 0,
        endDate: "string",
        endDistance: 0,
        fileLink: "string",
        id: "01",
        ids: ["string"],
        latitude: 0,
        longitude: 0,
        queryCondition01: "string",
        queryCondition02: "string",
        queryCondition03: "string",
        queryCondition04: "string",
        records: 0,
        startDate: "string",
        status: 0,
        type: 0,
      },
    };
  },
  watch: {},
  computed: {
    ...mapGetters(["setData", "getGoodsDataTota", "asyncUpdateCurrentNum"]),
  },
  created() {},
  mounted() {
    this.topIndex = this.$refs.topIndex.offsetTop;
    this.getLoginUser();
    this.getPoster();
    this.getAppShopListInfo();
  },
  methods: {
    // 获取用户信息
    getLoginUser() {
      var token = localStorage.getItem("token");
      getLoginUserInfo(token).then((res) => {
        // console.log(res, "根据token获取用户信息");
      });
    },
    // 首页广告列表
    getPoster() {
      getPosterInfo(this.ggdata).then((res) => {
        if (res && res.status == 200) {
          this.posterList = res.data;
        }
      });
    },
    // 获取商家商品列表
    getAppShopListInfo() {
      // 商家分页列表
      var list = {
        currPage: this.$store.state.currentNum, //页数
        records: this.pageSize, //每页个数
        dateType: 0,
        endDate: "string",
        fileLink: "string",
        id: "string",
        ids: ["string"],
        latitude: 0,
        longitude: 0,
        queryCondition01: "",
        queryCondition02: "string",
        queryCondition03: "string",
        queryCondition04: "string",
        startDate: "string",
        status: 1,
        type: 0,
      };
      getAppShopList(list).then((res) => {
        if (res && res.status == 200) {
          this.$store.dispatch("asyncUpdateTotalUser", res.data.total); //总页数
          this.$store.dispatch("asyncUpdateUser", res.data.list);
        }
      });
    },
    // 页码改变
    onChange(e) {
      document.documentElement.scrollTop = this.topIndex;
      this.$store.dispatch("asyncUpdateCurrentNum", e);
      this.getAppShopListInfo();
    },
    // 进入门店
    shopItem(i) {
      this.$router.push({
        path: "/pc/shopParticulars",
        query: {
          shopId: i.id,
          logoImg: i.logoImg,
          phone: i.phone,
          shopName: i.shopName,
          minCharge:i.minCharge
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
:deep(.ivu-page-item-active) {
  border-color: #ea6240;
  a {
    color: #ea6240;
  }
}
:deep(.ivu-page-item:hover) {
  border-color: #ea6240;
  a {
    color: #ea6240;
  }
}
:deep(.ivu-carousel-arrow) {
  z-index: 9;
}
:deep(.ivu-carousel-dots-inside) {
  z-index: 0;
}
:deep(.ivu-page) {
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
:deep(.ivu-page-next) {
  padding: 0 10px;
  border: 1px solid #dcdee2;
}
:deep(.ivu-page-prev) {
  padding: 0 10px;
  border: 1px solid #dcdee2;
}
:deep(.ivu-page-custom-text:hover) {
  border-color: #ea6240;
}
:deep(.ivu-page-custom-text:hover a) {
  color: #ea6240 !important;
}
// 标签样式修改
:deep(.ivu-tabs-nav .ivu-tabs-tab) {
  padding: 12px 16px;
}
:deep(.ivu-tabs-nav .ivu-tabs-tab:hover) {
  color: #515a84;
}
:deep(.ivu-tabs-nav .ivu-tabs-tab-active) {
  color: #fff !important;
  position: relative;
  z-index: 10;
}
:deep(.ivu-tabs-ink-bar) {
  height: 45px;
  background-color: #ea6240;
}
:deep(.ivu-tabs-bar) {
  border-bottom: 1px solid #ea6240;
}
// :deep(.ivu-tabs-nav .ivu-tabs-tab:hover) {
//   color: #ccc;
// }
:deep(.ivu-tabs-tab-focused) {
  color: #fff;
  .ivu-tabs-nav .ivu-tabs-tab:hover {
    color: #fff !important;
  }
}
:deep(.ivu-tabs) {
  width: 1280px;
}
.demo-carousel {
  height: 100%;
  img {
    width: 100%;
  }
}
@mixin center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.hearBox {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 40px;
  .hearBoxfff {
    width: 100%;
    @include center;
    background-color: #fff;
    .hearbannerimg {
      width: 1280px;
      height: 100%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .hearBoxTitle {
    width: 100%;
    height: 100px;
    @include center;
  }
  .sortBox {
    width: 100%;
    display: flex;
    align-items: center;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    // grid-template-rows: repeat(1, minmax(0, 1fr));
    gap: 20px;
    > div {
      cursor: pointer;
      padding: 20px 14px;
      background-color: #fff;
      border-radius: 16px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      .sortBoxTopitem {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .sortBoxTopitemCenter {
          flex: 1;
          text-align: left;
          padding: 8px 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          div:nth-child(1) {
            font-size: 19px;
            font-weight: bold;
            .pfengBox {
              width: 30px;
              height: 16px;
              line-height: 16px;
              display: inline-block;
              font-size: 12px;
              font-weight: 100;
              text-align: center;
              color: #fff;
              background: url("../assets/pinfeng.png") no-repeat center 100%;
              padding-bottom: 12px;
            }
          }
          div:nth-child(2) {
            font-size: 13px;
          }
        }
        .sortBoxTopitemright {
          height: 68px;
          display: flex;
          justify-content: flex-end;
          align-items: flex-end;
          padding: 8px 0;
        }
      }
      .sortBoxBottomitem {
        margin-top: 14px;
        display: flex;
        align-items: center;
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 10px;

        > div {
          // width: 180px;
          cursor: pointer;
          text-align: left;
        }
        .mjboxItem {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding-right: 20px;
          div:nth-child(1) {
            flex: 1;
            div {
              width: 71px;
              height: 24px;
              line-height: 24px;
              text-align: center;
              background-color: #ea6240;
              border-radius: 20px;
              color: #fff;
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}
</style>
