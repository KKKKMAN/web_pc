<template>
  <div class="myorderBox">
   
   <div class="header">
     <h3>评价订单</h3>
     <small>订单号: {{this.$route.query.shopId}}</small>
   </div>
  <div class="senciton">
    <div class="left">
       <img :src="this.$route.query.shopLogo"></img>
       <span>{{this.$route.query.shopName}}</span>
    </div>
    <span></span>
    <div class="right">
      <div class="block">
        <span class="demonstration">整体评价</span>
        <el-rate
          v-model="squear1"
          :colors="colors">
        </el-rate>
      </div>
      <!-- <div class="block">
        <span class="demonstration">包装</span>
        <el-rate
          v-model="squear2"
          :colors="colors">
        </el-rate>
      </div> -->
      <!-- <div class="block">
        <span class="demonstration">质量</span>
        <el-rate
          v-model="squear3"
          :colors="colors">
        </el-rate>
      </div> -->
      <!-- <div class="block">
        <span class="demonstration">配送时效</span>
        <el-rate
          v-model="squear4"
          :colors="colors">
        </el-rate>
      </div> -->
    </div>
  </div>

 <div class="footer">
    <div class="left">
      <!-- <img :src="imagesLink"></img> -->
      <p></p>
      </div>
      <div class="right">
        <small>您没有填写评价内容</small>
        <textarea placeholder="还可输入500字" maxlength="500" v-model="comments"></textarea>
       <div class="upload">
        <el-upload
          action="http://ylapi.yitaoshouyin.com:8089/csm/oss/uploadFile"
          list-type="picture-card"
          :on-success="handleAvatarSuccess"
          name="localFile"
          :limit="9"
          :multiple="true"
          :show-file-list="true"
          :on-exceed="handleExceed"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        
       </div> 
      </div>
 </div>

 <div class="publish">
  <div class="right" @click="publish">
    发表
  </div>
  <div class="left">
    <Checkbox v-model="anonymity"></Checkbox>
    <span>匿名评价</span>
  </div>
 </div>
  </div>
</template>

<script>
import { addNewOrderComments, getAllCommentByUserId } from "@/utils/api";
import OrderBreadcrumb from "../components/orderBreadcrumb.vue";
import { connectFn, unsubscribe, unconnect } from "@/utils/mqtt";
export default {
  name: "order",
  components: { OrderBreadcrumb },
  props: {},
  data() {
    return {
      dialogImageUrl: "",
      imagesLink: "",
      dialogVisible: false,
      List: "",
      squear1: null,
      squear2: null,
      squear3: null,
      squear4: null,
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"], // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
      title: "",
      videoWidth: 370, //视频宽度
      videoHeight: 200, //视频高度
      videoBoxShow: false, //视频模块
      canvasE: "",
      // 全部订单
      currentNum: 1, // 全部当前页码
      pageSize: 10, // 全部每页条数
      qorderList: null, //全部条数
      currentNumf: 1, // 待付款页码
      orderListf: null, // 待付款条数
      currentNumq: 1, // 待确定页码
      orderListq: null, // 待确定条数
      currentNums: 1, // 待收货页码
      orderLists: null, // 待收货条数
      currentNump: 1, // 待评价页码
      orderListp: null, // 待评价条数
      currentNumw: 1, // 已完成页码
      orderListw: null, // 已完成条数,
      currentNumpl: 1, // 已评价页码
      orderListpl: null, // 已评价条数
      orderListData: [], //全部订单列表
      obligationListData: [], //待付款列表
      toBeDecidedListData: [], //待确定
      waitForReceivingListData: [], //待收货
      awaitReviewedListData: [], //待评论
      accomplishListData: [], //已完成
      commentListData: [], //已评论
      orderdetailsList: {},
      cancelOrderFormShow: false,
      localFile: "",
      textI: [
        "不想要了/临时有事",
        "买错了/买多了/买少了",
        "地址/电话填写错误",
        "送达时间选错",
        "忘记写备注",
        "重复下单",
        "其他原因",
      ],
      comments: "", //评论内容
      images_link: [],
      anonymity:0,
      textIValue: "", //取消原因
      selectOrderError: false, //选择一种取消原因文字提示
      allOrder: (h) => {
        return h("div", [
          h("span", "全部订单"),
          this.orderListData.length > 0 ? h("Badge") : "",
        ]);
      },
      awaitPayment: (h) => {
        return h("div", [
          h("span", "待付款"),
          this.obligationListData.length > 0 ? h("Badge") : "",
        ]);
      },
      awaitConfirm: (h) => {
        return h("div", [
          h("span", "待确定"),
          this.toBeDecidedListData.length > 0 ? h("Badge") : "",
        ]);
      },
      awaitGoods: (h) => {
        return h("div", [
          h("span", "待收货"),
          this.waitForReceivingListData.length > 0 ? h("Badge") : "",
        ]);
      },
      awaitComment: (h) => {
        return h("div", [
          h("span", "待评价"),
          this.awaitReviewedListData.length > 0 ? h("Badge") : "",
        ]);
      },
      accomplish: (h) => {
        return h("div", [
          h("span", "已完成"),
          this.accomplishListData.length > 0 ? h("Badge") : "",
        ]);
      },
      comment: (h) => {
        return h("div", [
          h("span", "已评价"),
          this.commentListData.length > 0 ? h("Badge") : "",
        ]);
      },
    };
  },
  created() {
    console.log(this.$route.query.id);
    console.log(this.$route.query.shopId);
    this.Orderforgoods();
    // this.OrderList()
  },
  watch: {},
  mounted() {
    this.title = this.$route.meta.title;
  },
  methods: {
    getImageLink(fileList) {
      let imageLink = [];
      if (fileList && fileList.length > 0) {
        fileList.forEach((file) => {
          if (file.response && file.response.data) {
            imageLink.push(file.response.data);
          }
        });
      }
      return imageLink;
    },
    handleRemove(file, fileList) {
      this.images_link = this.getImageLink(fileList);
    },
    //图片上传成功回调
    handleAvatarSuccess(resp, file, fileList) {
      this.images_link = this.getImageLink(fileList);
    },
    handleExceed() {
      this.$Message.error({
        content: "最多可以上传9张图",
        duration: 4,
      });
    },
    Orderforgoods() {},
    OrderList() {
      getAllCommentByUserId({ id: this.$route.query.id }).then((res) => {
        console.log(res);
        this.List = res.data;
      });
    },
    publish() {
      const formData = {
        csmOrderId: this.$route.query.shopId,
        comments: this.comments,
        scoreAll: this.squear1,
        emsScore: 0,
        qualityScore: 0,
        packageScore: 0,
        id:this.$route.query.id,
       anonymity: Number(this.anonymity),
        shopId:this.$route.query.shopId,
        imageLink: this.images_link.join(","),
      };
      addNewOrderComments(formData).then((res) => {
        console.log(res, "ssssssss");
        if (res.status === "200") {
          this.$Message.success({
            content: "发表成功",
            duration: 4,
          });
        }else {
           this.$Message.error({
            content: res.message,
            duration: 4,
          });
        }
      }).catch(err => {

      });
    },
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
.videoBoxClass {
  z-index: 999;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba($color: #2a2a2a, $alpha: 0.5);
  transition: all 1s;
  // 邀请
  .inviteVideo {
    width: 370px;
    height: 628px;
    border-radius: 16px;
    overflow: hidden;
    position: absolute;
    display: flex !important;
    flex-direction: column !important;
    justify-content: space-between !important;
    align-items: center;
    color: #fff;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba($color: #000, $alpha: 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    .inviteVideotitle {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .inviteVideobtn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-bottom: 50px;
      > div:hover {
        cursor: pointer;
      }
    }
    .inviteVideoImg {
      width: 98px;
      height: 98px;
      border-radius: 50%;
      margin: 80px 0 15px 0;
      img {
        width: 100%;
      }
    }
    .inviteVideotext {
      margin: 20px 0 50px 0;
    }
    .inviteVideostatus {
      padding: 10px 30px;
      color: #fff;
      background-color: #2a2a2a;
    }
    // .video_Box {
    //   position: absolute;
    //   top: 0;
    //   left: 0;
    // }
    canvas {
      display: block;
      margin: 0 auto;
      z-index: 999;
    }
  }
  .videoBox {
    width: 370px;
    height: 628px;
    padding: 30px;
    border-radius: 16px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: pink;
  }
}
:deep(.ivu-page) {
  margin: 30px 0;
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
:deep(.el-upload--picture-card) {
  width: 48px;
  height: 48px;
  line-height: 59px;
}
:deep(.el-upload-list--picture-card .el-upload-list__item) {
  width: 48px;
  height: 48px;
}
.myorderBox {
  width: 1280px;
  :deep(.ivu-tabs-nav .ivu-tabs-tab-active) {
    color: #ea6240 !important;
  }
  :deep(.ivu-tabs-ink-bar) {
    background-color: #ea6240;
  }
  :deep(.ivu-tabs-nav .ivu-tabs-tab:hover) {
    color: #ea6240;
  }
  :deep(.ivu-tabs-nav) {
    height: 46px;
  }
  :deep(.ivu-tabs-tab) {
    line-height: 25px;
  }
  :deep(.ivu-tabs-bar) {
    background-color: #fff;
  }
  :deep(.ivu-badge) {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #ea6240;
    margin-left: 6px;
    top: -8px;
  }
  .header {
    width: 1200px;

    margin: 18px auto;
    h3 {
      font-family: PingFang SC, PingFang SC;
      font-weight: 500;
      font-size: 18px;
    }
    small {
      font-family: Source Han Sans CN, Source Han Sans CN;
      font-weight: 400;
      font-size: 14px;
      color: #666666;
    }
  }
  .senciton {
    width: 1200px;
    height: 108px;
    background: #fefffe;
    border-radius: 0px 0px 0px 0px;
    margin: 27px auto;
    display: flex;
    .left {
      width: 276px;
      height: 69px;
      border-right: 1px solid rgba(0, 0, 0, 0.04);
      margin: 0 45px;
      margin-top: 21px;
      display: flex;
      align-items: center;
      justify-content: space-evenly;

      img {
        width: 68px;
        height: 68px;
        border-radius: 50%;
      }
      span {
        font-family: Source Han Sans CN, Source Han Sans CN;
        font-weight: 500;
        font-size: 14px;
        color: #2a2a2a;
      }
    }
    .right {
      width: 377px;
      height: 49px;

      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: space-around;
      margin-top: 20px;
      margin-left: 30px;

      .block {
        width: 180px;
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
    }
  }
  .footer {
    width: 1200px;
    height: 248px;
    background: #fefffe;
    border-radius: 0px 0px 0px 0px;
    margin: 22px auto;
    .left {
      width: 224px;
      height: 155px;
      float: left;
      margin-top: 47px;
      margin-left: 53px;
      img {
        width: 99px;
        height: 99px;
      }
      p {
        font-family: Source Han Sans CN, Source Han Sans CN;
        font-weight: 400;
        font-size: 14px;
        color: #2a2a2a;
      }
    }
    .right {
      width: 720px;
      height: 202px;
      float: right;
      margin-top: 22px;
      margin-right: 81px;
      small {
        font-family: Source Han Sans CN, Source Han Sans CN;
        font-weight: 400;
        font-size: 12px;
        color: #2a2a2a;
      }
      textarea {
        width: 720px;
        height: 106px;
        border-radius: 0px 0px 0px 0px;
        border: 1px solid #999999;
        outline: none;
        margin-top: 20px;
        text-indent: 20px;
        padding-top: 10px;
      }
      .upload {
        // // width: 288px;
        display: flex;
      }
    }
  }
  .publish {
    width: 1200px;
    height: 108px;
    background: #fff;
    margin: 10px auto;
    display: flex;
    align-items: center;
    justify-content: center;
    .right {
      width: 220px;
      height: 48px;
      background: #ea6240;
      font-family: Source Han Sans CN, Source Han Sans CN;
      font-weight: 400;
      font-size: 20px;
      color: #fefffe;
      line-height: 48px;
      cursor: pointer;
    }
    .left {
      margin-left: 20px;
      display: flex;
      align-items: center;
      small {
        width: 12px;
        height: 12px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        display: block;
      }
      span {
        font-family: Source Han Sans CN, Source Han Sans CN;
        font-weight: 400;
        font-size: 12px;
        color: #666666;
        margin-left: 5px;
      }
    }
  }
}
:deep(.ivu-checkbox-checked .ivu-checkbox-inner) {
  background-color: #ea6240;
  border-color: #ea6240;
}
:deep(.ivu-checkbox:hover .ivu-checkbox-inner) {
  border-color: #ea6240;
}
</style>
