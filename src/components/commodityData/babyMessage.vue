<template>
  <div class="babyMessageBox">
    <div>
      <span>商家地址：</span
      ><span>{{ shopsMessage.address }} {{ shopsMessage.addressDetails }}</span>
    </div>
    <div>
      <span>营业时间：</span><span>{{ shopsMessage.businessDate }}</span>
    </div>
    <div>
      <span>配送范围：</span><span>{{ shopsMessage.emsScope }} 公里以内</span>
    </div>
    <div class="img_box">
      <span>商家资质：</span>
      <div class="zz_img_box">
        <img
          class="center_Img"
          :src="shopsMessage.businessLicenseImg"
          preview="0"
          preview-text="商家资质"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getShopInfoById } from "@/utils/api";
export default {
  name: "babyMessage",
  components: {},
  props: {},
  data() {
    return {
      shopsMessage: {},
    };
  },
  created() {},
  mounted() {
    this.getShopInfoByIdInfo();
  },
  methods: {
    // 获取商家详情页
    getShopInfoByIdInfo() {
      var shopIdData = {
        shopId: this.$route.query.shopId,
      };
      getShopInfoById(shopIdData).then((res) => {
        if (res || res.status == 200) {
          console.log(res,'resssssssssss')
          this.shopsMessage = res.data;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.babyMessageBox {
  width: 100%;
  text-align: left;
  padding-left: 30px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  > div {
    margin-top: 30px;
    font-size: 14px;
    span:nth-child(1) {
      color: #2a2a2a;
      margin-right: 20px;
    }
    span:nth-child(2) {
      color: #666666;
    }
  }
  .img_box {
    display: flex;
    align-items: flex-start;
    .zz_img_box {
      width: 120px;
      height: 80px;
      // display: flex;
      // align-items: center;
      // justify-content: center;
      overflow: hidden;
      cursor: pointer;
    }
    .center_Img {
      width: 100%;
    }
  }
}
</style>
