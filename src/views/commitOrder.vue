<template>
  <div>
    <div class="commitorder_box" v-if="playsucces">
      <div class="commitorder_box_title">
        <div><img src="../assets/succeed.png" alt="" /></div>
        <div class="c_box_title_flex">
          <p>订单提交成功</p>
          <p>
            共 <span class="commitorder_color">1</span> 张订单，订单号
            <span style="margin-right: 30px">{{ dataId }}</span>
            <span
              >请于
              <span class="commitorder_color">
                <!-- <CountDown :target="dataTime"  v-font="20" /> -->
                23分18秒内支付完成</span
              >
            </span>
          </p>
        </div>
        <div>
          订单金额：
          <span style="color: #ff5152; font-size: 18px; font-weight: bold"
            >¥ &nbsp{{ total }}&nbsp</span
          >
          元
        </div>
      </div>
      <Divider />
      <div class="wacthPlay_box">
        <div v-if="payShow">
          <img src="../assets/wacthlog.png" alt="" />
          <span>微信支付</span>
        </div>
        <div v-else>
          <img src="../assets/wacthlog.png" alt="" />
          <span>支付宝支付</span>
        </div>
        <div tabindex="1" @click="cutPayClick">
          切换{{ payShow ? "支付宝" : "微信" }}支付
        </div>
      </div>
      <div class="play_qrcode_box">
        <p>请使用{{ textPay }}APP扫码</p>
        <div v-show="payShow">
          <vue-qr
            :logo-src="logoSrc"
            :size="200"
            :margin="0"
            :auto-color="true"
            :dot-scale="1"
            :text="wechatSrc"
            colorDark="black"
            colorLight="white"
          />
        </div>
        <div v-show="!payShow">
          <!-- <iframe
            id="alipayFrame"
            :srcdoc="srcdocUrl"
            frameborder="no"
            border="0"
            marginwidth="0"
            marginheight="0"
            scrolling="no"
            width="200"
            height="200"
            style="overflow: hidden"
          >
          </iframe> -->
        </div>

        <p>扫一扫快速付款</p>
      </div>
    </div>
    <div class="succeedbox" v-else>
      <Icon class="icon_succee" type="ios-checkmark-circle" />
      <div class="succeedbox_text">恭喜你，订单支付成功！</div>
      <div tabindex="1" class="succeed_btn">
        <div tabindex="1" @click="returnorder">查看订单</div>
        <div tabindex="1" @click="goindex">返回首页</div>
      </div>
    </div>
    <!-- 超时提示 -->
    <Modal
      v-model="playTime"
      top="200"
      draggable
      sticky
      scrollable
      width="750"
      :styles="{ top: '220px' }"
      :footer-hide="true"
      title=" "
      class="play_modal"
    >
      <div class="play_modal_title">
        <img src="../assets/guize.png" alt="" /><span>订单已过期</span>
      </div>
      <div class="play_modal_btn">
        <div>查看订单</div>
        <div>返回首页</div>
      </div>
    </Modal>
  </div>
</template>

<script>
import { orderPay, createQrCode, wxNotifyPlay } from "../utils/api";
import vueQr from "vue-qr";
import { socket } from "@/utils/websocket";
export default {
  name: "commitOrder",
  components: { vueQr },
  data() {
    return {
      dataTime: new Date().getTime() + 30000,
      playTime: false,
      playsucces: true,
      total: "",
      dataId: "",
      payShow: true, //默认微信支付
      textPay: "微信", //默认微信支付
      logoSrc: require("../assets/wacthlog.png"), //微信logo
      wechatSrc: "", // 微信二维码
      srcdocUrl: "", //支付宝
    };
  },
  created() {
    this.total = this.$route.query.total;
    this.dataId = this.$route.query.dataId;
    this.createQrCodeWXInfo();
    // 发起连接
    socket.init();
    // this.createQrCodeZFBInfo(); //支付宝form 获取
  },
  methods: {
    ok() {},
    cancel() {},
    // 查看订单
    returnorder() {
      this.$router.push("/pc/order");
    },
    // 返回首页
    goindex() {
      this.$router.push("/pc");
    },
    // 切换支付
    cutPayClick() {
      this.payShow = !this.payShow;
      this.textPay = this.payShow ? "微信" : "支付宝";
    },
    //微信支付
    createQrCodeWXInfo() {
      let data = {
        queryCondition01: this.dataId, //订单编号
        queryCondition02: "wx", //支付类型 wx；zfb
      };
      createQrCode(data).then((res) => {
        if (res || res.status === 200) {
          if (res.data) {
            this.wechatSrc = res.data;
            socket.receive();
          } else {
            this.appSrc = res.message;
          }
        }
      });
    },

    // 支付宝
    createQrCodeZFBInfo() {
      let data = {
        queryCondition01: this.dataId, //订单编号
        queryCondition02: "zfb", //支付类型 wx；zfb
      };
      createQrCode(data).then((res) => {
        if (res || res.status === 200) {
          console.log(res, "获取支付宝二维码");
          this.srcdocUrl = res.data;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
:deep(.ivu-modal-header) {
  border: 0;
}
:deep(.ivu-modal-body) {
  padding: 14px 0 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.play_modal_title {
  font-size: 20px;
  display: flex;
  align-items: center;
  > img {
    margin-right: 10px;
  }
}
.play_modal_btn {
  display: flex;
  align-items: center;
  margin-top: 40px;
  > div {
    padding: 10px 30px;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    margin: 0 20px;
    cursor: pointer;
  }
  > div:hover {
    border-color: #ea6240;
    color: #ea6240;
  }
}
@mixin cen {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.commitorder_box {
  width: 1280px;
  margin-top: 40px;
  padding: 30px 0 100px 0;
  background-color: #fff;
  color: #2a2a2a;
  .commitorder_box_title {
    padding: 0 40px;
    @include cen;
    .c_box_title_flex {
      flex: 1;
      line-height: 25px;
      text-align: left;
      margin-left: 20px;
    }
    .commitorder_color {
      color: #ea6240;
    }
  }
  .wacthPlay_box {
    padding: 0 40px;
    @include cen;
    > div:nth-child(1) {
      @include cen;
      > span {
        margin-left: 20px;
      }
    }
    > div:nth-child(2) {
      padding: 10px 15px;
      border: 1px solid #dcdee2;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s;
    }
    > div:nth-child(2):hover {
      border-color: #ea6240;
      color: #ea6240;
    }
    > div:nth-child(2):focus {
      box-shadow: 0 0 10px 2px #eb6b4b3e;
    }
  }
  .play_qrcode_box {
    margin-top: 50px;
    > p:nth-child(1) {
      margin-bottom: 5px;
    }
    > img {
      width: 180px;
      height: 180px;
    }
    > p:nth-child(2) {
      margin-top: 5px;
    }
  }
}
.succeedbox {
  margin-top: 130px;
  .icon_succee {
    font-size: 120px;
    color: #33a954;
  }
  .succeedbox_text {
    font-size: 25px;
    color: #ea6240;
    margin: 30px 0 80px 0;
  }
  .succeed_btn {
    @include cen;
    > div {
      padding: 8px 20px;
      border: 1px solid #dcdee2;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s;
    }
    > div:hover {
      border-color: #ea6240;
      color: #ea6240;
    }
    > div:focus {
      box-shadow: 0 0 10px 2px #eb6b4b3e;
    }
  }
}
</style>
