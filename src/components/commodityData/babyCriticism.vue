<template>
  <div class="babyCriticismBox">
    <div class="babyCriticism_top">
      <div class="babyCriticism_top_left">
        <p>5.0</p>
        <p>
          <span>商家评分</span
          ><span><Rate allow-half disabled v-model="rateValue" /></span>
        </p>
        <p><span>商品质量</span><span>5.0</span></p>
        <p><span>商品包装</span><span>5.0</span></p>
        <p><span>满意度</span><span>5.0</span></p>
      </div>
      <Divider type="vertical" />
      <div class="babyCriticism_top_right">
        <div
          v-for="(v, i) in babyCriticismTextName"
          :class="{ active: className == i }"
          @click="babyTextInfo(v, i)"
          :key="i"
        >
          {{ v }}
        </div>
      </div>
    </div>
    <div class="babyCriticism_text">
      <div class="babyCriticism_text_left">
        <img src="../../assets/12aa4a93649e292a.jpg" alt="" />
        <span>天宫环境会员</span>
      </div>
      <div class="babyCriticism_text_right">
        <div>2023-03-19 09：20：59</div>
        <div>日期很新鲜，分量很足！糯叽叽的很好吃！</div>
        <div class="babyCriticism_text_right_img">
          <div class="babyCriticism_text_right_img_box">
            <img preview="0" src="../../assets/4286402e3ac46550.jpg" alt="" />
          </div>
          <div class="babyCriticism_text_right_img_box">
            <img preview="0" src="../../assets/12aa4a93649e292a.jpg" alt="" />
          </div>
          <div class="babyCriticism_text_right_img_box">
            <img preview="0" src="../../assets/5f1a6d5a68c76.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="babyCriticism_text">
      <div class="babyCriticism_text_left">
        <img src="../../assets/12aa4a93649e292a.jpg" alt="" />
        <span>天宫环境会员</span>
      </div>
      <div class="babyCriticism_text_right">
        <div>2023-03-19 09：20：59</div>
        <div>日期很新鲜，分量很足！糯叽叽的很好吃！</div>
        <div class="babyCriticism_text_right_img">
          <div class="babyCriticism_text_right_img_box">
            <img preview="0" src="../../assets/4286402e3ac46550.jpg" alt="" />
          </div>
          <div class="babyCriticism_text_right_img_box">
            <img preview="0" src="../../assets/12aa4a93649e292a.jpg" alt="" />
          </div>
          <div class="babyCriticism_text_right_img_box">
            <img preview="0" src="../../assets/5f1a6d5a68c76.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "babyCriticism",
  components: {},
  props: {},
  data() {
    return {
      rateValue: 4,
      className: 0,
      babyCriticismTextName: [
        "全部(89)",
        "好评(89)",
        "有图/视频(89)",
        "做工精细(89)",
        "回头客(89)",
        "回头客(89)",
      ],
    };
  },
  created() {},
  mounted() {},
  methods: {
    babyTextInfo(v, i) {
      this.className = i;
    },
  },
};
</script>
<style lang="scss" scoped>
:deep(.ivu-rate-star-full:before) {
  color: #ea6240;
}
:deep(.ivu-rate-star-full:hover:before) {
  color: #ea6240;
}
:deep(.ivu-divider) {
  width: 2px;
  height: 140px;
  margin: 0 80px;
  background-color: #c8c8c8;
}
.babyCriticismBox {
  width: 100%;
  .babyCriticism_top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 60px;
    background-color: #fafafa;
    .babyCriticism_top_left {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      > p:nth-child(1) {
        color: #ea6240;
        font-size: 40px;
        font-weight: bold;
        font-family: Source Han Sans CN-Bold;
      }
      > p:nth-child(3) {
        margin: 8px 0;
      }
      > p:nth-child(4) {
        margin: 0 0 8px 0;
      }
      > p:nth-child(5) {
        > span:nth-child(1) {
          margin-right: 28px;
        }
      }
      > p {
        > span:nth-child(1) {
          font-size: 14px;
          color: #2a2a2a;
          margin-right: 15px;
        }
        > span:nth-child(2) {
          font-size: 14px;
          color: #666666;
        }
      }
    }
    .babyCriticism_top_right {
      flex: 1;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      display: grid;
      grid-template-columns: repeat(5, minmax(0, 1fr));
      gap: 20px;
      > div {
        padding: 10px 20px;
        border-radius: 4px;
        border: 1px solid #cecece;
        color: #2a2a2a;
        cursor: pointer;
      }
      .active {
        background-color: #ea6240;
        color: #fff;
      }
    }
  }
  .babyCriticism_text {
    background-color: #fff;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 30px 0;
    border-bottom: 1px solid #f4f5f4;
    .babyCriticism_text_left {
      display: flex;
      justify-content: center;
      padding: 0 168px 0 30px;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 20px;
      }
      span {
        font-weight: bold;
      }
    }
    .babyCriticism_text_right {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      > div:nth-child(2) {
        margin: 16px 0 12px 0;
      }
      .babyCriticism_text_right_img {
        flex-wrap: wrap;
        display: grid;
        grid-template-columns: repeat(6, minmax(0, 1fr));
        gap: 20px;
        .babyCriticism_text_right_img_box {
          width: 90px;
          height: 90px;
          cursor: pointer;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            // width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
