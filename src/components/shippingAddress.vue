<template>
  <div class="shippingaddressBox">
    <div
      class="shippingaddressItem"
      v-for="(v, i) in childShippingAddressInfodata"
      :key="i"
    >
      <div class="fle">
        <span class="icons">
          <img src="../assets/name.png" alt="" />
        </span>
        <span>{{ v.contacts }}</span>
      </div>
      <div class="fle" style="margin-top: 10px">
        <span class="icons">
          <img src="../assets/phone.png" alt="" />
        </span>
        <span>{{ v.phone }}</span>
      </div>
      <div class="fle fletopp">
        <span style="margin-right: 14px">
          <img
            style="width: 16px; height: 16px"
            src="../assets/dinwei.png"
            alt=""
          />
        </span>
        <div>{{ v.address }}</div>
      </div>
      <div style="display: flex; justify-content: flex-end; margin-top: 10px">
        <Button
          type="primary"
          ghost
          label="default"
          @click="getLongitudeLatitude(v)"
          >修改</Button
        >
        <Button
          v-if="v.defaultAddress !== 1"
          type="primary"
          ghost
          label="default"
          style="margin-left: 10px"
          @click="deleteAddress(v)"
          >删除</Button
        >
      </div>
      <!-- 右上角元素 -->
      <div v-if="v.defaultAddress == 1" class="biaoqian">
        <div class="textimg">默认地址</div>
      </div>
      <!-- 左下角元素 -->
      <img
        v-if="v.defaultAddress == 1"
        class="jiaobiaocss"
        src="../assets/jiaobiao.png"
        alt=""
      />
    </div>
    <!-- 修改模态框 -->
    <Modal
      v-model="modifactionaddresss"
      width="1000"
      closable
      @on-ok="maddressbtn"
      @on-cancel="cancel"
      draggable
      sticky
    >
      <template slot="header">
        <span class="linxing"></span>
        <span class="titleText">修改收货地址</span>
      </template>
      <template slot="footer">
        <Button
          type="primary"
          label="large"
          @click="cancel"
          ghost
          style="width: 118px; height: 38px; font-size: 16px"
          >取消</Button
        >
        <Button
          type="primary"
          label="large"
          style="
            background-color: #ea6240;
            width: 118px;
            height: 38px;
            font-size: 16px;
          "
          @click="maddressbtn('formLeft')"
          >保存</Button
        >
      </template>
      <Form
        ref="formLeft"
        :model="formLeft"
        :rules="ruleformLeftForm"
        label-position="left"
        :label-width="100"
      >
        <FormItem label="收货人：">
          <Input
            v-model="formLeft.contacts"
            class="shippingaddressinput"
          ></Input>
        </FormItem>
        <FormItem label="手机号：" prop="phone">
          <Input v-model="formLeft.phone" class="shippingaddressinput"></Input>
        </FormItem>
        <FormItem label="所在地区：">
          <Input
            v-model="formLeft.address"
            class="shippingaddressis"
            clearable
            placeholder="省"
          ></Input>
          <!-- <Input
            v-model="formLeft.shi"
            clearable
            class="shippingaddressis"
            placeholder="市"
          ></Input>
          <Input
            v-model="formLeft.qu"
            clearable
            class="shippingaddressis"
            placeholder="区/县"
          ></Input> -->
        </FormItem>
        <FormItem label="详细地址：">
          <Input
            v-model="formLeft.addressDetails"
            class="shippingaddressinput"
          ></Input>
        </FormItem>
        <FormItem label="默认地址：" class="bottomIswitch">
          <i-Switch
            true-color="#ea6240"
            false-color="#ccc"
            v-model="formLeft.defaultAddress"
            :true-value="1"
            :false-value="0"
          />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { delUserAddressByIds, updateUserAddress } from "@/utils/api";
export default {
  name: "shippingaddress",
  components: {},
  props: {
    shippingAddressInfodata: {
      type: Array,
    },
  },
  data() {
    return {
      childShippingAddressInfodata: Array,
      modifactionaddresss: false, //模态框
      formLeft: {
        address: "", //所在地区
        addressDetails: "", //详细地址
        contacts: "", //收货人
        defaultAddress: "", //默认地址状态
        id: "", // id
        isEmsScope: "", //范围
        latitude: "", //经度
        longitude: "", //维度
        phone: "", //手机号
        sex: 0, //性别
        userId: this.$store.state.loginFromData.id, //用户id
      },
      ruleformLeftForm: {
        phone: [
          {
            required: true,
            message: "请输入收货人联系方式",
            trigger: "blur",
          },
          {
            type: "string",
            min: 11,
            max: 11,
            message: "手机号格式为11位数字",
            trigger: "blur",
          },
        ],
      },
    };
  },
  watch: {
    shippingAddressInfodata: {
      handler(newValue, oldValue) {
        this.childShippingAddressInfodata = newValue;
      },
      deep: true,
      immediate: true,
    },
  },
  created() {},
  mounted() {},
  methods: {
    maddressbtn(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.modifactionaddresss = false;
          updateUserAddress(this.formLeft).then((res) => {
            if (res.status == 200) {
              this.$parent.getUserAddressListInfo();
              this.$Message.success({
                content: res.message,
                duration: 5,
              });
            }
          });
        }
      });
    },
    cancel() {
      this.modifactionaddresss = false;
    },
    getLongitudeLatitude(item) {
      this.modifactionaddresss = !this.modifactionaddresss;
      this.formLeft.contacts = item.contacts; //收货人
      this.formLeft.phone = item.phone; //手机号
      this.formLeft.address = item.address; //所在地区
      this.formLeft.addressDetails = item.addressDetails; //详细地址
      this.formLeft.id = item.id; //id
      this.formLeft.latitude = item.latitude; //经度
      this.formLeft.longitude = item.longitude; //维度
      this.formLeft.defaultAddress = item.defaultAddress; //默认地址状态
    },
    // 删除地址
    deleteAddress(item) {
      var deleteAddressForm = {
        beginDistance: 0,
        currPage: 0,
        dateType: 0,
        endDate: "string",
        endDistance: 0,
        fileLink: "string",
        id: "",
        ids: [item.id],
        latitude: item.latitude,
        longitude: item.longitude,
        queryCondition01: "string",
        queryCondition02: "string",
        queryCondition03: "string",
        queryCondition04: "string",
        records: 0,
        startDate: "string",
        status: 0,
        type: 0,
      };
      delUserAddressByIds(deleteAddressForm).then((res) => {
        this.$parent.getUserAddressListInfo();
        if (res || res.status == 200) {
          this.$Message.success({
            content: res.message,
            duration: 4,
          });
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
:deep(.ivu-switch:not(.ivu-switch-disabled):focus) {
  box-shadow: 0 0 10px 2px #eb6b4b3e;
}
:deep(.bottomIswitch) {
  display: flex;
  align-items: center;
}
:deep(.bottomIswitch .ivu-form-item-content) {
  margin-left: 0 !important;
}
.shippingaddressBox {
  width: 100%;
  display: flex;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-rows: repeat(1, minmax(0, 1fr));
  gap: 20px;
  .shippingaddressItem {
    transition: all 0.3s;
    cursor: pointer;
    position: relative;
    padding: 24px 21px;
    box-sizing: border-box;
    border: 1px dashed transparent;
    background: linear-gradient(#fff, #fff) padding-box,
      repeating-linear-gradient(
        -45deg,
        #c0c0c0 0,
        #c0c0c0 1em,
        #fff 1em,
        #fff 1.5em
      );
    .fle {
      display: flex;
      align-items: center;
      font-size: 17px;
      .icons {
        width: 16px;
        height: 16px;
        display: block;
        margin-right: 14px;
        img {
          width: 100%;
        }
      }
    }
    .fletopp {
      display: flex;
      align-items: flex-start;
      word-wrap: break-word;
      text-align: left;
      margin-top: 10px;
      min-height: 51px;
    }
    .biaoqian {
      position: absolute;
      width: 110px;
      height: 34px;
      line-height: 34px;
      color: #fff;
      top: -1px;
      right: -1px;
      overflow: hidden;
      background: url("../assets/dizhi.png") no-repeat center 100%;
    }
    .jiaobiaocss {
      position: absolute;
      bottom: -1px;
      right: -1px;
      width: 38px;
      height: 38px;
    }
  }

  .shippingaddressItem:hover {
    box-shadow: 17px 15px 15px -10px #ccc;
  }
  .shippingaddressItem::after {
    position: absolute;
    content: "";
    width: 30px;
    height: 20px;
    top: -13px;
    right: -16px;
    transform: rotate(238deg);
    border: 1px dashed #c0c0c0;
    overflow: hidden;
    background-color: #fff;
    clip-path: polygon(0 0, 90% 100%, 0 calc(100% - 70px));
  }
  :deep(.ivu-btn-ghost.ivu-btn-primary) {
    color: #ea6240;
  }
  :deep(.ivu-btn-primary) {
    border-color: #ea6240;
  }
}
:deep(.ivu-btn-ghost.ivu-btn-primary) {
  color: #ea6240;
}
:deep(.ivu-btn-primary) {
  border-color: #ea6240;
}
:deep(.ivu-btn-primary:hover) {
  //   background-color: #ea6240;
  border-color: #ea6240;
}
.linxing {
  display: inline-block;
  width: 12px;
  height: 12px;
  background-color: #ea6240;
  transform: rotate(45deg);
  margin-right: 16px;
}
.titleText {
  font-size: 18px;
  font-weight: bold;
}
// 表单样式
:deep(.ivu-input) {
  height: 40px;
}
.shippingaddressinput {
  width: 400px;
  height: 40px;
}
.shippingaddressis {
  width: 300px;
  height: 40px;
  margin-right: 20px;
}
:deep(.ivu-form-item-content) {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
:deep(.ivu-input:hover) {
  border-color: #ea6240;
}
:deep(.ivu-input:focus) {
  border-color: #ea6240;
  box-shadow: 0 0 10px 2px #eb6b4b3e;
}
:deep(.ivu-form-item-label) {
  font-size: 15px;
  font-weight: bold;
}
:deep(.ivu-btn-ghost.ivu-btn-primary:hover) {
  color: #ea6240;
}
:deep(.ivu-btn-ghost:focus) {
  border-color: #ea6240;
  box-shadow: 0 0 10px 2px #eb6b4b3e;
}
:deep(.ivu-btn-primary:focus) {
  box-shadow: 0 0 10px 2px #eb6b4b3e;
}
</style>
