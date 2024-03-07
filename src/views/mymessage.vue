<template>
  <div class="mymessage">
    <orderBreadcrumb :title="title" />
    <div class="mymessageBox">
      <div class="mymessageBoxTop">
        <div class="mymessagetx">
          <!-- <img src="../assets/5f1a6d5a68c76.jpg" alt="" /> -->
        </div>
        <div class="mymessageBoxcenter">
          <p style="font-weight: bold">{{ username }}</p>
          <p>{{ nickname }}</p>
        </div>
        <div class="changepassword">
          <!-- <Button type="primary" ghost label="large">修改密码</Button> -->
        </div>
      </div>
      <Divider />
      <div class="shippingaddress">
        <div style="font-size: 18px; font-weight: bold">已有收货地址</div>
        <div style="margin-left: 57px; font-size: 14px">
          已有
          <span style="color: #ea6240">{{
            this.shippingAddressList.length
          }}</span>
          个收货地址，最多可设置<span style="color: #ea6240">6</span>个
        </div>
        <div class="shippingaddressbtn">
          <Button type="primary" ghost label="large" @click="addNewAddress"
            >新增地址</Button
          >
        </div>
      </div>
      <!-- 收货地址 -->
      <ShippingAddress
        :shippingAddressInfodata="shippingAddressList"
        :key="shippingAddressList.length"
        v-if="this.shippingAddressList.length > 0"
      />
      <Divider />
      <!-- 新增收货地址 -->
      <div class="xzshippingaddress">
        <div
          style="
            text-align: left;
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 41px;
          "
        >
          新增收货地址
        </div>
        <Form
          ref="addAddressForm"
          :model="addAddressForm"
          :rules="ruleAddAddressForm"
          label-position="left"
          :label-width="100"
        >
          <FormItem label="收货人：" prop="contacts">
            <Input
              v-model="addAddressForm.contacts"
              placeholder="请输入收货人名称"
              class="shippingaddressinput"
            ></Input>
          </FormItem>
          <FormItem label="手机号：" prop="phone">
            <Input
              v-model="addAddressForm.phone"
              placeholder="请输入收货人手机号"
              class="shippingaddressinput"
            ></Input>
          </FormItem>
          <FormItem label="所在地区：" prop="address">
            <Input
              v-model="addAddressForm.address"
              placeholder="请输入收货所在地区"
              class="shippingaddressinput"
              clearable
            ></Input>
          </FormItem>
          <FormItem label="详细地址：" prop="addressDetails">
            <Input
              v-model="addAddressForm.addressDetails"
              placeholder="请输入收货详细地址"
              class="shippingaddressinput"
            ></Input>
          </FormItem>
          <div
            style="
              display: flex;
              justify-content: flex-start;
              padding-left: 100px;
            "
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
              @click="addNewAddressInfo('addAddressForm')"
              >保存</Button
            >
          </div>
        </Form>
      </div>
    </div>
    <!-- 收货地址模态框 -->
    <Modifa
      :modifactionaddresShow="modifactionaddress"
      @showdata="closemodel"
    />
  </div>
</template>
<script>
import { getUserAddressList, addNewAddress, getAllCityList } from "@/utils/api";
import orderBreadcrumb from "@/components/orderBreadcrumb";
import ShippingAddress from "@/components/shippingAddress";
export default {
  name: "mymessage",
  components: {
    orderBreadcrumb,
    ShippingAddress,
    Modifa: () => import("@/components/modifactionaddress"),
  },
  computed: {},
  props: {},
  data() {
    return {
      title: this.$route.meta.title,
      username: this.$store.state.loginFromData.username,
      nickname: this.$store.state.loginFromData.nickname,
      shippingAddressList: [],

      // 新增地址
      modifactionaddress: false,
      addAddressForm: {
        contacts: "", //联系人
        phone: "", //手机号
        address: "", //收货地址
        addressDetails: "", //详细地址
        defaultAddress: 0, //默认地址
        latitude: "108.95", //经度
        longitude: "34.22", //纬度
        userId: this.$store.state.loginFromData.id, //用户id
      },
      // 省市区
      value1: [],
      data1: [
        {
          value: "beijing",
          label: "北京",
          children: [
            {
              value: "gugong",
              label: "故宫",
            },
            {
              value: "tiantan",
              label: "天坛",
            },
            {
              value: "wangfujing",
              label: "王府井",
            },
          ],
        },
        {
          value: "jiangsu",
          label: "江苏",
          children: [
            {
              value: "nanjing",
              label: "南京",
              children: [
                {
                  value: "fuzimiao",
                  label: "夫子庙",
                },
              ],
            },
            {
              value: "suzhou",
              label: "苏州",
              children: [
                {
                  value: "zhuozhengyuan",
                  label: "拙政园",
                },
                {
                  value: "shizilin",
                  label: "狮子林",
                },
              ],
            },
          ],
        },
      ],
      ruleAddAddressForm: {
        contacts: [
          {
            required: true,
            message: "请输入收货人姓名",
            trigger: "blur",
          },
        ],
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
            message: "手机号格式错误",
            trigger: "blur",
          },
        ],
        address: [
          {
            required: true,
            message: "请输入收货地址",
            trigger: "blur",
          },
        ],
        addressDetails: [
          {
            required: true,
            message: "请输入收货详细地址",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {},
  mounted() {
    this.getUserAddressListInfo();
    // this.getAllCityListInfo();
  },
  methods: {
    // 新增地址模态框 未使用
    modifactionaddressinfo() {
      this.modifactionaddress = !this.modifactionaddress;
    },
    //
    addNewAddress() {
      document.documentElement.scrollTop = 1000;
    },
    closemodel(sitechenge) {
      this.modifactionaddress = sitechenge;
    },
    // 获取用户收货地址
    getUserAddressListInfo() {
      getUserAddressList(this.$store.state.loginFromData).then((res) => {
        if (res || res.status == 200) {
          this.shippingAddressList = res.data;
        }
      });
    },
    // 新增收货地址保存
    addNewAddressInfo(name) {
      if (this.shippingAddressList.length < 6) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            addNewAddress(this.addAddressForm).then((res) => {
              if (res || res.status == 200) {
                this.getUserAddressListInfo();
                this.$refs[name].resetFields();
              } else {
                this.$Message.warning({
                  content: res.message,
                  duration: 5,
                });
              }
            });
          }
        });
      } else {
        this.$Message.warning({
          content: "最多可添加在6条收货地址",
          duration: 5,
        });
      }
    },
    // 获取所有市级列表
    // getAllCityListInfo() {
    //   getAllCityList().then((res) => {
    //     console.log(res, "所有市级列表");
    //   });
    // },
    // 定位
    // inf() {
    //   const self = this;
    //   AMap.plugin("AMap.Geolocation", function () {
    //     var geolocation = new AMap.Geolocation({
    //       // 是否使用高精度定位，默认：true
    //       enableHighAccuracy: true,
    //       // 设置定位超时时间，默认：无穷大
    //       timeout: 10000,
    //     });

    //     geolocation.getCurrentPosition();
    //     AMap.Event.addListener(geolocation, "complete", onComplete);
    //     AMap.Event.addListener(geolocation, "error", onError);

    //     function onComplete(data) {
    //       // data是具体的定位信息
    //       console.log(data, "定位成功信息：");
    //     }

    //     function onError(data) {
    //       // 定位出错
    //       console.log("定位失败错误：", data);
    //       // 调用IP定位
    //       self.getLngLatLocation();
    //     }
    //   });
    // },
    // 通过IP获取当前位置
    // getLngLatLocation() {
    //   AMap.plugin("AMap.CitySearch", function () {
    //     var citySearch = new AMap.CitySearch();
    //     citySearch.getLocalCity(function (status, result) {
    //       if (status === "complete" && result.info === "OK") {
    //         // 查询成功，result即为当前所在城市信息
    //         console.log("通过ip获取当前城市：", result);
    //         console.log(result.rectangle.split(";")[0].split(",")[0], "ip");
    //         // 逆向地理编码
    //         AMap.plugin("AMap.Geocoder", function () {
    //           var geocoder = new AMap.Geocoder({
    //             // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
    //             city: result.adcode,
    //             // adcode: result.adcode,
    //           });

    //           var lnglat = result.rectangle.split(";")[0].split(",");
    //           geocoder.getAddress(lnglat, function (status, data) {
    //             if (status === "complete" && data.info === "OK") {
    //               // result为对应的地理位置详细信息
    //               console.log(data, "对应位置信息");
    //             }
    //           });
    //         });
    //       }
    //     });
    //   });
    // },
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
:deep(.ivu-btn-primary:active) {
  background-color: #fff;
}
:deep(.ivu-btn-primary:hover) {
  background-color: #ea6240;
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
.mymessage {
  width: 1280px;
  :deep(.ivu-tabs-nav .ivu-tabs-tab-active) {
    color: #ea6240 !important;
  }
  :deep(.ivu-tabs-ink-bar) {
    background-color: #ea6240;
  }
  :deep(.ivu-btn-ghost.ivu-btn-primary:hover) {
    color: #ea6240;
    border-color: #ea6240;
  }
  :deep(.ivu-btn-primary:focus) {
    box-shadow: 0 0 10px 2px #eb6b4b3e;
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
  .mymessageBox {
    background-color: #fff;
    padding: 40px 44px;
    box-sizing: border-box;
    .mymessageBoxTop {
      width: 100%;
      display: flex;
      .mymessagetx {
        width: 124px;
        height: 124px;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .mymessageBoxcenter {
        margin-left: 24px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        font-size: 18px;
      }
      .changepassword {
        flex: 1;
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
      }
    }
    .shippingaddress {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 45px;
      .shippingaddressbtn {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
    }
  }
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
