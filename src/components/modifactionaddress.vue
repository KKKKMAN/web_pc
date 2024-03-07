<template>
  <!-- 新增收货地址 -->
  <Modal
    v-model="modifactionaddresShow"
    width="1000"
    closable
    @on-ok="ok"
    @on-cancel="cancel"
  >
    <template slot="header">
      <span class="linxing"></span>
      <span class="titleText">新增收货地址</span>
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
        @click="ok"
        style="
          background-color: #ea6240;
          width: 118px;
          height: 38px;
          font-size: 16px;
        "
        >保存</Button
      >
    </template>
    <Form :model="formLeft" label-position="left" :label-width="100">
      <FormItem label="收货人：">
        <Input v-model="formLeft.input1" class="shippingaddressinput"></Input>
      </FormItem>
      <FormItem label="手机号：">
        <Input v-model="formLeft.input2" class="shippingaddressinput"></Input>
      </FormItem>
      <FormItem label="所在地区：">
        <!-- <Cascader :data="data1" v-model="value1"></Cascader> -->
        <Input
          v-model="formLeft.she"
          class="shippingaddressis"
          clearable
          placeholder="省"
        ></Input>
        <Input
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
        ></Input>
      </FormItem>
      <FormItem label="详细地址：">
        <Input v-model="formLeft.xiangxi" class="shippingaddressinput"></Input>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
export default {
  name: "modifa",
  components: {},
  props: {
    modifactionaddresShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      modifactionaddress: this.modifactionaddresShow,
      formLeft: {
        input1: "",
        input2: "",
        she: "",
        shi: "",
        qu: "",
        xiangxi: "",
      },
    };
  },
  created() {},
  watch: {
    data() {
      this.modifactionaddress = this.modifactionaddresShow;
    },
  },
  mounted() {},
  methods: {
    ok() {
      this.$emit("showdata", false);
    },
    cancel() {
      this.$emit("showdata", false);
    },
  },
};
</script>
<style lang="scss" scoped>
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
