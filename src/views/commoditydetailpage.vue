<template>
  <div class="commodityxqBox">
    <div class="commodityxqHeader">
      <div><img :src="this.$route.query.logoImg" alt="" /></div>
      <div>
        <p>{{ this.$route.query.shopName }}</p>
        <!-- <p>电话：{{ this.$route.query.phone }}</p> -->
      </div>
      <div>起送价 ¥{{this.$route.query.minCharge || 0 }} </div>
      <div>
        <img src="@/assets/phonecolor.png" alt="" />
        <div>
          <p>商家电话</p>
          <p>{{ this.$route.query.phone }}</p>
        </div>
      </div>
    </div>
    <div class="commodityHui"></div>
    <div class="commodityxqCon">
      <div class="commodityxqCon_box_left">
        <div class="cmm_img_box" v-if="smallimgList.length > 0">
          <img
            style="width: 370px; height: 400px"
            :src="this.box_img ? this.box_img : this.smallimgList[0].img"
            alt=""
            class="cmm_img"
          />
          <div class="opacity_box"></div>
          <div class="big_img_box">
            <img
              :src="
                this.big_img == false
                  ? this.big_img
                  : this.smallimgList[0].bigImg
              "
              class="big_img"
              alt=""
            />
          </div>
        </div>
        <div>
          <div @click="img_left">
            <div class="commodityxqCon_left_img"></div>
          </div>
          <ul class="ui_box">
            <li
              :class="activeClass == i ? 'active' : ''"
              v-for="(v, i) in smallimgList"
              :key="i"
              @mouseenter="getBotImgMouse(v, i)"
            >
              <img :src="v.img" alt="" />
            </li>
          </ul>
          <div @click="img_right">
            <div class="commodityxqCon_right_img"></div>
          </div>
        </div>
      </div>
      <div class="commodityxqCon_box_right">
        <div class="comm_box_top">
          <div>
            <span>新品</span><span>{{ goodsItem.productName }}</span>
          </div>
          <div>
            <span>¥</span><span>{{ goodsItem.retailPrice }}</span>
          </div>
          <!-- <div><span>起送价</span><span>0.00元</span></div> -->
          <!-- <div>
            <span>配送费</span
            ><span>商家配送，1.5公里以内免费 / 客户自提免费</span>
          </div> -->
          <div>
            <span>数量</span>
            <InputNumber
              v-model="numberValue"
              controls-outside
              :min="1"
              @on-blur="numBlur"
              @click="quantity"
            ></InputNumber>
          </div>
          <!-- <div><span>优惠券</span><span>满5.01减5</span></div> -->
        </div>
        <div class="comm_box_bottom" @click="addSingleProductToCartInfo">
          加入购物车
        </div>
      </div>
    </div>
    <!-- 下方虚线分割 -->
    <div class="dashedBox">
      <Divider dashed />
    </div>
    <div class="dashedBottomBox">
      <commodityDetailContent />
    </div>
  </div>
</template>
<script>
import { getProductById, addSingleProductToCart } from "@/utils/api";
import imgInfo from "@/utils/img_box";
import commodityDetailContent from "@/components/commodityData/commodityDetailContent";
export default {
  name: "commoditydetailpage",
  components: { commodityDetailContent },
  props: {},
  data() {
    return {
      activeClass: 0, //默认放大镜第0个
      numberValue: 1, //选择商品个数
      smallimgList: [],
      goodsItem: {},
      box_img: "",
      big_img: "",
    };
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.getProductByIdInfo();
    });

    window.onload = () => {
      imgInfo();
    };
  },
  methods: {
    // 底部小图
    getBotImgMouse(v, index) {
      this.box_img = v.img;
      this.big_img = v.bigImg;
      this.activeClass = index;
    },
    // 左切换
    img_left() {
      if (this.activeClass !== 0) {
        this.activeClass--;
        var left_img = this.smallimgList[this.activeClass];
        this.box_img = left_img.img;
        this.big_img = left_img.bigImg;
      }
    },
    // 右切换
    img_right() {
      if (this.activeClass !== this.smallimgList.length - 1) {
        this.activeClass++;
        const right_img = this.smallimgList[this.activeClass];
        this.box_img = right_img.img;
        this.big_img = right_img.bigImg;
      }
    },
    // 数字输入框失焦
    numBlur() {
      
      if (this.numberValue == null) {
        this.numberValue = 1;

      }
    },
    quantity() {
      console.log('ssss')
    },
    // 获取商品详情
    getProductByIdInfo() {
      var productIddata = {
        productId: this.$route.query.productId,
      };
      getProductById(productIddata).then((res) => {
        localStorage.setItem("shopId", res.data.shopId);
        localStorage.setItem("description", res.data.description);
        var text = res.data.description; //
        var regex = /<img.*?src=['"](.*?)['"]/g; // 正则表达式匹配图片地址
        var match;
        var imageUrls = [];
        while ((match = regex.exec(text)) !== null) {
          imageUrls.push(match[1]);
        }
        for (let index = 0; index < imageUrls.length; index++) {
          const imgElement = imageUrls[index];
          let newList = {
            img: imgElement,
            bigImg: imgElement,
          };
          this.smallimgList.push(newList);
        }
        this.goodsItem = res.data;
      });
    },
    // 添加商品到购物车
    addSingleProductToCartInfo() {
      var form = {
        shopId: this.$route.query.shopId,
        hasRemains: 1,
        price: this.goodsItem.retailPrice, //价格
        productCount: this.numberValue, //产品数量
        productId: this.goodsItem.id,
        productImageLink: this.goodsItem.img01,
        productName: this.goodsItem.productName,
      };
      addSingleProductToCart(form).then((res) => {
        if (res || res.status == 200) {
          this.$Message.success(res.message);
        } else {
          this.$Message.error(res.message);
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
:deep(.ivu-input-number-focused) {
  border-color: #ea6240;
  box-shadow: 0 0 10px 2px #eb6b4b3e;
}
:deep(.ivu-input-number-controls-outside) {
  width: 120px;
}
:deep(.ivu-input-number-input) {
  text-align: center;
}
:deep(.ivu-input-number:focus) {
  border-color: #ea6240;
  box-shadow: 0 0 10px 2px #eb6b4b3e;
}
:deep(.ivu-input-number:hover) {
  border-color: #ea6240;
}
@mixin centerBetween {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.commodityxqBox {
  width: 100%;
  display: flex;
  background-color: #fff;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid #eee;
  .commodityxqHeader {
    width: 1280px;
    height: 100px;
    @include centerBetween;
    padding: 0 50px 0 55px;
    > div:nth-child(1) {
      width: 68px;
      height: 68px;
      overflow: hidden;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    > div:nth-child(2) {
      text-align: left;
      margin: 0 50px 0 10px;
      height: 60px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      > p:nth-child(1) {
        font-size: 23px;
        font-weight: bold;
      }
      > p:nth-child(2) {
        color: #666666;
      }
    }
    > div:nth-child(3) {
      flex: 1;
      display: flex;
      align-items: flex-end;
      height: 60px;
      color: #666666;
    }
    > div:nth-child(4) {
      cursor: pointer;
      padding: 5px 10px;
      background-color: #fae0d8;
      border-radius: 8px;
      color: #ea6240;
      display: flex;
      align-items: center;
      transition: all 0.2s;
      > div {
        text-align: left;
      }
    }
    > div:nth-child(4):active {
      opacity: 0.9;
      box-shadow: 0 0 10px 2px #eb6b4b3e;
    }
  }
  //   灰色条
  .commodityHui {
    width: 100%;
    height: 28px;
    background-color: #fafafa;
  }
  //   商品选择区域
  .commodityxqCon {
    width: 1280px;
    min-height: 400px;
    padding-top: 30px;
    display: flex;
    justify-content: space-between;
    .commodityxqCon_box_left {
      > div:nth-child(1):hover {
        cursor: move;
      }

      > div:nth-child(1) {
        width: 370px;
        height: 400px;
        border: 1px solid #eaeaea;
        position: relative;
        .cmm_img {
          width: 100%;
          height: 100%;
        }
        .opacity_box {
          position: absolute;
          width: 180px;
          height: 180px;
          display: none;
          background-color: #ea6240;
          opacity: 0.7;
          top: 0;
        }
        .big_img_box {
          width: 500px;
          height: 500px;
          border: 1px solid #999;
          z-index: 10;
          position: absolute;
          right: -520px;
          top: 0;
          display: none;
          overflow: hidden;
          .big_img {
            position: absolute;
            top: 0;
            left: 0;
          }
        }
      }
      > div:nth-child(2) {
        @include centerBetween;
        margin-top: 20px;
        .commodityxqCon_left_img {
          transform: rotate(45deg);
          border-top: none;
          border-right: none;
        }
        .commodityxqCon_right_img {
          transform: rotate(-45deg);
          border-top: none;
          border-left: none;
        }
        > div {
          width: 34px;
          height: 54px;
          display: flex;
          align-items: center;
          justify-content: center;
          > div {
            width: 20px;
            height: 20px;
            border: 5px solid #999999;
            cursor: pointer;
          }
        }
        ul {
          width: 302px;
          list-style-type: none;
          display: flex;
          overflow: hidden;
          align-items: center;
          overflow-x: scroll;
          li {
            flex-shrink: 0;
            width: 54px;
            height: 54px;
            margin: 0 10px;
            text-align: center;
            position: relative;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .active::after {
            content: "";
            width: 54px;
            height: 54px;
            border: 3px solid red;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
    }
    .commodityxqCon_box_right {
      flex: 1;
      height: 400px;
      padding-left: 40px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      .comm_box_top {
        text-align: left;
        > div:nth-child(1) {
          display: flex;
          align-items: center;
          span:nth-child(1) {
            background-color: #4aa475;
            color: #fefffe;
            font-size: 12px;
            border-radius: 3px;
            display: inline-block;
            padding: 2px 7px;
            margin-right: 10px;
          }
          span:nth-child(2) {
            font-size: 20px;
            font-weight: bold;
          }
        }
        > div:nth-child(2) {
          color: #ea6240;
          margin: 18px 0;
          span:nth-child(1) {
            font-size: 20px;
            margin-right: 10px;
          }
          span:nth-child(2) {
            font-size: 35px;
            font-weight: 500;
            font-family: Source Han Sans CN-Medium,system-ui;
          }
        }
        > div:nth-child(3) {
          font-size: 14px;
          span:nth-child(1) {
            color: #2a2a2a;
            margin-right: 20px;
          }
          span:nth-child(2) {
            color: #666666;
          }
        }
        > div:nth-child(4) {
          font-size: 14px;
          margin: 20px 0;
          span:nth-child(1) {
            color: #2a2a2a;
            margin-right: 20px;
          }
          span:nth-child(2) {
            color: #666666;
          }
        }
        > div:nth-child(5) {
          display: flex;
          align-items: center;
          span:nth-child(1) {
            line-height: 14px;
            color: #2a2a2a;
            margin-right: 33px;
          }
        }
        > div:nth-child(6) {
          display: flex;
          align-items: center;
          margin-top: 20px;
          span:nth-child(1) {
            color: #2a2a2a;
            margin-right: 20px;
          }
          span:nth-child(2) {
            font-size: 12px;
            width: 110px;
            height: 20px;
            display: inline-block;
            text-align: center;
            line-height: 20px;
            color: #ea6240;
            background: url("../assets/couponbanner.png") no-repeat center 100%;
          }
        }
      }
      .comm_box_bottom {
        background-color: #ea6240;
        color: #fff;
        font-size: 16px;
        padding: 13px 28px;
        cursor: pointer;
      }
      .comm_box_bottom:active {
        opacity: 0.9;
      }
    }
  }
  .dashedBox {
    width: 1280px;
    padding-top: 15px;
  }
  .dashedBottomBox {
    width: 1280px;
    margin-top: 25px;
  }
}
</style>
