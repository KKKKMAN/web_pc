<template>
  <div class="osdcom">
    <div class="osdcomTop">
      <div class="centers">
        <div class="centersTop">订单信息</div>
        <div>订单号： &nbsp {{ orderdetailsList.shopId }}</div>
        <div>下单时间：{{ orderdetailsList.createTime }}</div>
        <div>
          订单状态：{{ $ORDER_STATUS_DATA[orderdetailsList.orderStatus] }}
        </div>
        <div class="takexx">
          <div>收货信息：</div>
          <div class="siteclass">
            <div>{{ orderdetailsList.shopName }} 1345356456456</div>
            <div>陕西省西安市雁塔光西省西雁塔区含光路绿光区3区含光路绿</div>
          </div>
        </div>
        <div>订单备注：联系不上的话，放快递即可</div>
      </div>
      <Divider class="divideri" type="vertical" />
      <div class="centers">
        <div class="centersTop">配送信息</div>
        <div>配送方式：商家配送</div>
        <div>
          视频确认：<span style="color: #ff5152">{{
            orderdetailsList.videoCall == 1 ? "是" : "否"
          }}</span>
        </div>
        <div>期望时间：2023-12-08 10:30 ~ 11:00</div>
      </div>
      <Divider class="divideri" type="vertical" />
      <div class="centers">
        <div class="centersTop">付款信息</div>
        <div>付款方式：未选择</div>
        <div>付款时间：2023-12-08 09:23:10</div>
        <div style="margin-top: 20px; color: #ff5152">
          核销码：{{ orderdetailsList.code }}
        </div>
      </div>
    </div>
    <div class="osdcomCneterr">
      <div class="oc_t">
        <div>商品信息</div>
        <div>单价</div>
        <div>优惠</div>
        <div>数量</div>
        <div>小计</div>
      </div>
      <div
        class="oc_c"
        v-for="(v, i) in orderdetailsList.productItemsList"
        :key="i"
      >
        <div>
          <img :src="v.img01" alt="" />
          <div>{{ v.productName }}</div>
        </div>
        <div>¥ {{ v.price }}</div>
        <div>-¥</div>
        <div>{{ v.number }}</div>
        <div>¥{{ (v.price * v.number).toFixed(2) }}</div>
      </div>
      <!-- <div class="oc_c">
        <div>
          <img src="../assets/12aa4a93649e292a.jpg" alt="" />
          <div>软糯驴打滚软糯驴</div>
        </div>
        <div>¥ 15.90</div>
        <div>-¥ 2.92</div>
        <div>1</div>
        <div>¥ 12.98</div>
      </div> -->
      <div class="oc_b">
        <div>
          <span class="oc_b_n">商品总价：</span
          ><span class="oc_b_p">¥ {{ orderdetailsList.total }}</span>
        </div>
        <div>
          <span class="oc_b_n">配送费：</span><span class="oc_b_p">¥ 0.00</span>
        </div>
        <!-- <div>
          <span class="oc_b_n">优惠金额：</span
          ><span class="oc_b_p">¥ 10.00</span>
        </div> -->
        <div>
          <span class="oc_b_n">应付金额：</span
          ><span class="oc_b_p">¥ {{ orderdetailsList.actualPay }}</span>
        </div>
        <div v-if="orderdetailsList.orderStatus == '000' ? true : false">
          <div class="quxiao" @click="cancelOrderInfo">取消订单</div>
          <div class="gopay" @click="paybutton">去支付</div>
        </div>
      </div>
    </div>
    <!-- 订单追踪 -->
    <!-- <div class="osdcomBottom">
      <div class="osdcomBottom_t">订单追踪</div>
      <div class="osdcomBottom_c">
        <div class="top_tt">
          <div class="top_tt_b" v-for="(v, i) in list" :key="i">
            <div
              class="top_tt_b_num"
              :class="
                v.num == item || v.status < item
                  ? 'accomplish'
                  : 'tobecompleted'
              "
            >
              <span v-if="v.num == item || v.status > item">{{ v.num }}</span>
              <Icon v-else type="md-checkmark"></Icon>
            </div>
            <div
              class="top_tt_b_hx"
              style="width: 130px"
              :class="
                v.num == item || v.status > item
                  ? 'baccomplish'
                  : 'btobecompleted'
              "
              v-if="i + 1 !== 7"
            ></div>
          </div>
        </div>
        <div class="top_t">
          <div
            class="top_t_i"
            v-for="(v, i) in list"
            :key="i"
            :class="
              v.num == item || v.status < item
                ? 'textaccomplish'
                : 'texttobecompleted'
            "
          >
            {{ v.name }}
          </div>
        </div>
      </div>
      <div class="osdcomBottom_list">
        <div class="ol_item" v-for="(v, i) in textshuoming">
          <div></div>
          <div>{{ v.time }}</div>
          <div>{{ v.title }}</div>
        </div>
      </div>
    </div> -->
    <!-- 取消模态框 -->
    <Modal v-model="cancelOrderFormShow" draggable width="700">
      <p
        slot="header"
        style="color: #f60; text-align: center; text-align: left"
      >
        <Icon type="ios-information-circle" :size="20"></Icon>
        <span style="margin-left: 10px">选择取消原因</span>
      </p>
      <div class="it_con" style="text-align: center">
        <div
          class="it_box"
          tabindex="1"
          v-for="(v, i) in textI"
          :key="i"
          @click="textIclick(v)"
        >
          {{ v }}
        </div>
      </div>
      <div class="errquxiao" v-if="selectOrderError">请选择一种取消原因</div>
      <div slot="footer" style="padding: 12px 62px">
        <Button
          style="background-color: #ea6240"
          type="error"
          size="large"
          long
          @click="commit"
          >提交</Button
        >
      </div>
    </Modal>
  </div>
</template>

<script>
import { cancelOrder } from "../utils/api";
export default {
  name: "orderstatusdetails",
  components: {},
  data() {
    return {
      item: "006",
      list: [
        {
          num: 1,
          status: "001",
          name: "订单已提交",
        },
        {
          num: 2,
          status: "002",
          name: "支付成功",
        },
        {
          num: 3,
          status: "003",
          name: "商家已接单",
        },
        {
          num: 4,
          status: "004",
          name: "商家拣货中",
        },
        {
          num: 5,
          status: "005",
          name: "待确认",
        },
        {
          num: 6,
          status: "006",
          name: "待配送",
        },
        {
          num: 7,
          status: "007",
          name: "待收货",
        },
      ],
      // duihao
      icond: '<Icon type="md-checkmark"></Icon>',
      textshuoming: [
        {
          title: "商家已接单",
          time: "2024-01-04 18:56:23",
        },
        {
          title: "您的订单已支付成功，支付方式为：支付宝",
          time: "2024-01-04 18:46:23",
        },
        {
          title: "您的订单已提交",
          time: "2024-01-04 18:36:23",
        },
      ],
      orderdetailsList: {},
      cancelOrderFormShow: false,
      textI: [
        "不想要了/临时有事",
        "买错了/买多了/买少了",
        "地址/电话填写错误",
        "送达时间选错",
        "忘记写备注",
        "重复下单",
        "其他原因",
      ],
      textIValue: "", //取消原因
      selectOrderError: false, //选择一种取消原因文字提示
    };
  },
  watch: {
    // selectOrderError() {
    //   return this.textIValue;
    // },
    textIValue(newda, oldda) {
      if (newda) {
        this.selectOrderError = false;
      } else {
        this.selectOrderError = true;
      }
    },
  },
  created() {
    this.orderdetailsList = JSON.parse(this.$route.query.orderitemd);
    console.log('sssssss',this.orderdetailsList);
  },
  mounted() {},
  methods: {
    cancelOrderInfo() {
      this.cancelOrderFormShow = true;
    },
    // 取消原因选择
    textIclick(value) {
      this.textIValue = value;
    },
    // 提交
    commit() {
      let cancelOrderForm = {
        id: this.orderdetailsList.id,
        queryCondition01: this.textIValue,
      };
      if (cancelOrderForm.queryCondition01 !== "") {
        console.log(cancelOrderForm);
        this.cancelOrderFormShow = false;
        cancelOrder(cancelOrderForm).then((res) => {
          console.log(res, "res");
          if (res) {
            if (res.status == 200) {
              this.$Message.success({
                content: res.message,
                duration: 4,
              });
            } else {
              this.$Message.error({
                content: res.message,
                duration: 4,
              });
            }
          }
        });
      } else {
        this.selectOrderError = true;
      }
    },
    paybutton() {
      this.$router.push({
      path: `/pc/commitOrder?dataId=${this.orderdetailsList.id}&total=${this.orderdetailsList.total}`,
    })
    }
    
  },
  
};
</script>

<style lang="scss" scoped>
.errquxiao {
  padding: 20px 0;
  display: flex;
  align-items: center;
  color: red;
}
:deep(.ivu-modal-body) {
  padding: 50px 80px 20px 80px;
}
.it_con {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;

  .it_box {
    padding: 8px 15px;
    color: #666666;
    cursor: pointer;
    // background-color: #ea6240;
    border: 1px solid #999999;
  }
  .it_box:focus {
    color: #fff;
    background-color: #ea6240;
    border: 1px solid #ea6240;
  }
}

.osdcom {
  width: 1280px;
  margin: 30px 0 200px 0;

  .osdcomTop {
    width: 100%;
    padding: 20px 30px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    :deep(.ivu-divider, .ivu-divider-vertical) {
      height: 14em;
    }
    .centers {
      line-height: 30px;
      text-align: left;
      margin-left: 10px;
      flex: 1;
      .takexx {
        display: flex;
        .siteclass {
          width: 300px;
        }
      }
    }
    .centersTop {
      font-weight: bold;
      font-size: 15px;
    }
  }
  .osdcomCneterr {
    margin-top: 30px;
    background-color: #fff;

    .oc_t {
      display: flex;
      background-color: #f2f2f2;
      align-items: center;
      justify-content: space-between;
      text-align: center;
      display: grid;
      grid-template-columns: 3fr 1fr 1fr 1fr 1fr;
      gap: 30px;
      padding: 15px 40px;
    }
    .oc_c {
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-align: center;
      display: grid;
      grid-template-columns: 3fr 1fr 1fr 1fr 1fr;
      gap: 30px;
      padding: 20px 40px;
      border-bottom: 1px solid #f2f2f2;
      > div:nth-child(1) {
        display: flex;
        align-items: center;
        text-align: left;
      }
      img {
        width: 68px;
        height: 68px;
        margin-right: 20px;
      }
      > div:nth-child(5) {
        color: #ff5152;
      }
    }
    .oc_b {
      text-align: right;
      line-height: 30px;
      padding: 25px 50px;
      color: #666;
      > div:last-child {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-top: 20px;
        > div {
          padding: 4px 20px;
          border-radius: 4px;
          cursor: pointer;
        }
        .quxiao {
          border: 1px solid #d9d9d9;
        }
        .gopay {
          margin: 0 50px;
          background-color: #ea6240;
          color: #fff;
        }
      }
      .oc_b_n {
        display: inline-block;
        width: 100px;
      }
      .oc_b_p {
        display: inline-block;
        width: 100px;
        color: #ff5152;
        text-align: left;
        margin-left: 10px;
      }
    }
  }
  .osdcomBottom {
    padding: 30px;
    margin-top: 30px;
    background-color: #fff;
    .osdcomBottom_t {
      text-align: left;
      font-size: 15px;
      font-weight: bold;
    }
    .osdcomBottom_c {
      margin: 50px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .top_tt {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        .top_tt_b {
          display: flex;
          align-items: center;
          .top_tt_b_num {
            width: 25px;
            height: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
          }
          // 已完成的样式
          .accomplish {
            color: #54c528;
            border: 1px solid #54c528;
          }
          // 未完成的样式
          .tobecompleted {
            border: 1px solid #ccc;
          }
          // 横线完成样式
          .top_tt_b_hx {
            height: 1px;
          }
          .baccomplish {
            background-color: #ccc;
          }
          //
          .btobecompleted {
            background-color: #54c528;
          }
        }
      }
      .top_t {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 69px;
      }
      .top_t_i {
        width: 150px;
        // font-weight: bold;
      }
      // 完成文字样式
      .textaccomplish {
        color: #54c528;
      }
      // 未完成文字样式
      .texttobecompleted {
        color: #666666;
      }
    }
    .osdcomBottom_list {
      padding: 0 120px;
      line-height: 35px;
      .ol_item {
        display: flex;
        align-items: center;
        color: #666666;
        > div:nth-child(1) {
          width: 10px;
          height: 10px;
          background-color: #54c528;
          border-radius: 50%;
        }
        > div:nth-child(2) {
          margin: 0 25px 0 10px;
        }
      }
    }
  }
}
</style>
