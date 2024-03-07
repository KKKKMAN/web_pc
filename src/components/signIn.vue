<template>
  <div class="signinBox">
    <div class="signinBoxTop">
      <div style="font-size: 18px; font-weight: bold">会员注册</div>
      <div>
        已有账号，去<span
          style="color: #ea6240; cursor: pointer"
          @click="loginInfo"
          >登录</span
        >
      </div>
    </div>
    <Form
      ref="formSignin"
      :model="formSignin"
      :rules="ruleSignin"
      label-position="left"
    >
      <FormItem prop="phone">
        <Input v-model="formSignin.phone" placeholder="请输入手机号"></Input>
      </FormItem>
      <FormItem prop="code"
        ><div
          style="
            display: flex;
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            grid-template-rows: repeat(1, minmax(0, 1fr));
            gap: 10px;
          "
        >
          <Input v-model="formSignin.code" placeholder="请输入验证码"></Input>
          <Button
            class="codeBtn"
            type="primary"
            style="height: 38px"
            :disabled="disabledShow"
            @click="codeInfo('formSignin')"
          >
            获取验证码</Button
          >
        </div></FormItem
      >
      <FormItem prop="psd">
        <Input
          v-model="formSignin.psd"
          placeholder="密码由6～16位数字和字母组成"
        ></Input>
      </FormItem>
      <FormItem prop="psdensure" style="margin-bottom: 20px">
        <Input
          v-model="formSignin.psdensure"
          placeholder="请再次输入上面的密码"
        ></Input>
      </FormItem>
      <FormItem prop="registerSource" style="margin-top: 10px !important">
        <Checkbox
          v-model="formSignin.registerSource"
          :true-value="1"
          :false-value="0"
          >我已阅读并接受</Checkbox
        >
        <span style="color: #ea6240; cursor: pointer"
          >《服务协议》《隐私政策》</span
        >
      </FormItem>
      <Button
        @click="loginSubmit('formSignin')"
        type="primary"
        style="width: 100%; height: 38px; margin-top: 15px"
        >立即注册</Button
      >
    </Form>
  </div>
</template>

<script>
import { signin, getCode } from "../utils/api";
export default {
  name: "signIn",
  components: {},
  props: {},
  data() {
    // 二次确定密码
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码！"));
      } else if (value !== this.formSignin.psd) {
        callback(new Error("密码不一致"));
      } else {
        callback();
      }
    };
    // 手机号验证
    const checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    // 验证码校验
    const checkCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码！"));
      } else if (value !== this.formSignin.code) {
        callback(new Error("验证码输入不正确！"));
      } else {
        callback();
      }
    };
    // 勾选阅读
    const registerSourceCheck = (rule, value, callback) => {
      if (value === 0) return callback(new Error("请勾选阅读协议"));
      callback();
    };
    return {
      yuedu: "", // 勾选阅读
      codeTime: 60, // 验证码倒计时
      disabledShow: false, // 获取验证码按钮禁用
      formSignin: {
        phone: "",
        code: "",
        psd: "",
        psdensure: "",
        registerSource: 0,
      },
      ruleSignin: {
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        code: [{ required: true, validator: checkCode, trigger: "blur" }],
        psd: [
          {
            required: true,
            message: "密码格式错误",
            trigger: "change",
          },
        ],
        psdensure: [{ validator: validatePassCheck, trigger: "blur" }],
        registerSource: [{ validator: registerSourceCheck, trigger: "change" }],
      },
    };
  },
  created() {},
  mounted() {},
  methods: {
    // 获取验证码
    codeInfo(name) {
      var codeBtnDocm = document.querySelector(".codeBtn");
      var time = this.codeTime;
      this.$refs[name].validateField("phone", (valid) => {
        if (!valid) {
          const phoneNum = {
            queryCondition01: this.formSignin.phone,
            queryCondition02: 1,
          };
          let timer = setInterval(() => {
            if (time == 0) {
              clearInterval(timer);
              this.disabledShow = false;
              codeBtnDocm.innerHTML = "获取验证码";
              time = this.codeTime;
            } else {
              time--;
              codeBtnDocm.innerHTML = time + "秒后重新发送";
            }
          }, 1000);
          this.disabledShow = true;
          getCode(phoneNum).then((res) => {
            // this.formSignin.code = res.data.data;
            if (res.status == 200) {
              this.$Message.success({
                content: res.message,
                duration: 5,
              });
            } else {
              this.$Message.error({
                content: res.message,
                duration: 5,
              });
            }
          });
        }
      });
    },
    loginInfo() {
      this.$emit("isShowInfo");
    },
    // 登录
    loginSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          signin(this.formSignin).then((res) => {

            if (res.status == 200) {
              this.$Message.success({
                content: res.message,
                duration: 5,
              });
            }else {
              this.$Message.error({
                content: res.message,
                duration: 5,
              });
            }
          });
        } else {
          this.$Message.error({
            content: "请输入对应内容进行注册",
            duration: 5,
          });
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.signinBoxTop {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  margin-bottom: 40px;
}
:deep(.ivu-input) {
  height: 38px;
  line-height: 4.5;
}
:deep(.ivu-btn-primary) {
  background-color: #ea6240;
  border-color: #ea6240;
}
:deep(.ivu-btn-primary:hover) {
  background-color: #ea6240;
  border-color: #ea6240;
}
:deep(.ivu-input:hover) {
  border-color: #ea6240;
}
:deep(.ivu-input:focus) {
  border-color: #ea6240;
  box-shadow: 0 0 10px 2px #eb6b4b3e;
}
:deep(.ivu-btn-primary:focus) {
  box-shadow: 0 0 10px 2px #eb6b4b3e;
}
</style>
