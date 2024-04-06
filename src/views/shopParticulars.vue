<template>
  <div class="shopParticularsBox">
    <div class="shopParticularsBoxT">
      <div class="shopParticularsBoxTop">
        <div>
          <div class="shopTopImg">
            <img :src="logoImg" alt="" />
          </div>
          <div
            style="
              font-size: 25px;
              font-weight: bold;
              margin: 0 80px 0 10px;
              position: relative;
            "
          >
            {{ shopName }}
            <div class="shopPf">{{ score }}</div>
          </div>
          <div class="lookcouponShow" v-show="!couponShow" @click="coupon">
            查看已领取的优惠卷
          </div>
          <div v-show="!couponShow" class="guize" @click="syCoupon">
            <img src="../assets/guize.png" alt="" /> 使用规则
          </div>
          <div class="coupon-box" v-if="couponShow && shopCoupon.length > 0">
            <span>{{ maxCoupon }}元无门槛券</span>
        </div>
          <div v-show="couponShow">月销总量 {{ sales }}件</div>
        </div>
        <div v-show="couponShow" @click="couponClick">
          <img src="../assets/coupon.png" alt="" />优惠券
        </div>
        <div class="fanhuiDp" @click="couponClick" v-show="!couponShow">
          返回店铺
        </div>
      </div>
    </div>
    <!-- 店铺商品列表 -->
    <div class="shopItemdata" v-show="couponShow">
      <div
        v-for="(v, i) in shopitemList"
        :key="i"
        @click="shopDataItemId(v.id,v)"
      >
        <div>
          <img :src="v.img01.split(',')[0]" alt="" />
        </div>
        <div>¥{{ v.retailPrice }}</div>
        <div class="dis">
          <div>{{ v.productName }}</div>
           <img style="cursor: pointer" src="../assets/addshopcar.png" alt="" />
        </div>
       
        <div>
          <!-- <div>满{{ v.sales }}减{{ v.hasRemains }}</div> -->
         
        </div>
      </div>
      <p class="pagesize">
        <!-- <Page
          show-total
          :total="totalNum"
          :current="currPage"
          :page-size="records"
          prev-text="上一页"
          next-text="下一页"
        >
          <template slot> 显示总商品条数</template>
        </Page> -->
        <!-- <Page
          v-if="this.shopitemList.length > 0"
          class="fixedpage"
          :current="currentNum"
          :total="qorderList"
          show-total
          :page-size="pageSize"
          prev-text="上一页"
          next-text="下一页"
          @on-change="onChange"
        >
          <template>共{{ qorderList }}条订单</template>
        </Page> -->
      </p>
    </div>
    <!-- 店铺优惠卷 -->
    <div class="shopCoupo" v-if="shopCoupon.length != 0">
      <div
        class="shopCoupon_box"
        v-show="!couponShow"
        v-for="(v, i) in shopCoupon"
        :key="i"
      >
        <div>
          <div>
            ￥<span>{{ v.couponPrice }}</span>
          </div>
          <div>无门槛使用</div>
        </div>
        <div>
          <div>{{ v.title }} | 限 {{ v.shopName }} 除特价商品使用</div>
          <div>有效期至 {{ v.endTime }}</div>
        </div>
        <div>
          <img v-if="!v.status" src="../assets/yilinqu.png" alt="" />
          <div v-show="v.status" class="qsy_box" @click="getCoupon(v)">
            领卷
          </div>
          <div v-show="!v.status" class="qsy_box" @click="useCoupon">
            去使用
          </div>
        </div>
      </div>
    </div>
    <div v-show="!couponShow" v-else class="nullData">店铺暂无优惠卷</div>
    <Modal
      title=" "
      class-name="vertical-center-modal"
      v-model="couponRule"
      :styles="{ top: `${modalTop}px`, width: `${modalWidth}px` }"
      :footer-hide="true"
    >
      <div class="gz_box" v-if="gz_if">
        <p>使用规则</p>
        <p>
          活动期间，会员可在领券中心页面参与领取优惠券，每张券仅限领取一次。券领取成功后，即时充入会员账户。
        </p>
        <p>注意事项：</p>
        <div class="p_list">
          <p>（1）优惠券有使用范围，以前端页面展示为准。</p>
          <p>
            （2）优惠券不能折现、不能退换，逾期未使用将自动失效，无法补发或延期，敬请谅解。
          </p>
          <p>（3）同一种优惠券，一次仅支持使用一张，不可叠加使用；</p>
          <p>
            （4）云端超市可根据活动的实际进行情况，在法律允许的范围内，对本活动规则进行调整或变动；
          </p>
          <p>
            （5）请您在认真阅读并清楚理解相关使用规则后自主决定是否参加，如您参加，则视为您已清楚了解活动规则并同意遵守。
          </p>
        </div>
      </div>
      <div v-if="lq_if" class="lq_box">
        <div>
          <img src="../assets/succeed.png" alt="" />
          <div>
            <p>领取成功! 优惠券已到账</p>
            <p>可在[我的优惠券]中查看</p>
          </div>
        </div>
        <div>
          <div @click="couponRule = false">知道了</div>
          <div @click="useCoupon">去使用</div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import {
  gettUserShopCouponList,
  gettUserShopcollectList,
  getShopInfoById,
  getProductListByCategory,
  getShopCouponList,
} from "../utils/api";
export default {
  // 门店详情
  name: "shopParticulars",
  components: {},
  props: {},
  data() {
    return {
      logoImg: "",
      shopName: "",
      score: "",
      sales: "",
      shopCoupon: [], //店铺优惠卷
      couponShow: true,
      ylqShow: false, // 已领取
      modalTop: "",
      modalWidth: "",
      gz_if: false,
      lq_if: false,
      couponRule: false, //优惠规则弹窗
      shopitemList: [], //商品列表
      // 查询店铺商品
       // 全部订单
       currentNum: 1, // 全部当前页码
      pageSize: 30, // 全部每页条数
      qorderList: null, //全部条数
    };
  },
  watch: {},
  created() {},
  mounted() {
    document.documentElement.scrollTop = 0;
    this.gettUserShopCouponListInfo();
    this.getShopInfoByIdInfo();
    this.getProductListByCategoryInfo();
    console.log(process.env.BASE_URL, "routeUrl.href");
  },
  computed:{
    //算计最大优惠券
    maxCoupon(){
        if(this.shopCoupon.length > 0){
            this.shopCoupon.sort((a, b) => b.couponPrice - a.couponPrice)
            // 返回第一个选项，即价格最高的选项
            return this.shopCoupon[0].couponPrice
        }
        return 0
    }
},
  methods: {
    // 根据店铺id 查询店铺信息
    getShopInfoByIdInfo() {
      var shopIdF = {
        shopId: this.$route.query.shopId,
      };
      getShopInfoById(shopIdF).then((res) => {
        if (res || res.status == 200) {
          this.logoImg = res.data.logoImg;
          this.shopName = res.data.shopName;
          this.score = res.data.score;
          this.sales = res.data.sales;
        }
      });
    },
    // 根据店铺id 查询店铺商品
    getProductListByCategoryInfo() {
      var form = {
        queryCondition01: this.$route.query.shopId, //店铺 ID （必输）
        queryCondition02: "", //商品一级分类 （非必输）
        queryCondition03: "", //商品二级分类（非必输）
        queryCondition04: "", //商品名称（非必输）
      };
      getProductListByCategory(form).then((res) => {
        console.log(res, "getProductListByCategory");
        if (res || res.status == 200) {
          this.shopitemList = res.data;
        }
      });
    },
    // 根据店铺id查询店铺优惠卷
    gettUserShopCouponListInfo() {
      var form = {
        currPage: 1,
        records: 30,
        status: 1,
        queryCondition01: this.$route.query.shopId,
      };
      getShopCouponList(form).then((res) => {
        if (res || res.status == 200) {
          this.shopCoupon = res.data.list;
        }
      });
    },
    // 详情页
    shopDataItemId(id,v) {
      let datablank = {
        productId: id,
        shopId: this.$route.query.shopId,
        logoImg: this.$route.query.logoImg,
        phone: this.$route.query.phone,
        shopName: this.$route.query.shopName,
        minCharge:this.$route.query.minCharge
      };
      this.$router.push({
        path: "/pc/commoditydetailpage",
        query: datablank,
      });
      // const { href } = this.$router.resolve({
      //   path: "/pc/commoditydetailpage",
      //   query: datablank,
      // });
      // let querystring = "";
      // for (let key in datablank) {
      //   if (datablank.hasOwnProperty(key)) {
      //     const value = encodeURIComponent(datablank[key]);
      //     querystring += `${key}=${value}&`;
      //   }
      // }
      // if (querystring !== "") {
      //   querystring = `?${querystring}`;
      // } else {
      //   querystring = "";
      // }
      // const href = `/pc/commoditydetailpage${querystring}`;
      // window.open(href, "_blank");
    },
    // 优惠卷
    couponClick() {
      this.couponShow = !this.couponShow;
    },
    coupon() {
      this.$router.push({
        path: '/pc/mycoupon'
      })
    },
    
    // 使用规则
    syCoupon() {
      this.couponRule = true;
      this.gz_if = true;
      this.lq_if = false;
      this.modalWidth = 1200;
      this.modalTop = 130;
    },
    // 领取优惠卷
    getCoupon(value) {
      this.modalWidth = 600;
      this.modalTop = 200;
      var form = {
        couponId : value.id, //优惠卷id
        shopId: this.$route.query.shopId, //店铺id
        token: localStorage.getItem("token"),
      };
      gettUserShopcollectList(form).then((res) => {
        console.log(res)
        if (res) {
          this.$Message.success({
                content: res.message,
                duration: 4,
            });
          this.lq_if = true;
          this.gettUserShopCouponListInfo();

        }
       
      });
    },
    // 去使用
    useCoupon() {
      this.couponShow = true;
      this.couponRule = false;
    },
  },
};
</script>
<style lang="scss" scoped>
:deep(.ivu-modal-header) {
  border-bottom: 0;
}
:deep(.ivu-modal-body) {
  padding: 0 16px;
}
:deep(.ivu-modal-content) {
  padding: 0 50px 50px 50px;
}
.vertical-center-modal {
  .ivu-modal-body {
    .gz_box {
      > p:nth-child(1) {
        text-align: center;
        font-size: 20px;
        font-weight: bold;
      }
      > p:nth-child(2) {
        margin: 40px 0 20px 0;
      }
      .p_list {
        margin-top: 8px;
        > p {
          margin-top: 12px;
        }
      }
    }
    .lq_box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      margin-top: 10px;
      > div:nth-child(1) {
        display: flex;
        margin-bottom: 30px;
        img {
          width: 40px;
          height: 40px;
        }
        div {
          margin-left: 20px;
          p {
            margin-bottom: 10px;
          }
          > p:nth-child(1) {
            font-size: 20px;
            font-weight: bold;
          }
          > p:nth-child(2) {
            color: #666666;
          }
        }
      }
      > div:nth-child(2) {
        display: flex;
        align-items: center;
        justify-content: space-between;
        > div {
          padding: 8px 14px;
          border-radius: 4px;
          margin: 0 60px;
          cursor: pointer;
        }
        > div:nth-child(1) {
          border: 1px solid #999;
          color: #2a2a2a;
        }
        > div:nth-child(1):active {
          border: none;
          color: #fff;
          background-color: #ea6240;
        }
        > div:nth-child(2) {
          background-color: #ea6240;
          color: #fff;
        }
        > div:nth-child(2):active {
          opacity: 0.9;
        }
      }
    }
  }
}
.shopParticularsBox {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  .shopParticularsBoxT {
    width: 100%;
    display: flex;
    justify-content: center;
    // background-color: pink;
    background-color: #fff;
    box-shadow: 0 20px 38px 0 rgb(30 35 42 / 5%);
    .shopParticularsBoxTop {
      width: 1280px;
      height: 100px;
      padding: 16px 50px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      > div:nth-child(1) {
        display: flex;
        align-items: center;
        .shopTopImg {
          width: 68px;
          height: 68px;
          overflow: hidden;
          border-radius: 50%;
          border-radius: 50%;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .shopPf {
          font-size: 12px;
          color: #fff;
          font-weight: 100;
          position: absolute;
          top: 0;
          right: -38px;
          width: 30px;
          height: 18px;
          line-height: 18px;
          background: url(../assets/pinfeng.png) no-repeat center 100%;
          text-align: center;
        }
        // 优惠卷显示对应内容
        .lookcouponShow {
          padding: 4px 8px;
          border: 1px solid #ea6240;
          color: #ea6240;
          border-radius: 5px;
          cursor: pointer;
        }

        .lookcouponShow:active {
          background-color: #ea6240;
          color: #fff;
        }
        .guize {
          margin-left: 30px;
          display: flex;
          align-items: center;
          color: #666666;
          cursor: pointer;
          img {
            margin-right: 5px;
          }
        }
      }
      > div:nth-child(2) {
        width: 85px;
        height: 32px;
        background-color: #ea6240;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;
        border-radius: 5px;
        color: #fefffe;
        cursor: pointer;
      }
      > div:nth-child(2):active {
        opacity: 0.9;
      }
      // 返回店铺
      .fanhuiDp {
        padding: 4px 8px;
        border: 1px solid #ea6240;
        color: #ea6240;
        border-radius: 5px;
        cursor: pointer;
      }
      .fanhuiDp:active {
        background-color: #ea6240;
        color: #fff;
      }
    }
  }
  .coupon-box {
        min-width: 68px;
        padding: 0 10px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        font-size: 12px;
        background-color: #ea6240;
        color: #fff;
        border-radius: 20px;
        margin-right: 20px;
    }
  .shopItemdata {
    padding: 35px 0 80px 0;
    width: 1280px;
    display: flex;
    align-items: center;
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    grid-template-rows: repeat(2, minmax(0, 1fr));
    gap: 20px;
    position: relative;
    >div:hover {
      box-shadow: 0px 0px 20px 5px #ccc;
    }
    > div {
      transition: all 0.5s;
      background-color: #fff;
      border-radius: 10px;
      overflow: hidden;
      padding-bottom: 15px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      > div:nth-child(1) {
        width: 100%;
        height: 260px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      > div:nth-child(2) {
        color: #ea6240;
        margin: 8px 0 3px 10px;
      }
      > div:nth-child(3) {
        padding: 0 0 3px 5px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      > div:nth-child(2),
      div:nth-child(3) {
        width: 100%;
        text-align: left;
      }
      > div:last-child {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
        > div:nth-child(1) {
          width: 68px;
          height: 20px;
          line-height: 20px;
          text-align: center;
          font-size: 12px;
          background-color: #ea6240;
          color: #fff;
          border-radius: 20px;
        }
      }
    }
    .pagesize {
      position: absolute;
      bottom: 25px;
      right: 0;
      :deep(.ivu-page-next) {
        padding: 0 10px;
        border: 1px solid #dcdee2;
      }
      :deep(.ivu-page-prev) {
        padding: 0 10px;
        border: 1px solid #dcdee2;
      }
    }
  }
  // 暂无优惠卷
  .nullData {
    margin-top: 30px;
  }
  // 店铺优惠卷
  .shopCoupo {
    padding-bottom: 30px;
    .shopCoupon_box {
      width: 1280px;
      margin-top: 25px;
      border: 10px solid #ea6240;
      border-bottom: 0;
      border-left: 0;
      border-right: 0;
      border-radius: 8px;
      background-color: #fff;
      padding: 10px 26px;
      display: flex;
      justify-content: space-between;
      > div:nth-child(1) {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-bottom: 15px;
        color: #ea6240;
        span {
          font-size: 50px;
        }
      }
      > div:nth-child(2) {
        flex: 1;
        text-align: left;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 15px 0 15px 45px;
        color: #666666;
      }
      > div:nth-child(3) {
        display: flex;
        align-items: center;
        img {
          width: 100px;
          height: 100px;
        }
        .qsy_box {
          margin-left: 20px;
          padding: 6px 15px;
          background-color: #ea6240;
          color: #fff;
          border-radius: 4px;
          cursor: pointer;
        }
      }
    }
  }
}
.dis{
  display: flex;
  justify-content: space-between;
  padding:0 5px !important;
}
</style>
