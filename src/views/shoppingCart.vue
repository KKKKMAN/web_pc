<template>
  <div class="shoppingCart_box">
    <orderBreadcrumb :title="title" />
    <div class="sc_title">
      <span>商品信息</span>
      <span>单价</span>
      <span>数量</span>
      <span>金额</span>
      <span>操作</span>
    </div>
    <span class="cuponListDataListNull" v-if="cuponListDataList.length == 0"
      >购物车暂无商品...</span
    >
    <div class="sc_list_item" v-for="(v, i) in cuponListDataList" :key="i">
      <div class="sc_list_title">
        <Checkbox
          :indeterminate="v.indeterminate"
          :disabled="v.disabled"
          :value="v.checkAll"
          @on-change="handleCheck(v)"
          >{{ v.shopName }}</Checkbox
        >
        <Dropdown trigger="click" style="margin-left: 30px">
          <Button>
            {{ cuponDropdown }}
            <Icon type="ios-arrow-down"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem v-for="(v, i) in cuponDropdownList" :key="v.type">{{
              v.name
            }}</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div
        class="cuponItem"
        v-for="(item, index) in v.cartItemList"
        :key="index"
      >
        <div>
          <Checkbox
            :true-value="1"
            :false-value="0"
            :disabled="item.disabledchild"
            v-model="item.checkAllchild"
            @on-change="handleCheckItem(item, index)"
          ></Checkbox>

          <img :src="item.productImageLink" alt="" />
          <span>{{ item.productName }}</span>
        </div>
        <div>¥{{ item.price }}</div>
        <div>
          <InputNumber
            @on-blur="numBlur(item)"
            @on-change="numAdd"
            :min="1"
            v-model="item.productCount"
            controls-outside
          ></InputNumber>
        </div>
        <div>¥  {{ (item.price * item.productCount).toFixed(2) }}</div>
        <div class="deleteClass" @click="deleteGoodsItemInfo(item, v)">
          <span>删除</span>
        </div>
      </div>
    </div>
    <div class="confirmFrom" v-drag>
      <div>
        共 <span>{{ arrList }}</span> 件商品
      </div>
      <div>
        合计 <span>¥ {{ shoppAdds }}</span>
      </div>
      <div @click="settlementInfo">结算</div>
    </div>
  </div>
</template>

<script>
import { getAllShopCart, removeMultiProducts } from "@/utils/api";
import orderBreadcrumb from "@/components/orderBreadcrumb";
export default {
  name: "shoppingCart",
  components: { orderBreadcrumb },
  props: {},
  data() {
    return {
      title: this.$route.meta.title,
      shopState: 0, //店铺状态
      arrList: 0, //选中商品数量
      cuponDropdown: "优惠券",
      cuponDropdownList: [
        {
          type: 1,
          name: "暂无数据",
        },
      ],
      cuponListDataList: [], //购物车列表
      checkAllGroup: [], //选中商品列表
      checkAllGroupp: [], //选中店铺、商品列表
    };
  },
  filters: {},
  watch: {
    cuponListDataList: {
      handler(newValue, oldValue) {
        oldValue.forEach((item) => {
          item.cartItemList.forEach((i) => {
            if (item.disabled) {
              i.disabledchild = true;
            } else {
              i.disabledchild = false;
            }
          });
        });
      },
      deep: true,
    },
  },
  computed: {
    shoppAdds() {
      var total = 0;
      for (var i = 0; i < this.cuponListDataList.length; i++) {
        var item = this.cuponListDataList[i];
        for (var j = 0; j < item.cartItemList.length; j++) {
          var items = item.cartItemList[j];
          if (items.checkAllchild == true) {
            total = (
              (total * 100 +
                ((items.price * 10 * (items.productCount * 10)) / 100) * 100) /
              100
            ).toFixed(2);
          }
        }
      }
      return total.toString().replace(/\B(?=(\d{3})+$)/g, ","); //3位式显示金额
    },
  },
  created() {},
  mounted() {
    this.getAllShopCartInfo();
  },
  methods: {
    // 用户所有购物车列表
    getAllShopCartInfo() {
      getAllShopCart(this.$store.state.loginFromData).then((res) => {
        if (res || res.status == 200) {
          this.cuponListDataList = res.data;
          this.cuponListDataList = this.cuponListDataList.map((v) => ({
            ...v,
            checkAll: false,
            disabled: false,
            indeterminate: false,
          }));

          this.cuponListDataList.forEach((item) => {
            item.cartItemList = item.cartItemList.map((v) => ({
              ...v,
              disabledchild: false,
              checkAllchild: 0,
            }));
          });
        }
      });
    },
    // 删除部分商品
    deleteGoodsItemInfo(value, v) {
      var goodsItem = {
        shopId: v.shopId,
        productId: value.productId,
        productCount: value.productCount,
      };
      removeMultiProducts(goodsItem).then((res) => {
        if (res || res.status == 200) {
          this.getAllShopCartInfo();
        }
      });
    },
    // 商品数量失焦
    numBlur(e) {
      if (e.num == null) {
        e.num = 1;
      }
    },
    numAdd(e) {
      e++;
    },
    // 选中/反选
    handleCheck(data) {
      data.checkAll = !data.checkAll;
      this.cuponListDataList.forEach((item, index) => {
        if (data === item) {
          if (data.checkAll) {
            data.cartItemList.forEach((item) => {
              item.checkAllchild = 1;
            });
          } else {
            data.cartItemList.forEach((item) => {
              item.checkAllchild = 0;
            });
          }
        } else {
          item.disabled = !item.disabled;
        }
      });
    },
    //  商品选中/反选
    handleCheckItem(value) {
      value.checkAllchild == !value.checkAllchild;
    },
    // 结算
    settlementInfo() {
      this.checkAllGroupp = [];
      this.cuponListDataList.forEach((item, index) => {
        if (item.checkAll) {
          this.checkAllGroupp.push({
            shopName: item.shopName,
            csmShopId: item.shopId,
            emsCost: item.emsCost,
            productDetailsItem: [],
          });
          item.cartItemList.forEach((itemm) => {
            if (itemm.checkAllchild) {
              this.checkAllGroupp[
                this.checkAllGroupp.length - 1
              ].productDetailsItem.push({
                csmProductId: itemm.productId, //商品id
                number: itemm.productCount, //商品数量
                price: itemm.price, //商品价格
                productImageLink: itemm.productImageLink, //商品图片
                productName: itemm.productName, //商品名称
              });
              this.checkAllGroupp.forEach((v, i) => {
                let total = 0;
                v.productDetailsItem.forEach((vv, ii) => {
                  total = (vv.price * 10 * (vv.number * 10)) / 100 + total;
                  v.total = total.toFixed(2);
                });
              });
            } else {
              this.checkAllGroupp.forEach((item, index) => {
                item.productDetailsItem.forEach((sItem, sIndex) => {
                  if (sItem.csmProductId === itemm.productId) {
                    item.productDetailsItem.splice(sIndex, 1);
                  }
                });
              });
            }
          });
        } else {
          this.checkAllGroupp.forEach((itemp, index) => {
            if (itemp.csmShopId === item.shopId) {
              this.checkAllGroupp.splice(index, 1);
            }
          });
        }
      });
      if (this.checkAllGroupp.length != 0) {
         this.$router.push({
          path: "/pc/settlement",
          query: { checkAllGroupp: JSON.stringify(this.checkAllGroupp) },
        });
        // window.open(routeUrl.href, "_blank");
      } else {
        this.$Message.error({
          content: "请选择店铺商品！",
          duration: 4,
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
// 复选框
:deep(.ivu-radio-checked:hover .ivu-radio-inner) {
  border-color: #ea6240;
}
:deep(.ivu-checkbox-checked .ivu-checkbox-inner) {
  background-color: #ea6240;
  border-color: #ea6240;
}
:deep(.ivu-checkbox-focus) {
  box-shadow: 0 0 10px 2px #eb6b4b3e;
}
:deep(.ivu-checkbox-checked:hover .ivu-checkbox-inner) {
  border-color: #ea6240;
}
// end
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
:deep(.ivu-btn:focus) {
  box-shadow: 0 0 10px 2px #dbaea23e;
}
:deep(.ivu-btn:hover) {
  color: #ea6240;
  border-color: #ea6240;
}

.shoppingCart_box {
  width: 1280px;
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;
  position: relative;
  .sc_title {
    width: 100%;
    height: 46px;
    display: flex;
    align-items: center;
    background-color: #fff;
    border-bottom: 5px solid #fafafa;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr minmax(100px, 1fr);
    grid-template-rows: repeat(1, minmax(0, 1fr));
    gap: 30px;
    padding: 0 30px;
  }
  .cuponListDataListNull {
    margin-top: 40px;
  }
  .sc_list_item {
    width: 100%;
    background-color: #fff;
    .sc_list_title {
      padding: 0 30px;
      display: flex;
      align-items: center;
      height: 70px;
      border-bottom: 1px solid #fafafa;
      :deep(.ivu-checkbox) {
        margin: 0 20px 0 0;
      }
    }
    .cuponItem {
      display: flex;
      align-items: center;
      justify-content: space-between;
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr minmax(100px, 1fr);
      gap: 30px;
      padding: 20px 30px;
      border-bottom: 1px solid #fafafa;
      background-color: #fff;
      > div:nth-child(1) {
        display: flex;
        align-items: center;
        img {
          width: 110px;
          height: 110px;
          margin: 0 23px 0 20px;
        }
      }
      .deleteClass {
        cursor: pointer;
        span {
          display: inline-block;
          padding: 4px 10px;
        }
      }
      .deleteClass span:hover {
        color: #ea6240;
      }
    }
  }
  .confirmFrom {
    position: absolute;
    bottom: 0;
    left: 50%;
    // height: 55px;
    background-color: #fff;
    width: 100%;
    z-index: 9;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    transform: translateX(-50%);
    padding-right: 320px;
    box-shadow: 0 -1px 8px rgba(0, 1, 1, 0.08);
    > div:nth-child(1) {
      > span {
        color: #ea6747;
      }
    }
    > div:nth-child(2) {
      margin: 0 20px;
      > span {
        color: #ff5152;
        font-size: 25px;
        font-weight: bold;
      }
    }
    > div:nth-child(3) {
      margin: 10px 0;
      padding: 10px 20px;
      background-color: #ea6240;
      color: #fff;
      display: flex;
      cursor: pointer;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
    }
    > div:nth-child(3):active {
      opacity: 0.9;
    }
  }
}
</style>
