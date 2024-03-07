<template>
  <div class="signinBox">
    <div class="signinBoxTop">
      <div>云端超市登录</div>
    </div>
    <Form
      ref="formLogin"
      :model="formLogin"
      :rules="ruleLogin"
      label-position="left"
    >
      <FormItem prop="username">
        <Input v-model="formLogin.username" placeholder="请输入手机号"></Input>
      </FormItem>
      <FormItem prop="password">
        <Input
          v-model="formLogin.password"
          placeholder="密码由6～16位数字和字母组成"
        ></Input>
      </FormItem>
      <Checkbox v-model="registerSource">我已阅读并接受</Checkbox>
      <span style="color: #ea6240">《服务协议》《隐私政策》</span>
      <Button
        @click="loginInfo('formLogin')"
        type="primary"
        style="width: 100%; height: 38px; margin-top: 20px"
        >登录</Button
      >
      <div class="boxBottom">
        <div></div>
        <div @click="signInInfo">立即注册</div>
      </div>
    </Form>
  </div>
</template>

<script>
import { login } from "../utils/api";
export default {
  name: "signIn",
  components: {},
  props: {},
  data() {
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
    // 勾选阅读
    const registerSourceCheck = (rule, value, callback) => {
      if (value === 0) return callback(new Error("请勾选阅读协议"));
      callback();
    };
    return {
      formLogin: {
        username: "",
        password: "",
      },
      registerSource: false,
      ruleLogin: {
        username: [{ required: true, validator: checkPhone, trigger: "blur" }],
        password: [
          {
            required: true,
            message: "密码格式错误",
            trigger: "change",
          },
        ],
        // registerSource: [{ validator: registerSourceCheck, trigger: "change" }],
      },
    };
  },
  created() {},
  mounted() {},
  methods: {
    // 去注册
    signInInfo() {
      this.$emit("isShowInfoSign");
    },
    // 登录
    loginInfo(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.registerSource) {
            // 验证通过
            login(this.formLogin).then((res) => {
              if (res.status == 200) {
                // 登录成功
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("status", res.data.status);
                localStorage.setItem("id", res.data.id);
                localStorage.setItem("username", res.data.username);
                localStorage.setItem("nickname", res.data.nickname);
                localStorage.setItem("avatar", res.data.avatar);
                this.$Message.success({
                  content: res.message,
                  duration: 3,
                });
                this.$router.push("/pc");
              }else {
                this.$Message.error(res.message);
              }
            });
          } else {
            this.$Message.error("请勾选我已阅读!");
          }
        } else {
          // 验证失败
          this.$Message.error({
            content: "请输入对应内容进行登录",
            duration: 5,
          });
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.boxBottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  color: #d7d8d7;
  > div:hover {
    cursor: pointer;
    color: #ea6240;
  }
}
.signinBoxTop {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  margin-bottom: 40px;
  > div {
    width: 100%;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
  }
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
:deep(.ivu-checkbox-checked .ivu-checkbox-inner) {
  background-color: #ea6240;
  border-color: #ea6240;
}
:deep(.ivu-checkbox:hover .ivu-checkbox-inner) {
  border-color: #ea6240;
}
</style>
