<template>
    <div class="settlementBox">
        <orderBreadcrumb :title="title" />
        <div class="settlementBox_top">
            <div class="settlementBox_top_t">
                <div>选择收货地址</div>
                <!-- <Button type="primary" label="large" style="background-color: #ea6240"
          >新增收获地址</Button
        > -->
            </div>
            <!-- 收货地址 -->
            <div class="settlementBox_top_dzhi">
                <div class="settlementBox_top_dzhi_item" :class="{ active: v.defaultAddress == 1 }"
                    v-for="(v, i) in shippingAddressList" :key="i" @click="changeAddress(v)">
                    <div><img src="../assets/name.png" alt="" />{{ v.contacts }}</div>
                    <div><img src="../assets/phone.png" alt="" />{{ v.phone }}</div>
                    <div>
                        <div class="img_b"><img src="../assets/dinwei.png" alt="" /></div>
                        {{ v.address }}
                    </div>
                </div>
            </div>
            <!-- 运送方式 -->
            <div class="yun_song">
                <div>
                    <span>运送方式：</span>
                    <RadioGroup v-model="animal">
                        <Radio label="商家配送"></Radio>
                        <Radio label="客户自提"></Radio>
                    </RadioGroup>
                </div>
            </div>
            <div class="placeanorder_time">
                <div>
                    <span>收货时间：</span>
                    <span>现在下单，预计送达时间为18:00~18:30</span>
                </div>
                <!-- <Button type="primary" label="large" style="background-color: #ea6240"
          >更改收货时间</Button
        > -->
            </div>
            <Divider />
            <div class="qued_xx">确认订单信息</div>
        </div>
        <div class="order_top">
            <span>商品信息</span>
            <span>单价</span>
            <span>数量</span>
            <span>金额</span>
        </div>
        <div class="settlementBox_bottom" v-for="(v, i) in orderlist" :key="i">
            <div class="settlementBox_b_t">
                店铺：<span>{{ v.shopName }}</span>
            </div>
            <div class="settlementBox_b_item" v-for="(vv, ii) in v.productDetailsItem" :key="ii">
                <div>
                    <img :src="vv.productImageLink" alt="" />
                    <span>{{ vv.productName }}</span>
                </div>
                <div>￥{{ vv.price }}</div>
                <div>{{ vv.number }}</div>
                <div>￥{{ (vv.price * vv.number).toFixed(2) }}</div>
            </div>
            <Divider />
        </div>
        <!-- <div class="settlementBox_b_youhui">
      <div>
        <span>店铺优惠：</span>
        <span>省10元，满49减10</span>
      </div>
      <div>- ¥ 10.0</div>
    </div> -->
        <!-- <div class="settlementBox_b_youhui t_right">
            <div>
                <span>配送费：</span>
                <span>1.5公里以内免费</span>
            </div>
            <div>- ¥ 0.0</div>
        </div> -->
        <div class="settlementBox_b_youhui t_right" v-if="couponList.length > 0">
            <div>
                <span>优惠券：</span>
                <Select style="width:200px" @on-select="onSelect">
                    <Option v-for="item in couponList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </div>
            <div>- ¥ {{ couponMoney }}</div>
        </div>
        <div class="dd_class" v-if="couponList.length > 0">
            <Divider />
        </div>
        <div class="vb_box">
            <div class="video_box">
                <Checkbox :true-value="1" :false-value="0" v-model="videoTrue"></Checkbox>
                <span>视频确定：</span>
                <span>如您选择视频确认订单，在商家备货完成后，会向您发起视频通话，方便您查验商品质量。</span>
            </div>
            <div class="textarea_box">
                <span>订单备注：</span>
                <Input v-model="remarks" type="textarea" :rows="4" placeholder="订单备注信息..." />
            </div>
        </div>

        <!-- as -->
        <div class="payment_box">
            <div>
                <span>共 <span style="color: #ea6240">{{ goodsnum }}</span> 件商品</span><span
                    class="h_span">实付款</span><span style="color: #ea6240; font-size: 30px; font-weight: bold">¥ {{
            totalsEnd }}</span>
            </div>
            <div>
                <span class="h_span">配送至</span><span>{{ newSite.address }} {{ newSite.addressDetails }} </span>
            </div>
            <div>
                <span class="h_span">收货人</span><span>{{ newSite.contacts }} {{ newSite.phone }}</span>
            </div>
        </div>
        <div class="payment_btn">
            <Button size="large" style="font-size: 15px" @click="goBackShoppingCart">返回购物车</Button>
            <Button type="primary" size="large" style="background-color: #ea6240; font-size: 15px; margin-left: 50px"
                @click="commitOrderInfo">提交订单</Button>
        </div>
    </div>
</template>

<script>
import { getUserAddressList, createNewOrder, getQueryActivity } from "@/utils/api";
import orderBreadcrumb from "@/components/orderBreadcrumb";
export default {
    name: "settlement",
    components: { orderBreadcrumb },
    props: {},
    data() {
        return {
            animal: "商家配送",
            remarks: "", //订单备注
            videoTrue: 0, //视频确定
            title: this.$route.query.title || "提交订单",
            shippingAddressList: [],
            orderlist: [],
            goodsnum: 0, //商品数量
            totals: 0, //总价
            newSite: {}, //下单选择新地址
            addressId: "", //下单地址id
            addshopList: [], //下单数组

            couponList: [],
            couponId: ''
        };
    },
    watch: {
        shippingAddressList: {
            handler(newValue, oldValue) {
                newValue.forEach((item) => {
                    if (item.defaultAddress) {
                        this.addressId = item.id;
                        this.newSite = item;
                    }
                });
            },
            deep: true,
        },
    },
    created() { },
    mounted() {
        this.getUserAddressListInfo();
        this.orderlist = JSON.parse(this.$route.query.checkAllGroupp);
        // 总价
        // console.log(this.orderlist, "orderlist");
        //可用店铺优惠券查询
        this.onGetQueryActivity()
        this.orderlist.forEach((item) => {
            this.goodsnum =
                parseFloat(this.goodsnum) + parseFloat(item.productDetailsItem.length);
            this.totals = (parseFloat(this.totals) + parseFloat(item.total)).toFixed(
                2
            );
        });
    },
    computed: {
        //最终付款
        totalsEnd() {
            return this.totals - this.couponMoney > 0 ? this.accJian(this.totals, this.couponMoney) : 0
        },
        //当前使用优惠券金额
        couponMoney() {
            if (this.couponList.length > 0) {
                for (let i of this.couponList) {
                    if (i.value == this.couponId) {
                        return i.couponPrice
                    }
                }
            }
            return 0
        }

    },
    methods: {
        //减法消除浮点
        accJian(arg1, arg2) {
            var r1, r2, m, n;
            try {
                r1 = arg1.toString().split(".")[1].length
            } catch (e) {
                r1 = 0
            }
            try {
                r2 = arg2.toString().split(".")[1].length
            } catch (e) {
                r2 = 0
            }
            m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
            n = (r1 >= r2) ? r1 : r2;
            return ((arg1 * m - arg2 * m) / m).toFixed(n);
        },
        onSelect(e) {
            this.couponId = e.value
        },
        //获取店铺可用优惠券
        onGetQueryActivity() {
            getQueryActivity({ shopId: this.orderlist[0].csmShopId, productId: '' }).then((res) => {
                for (let i of res.data) {
                    this.couponList.push({ value: i.id, label: i.title, couponPrice: i.couponPrice })
                }
            });
        },
        // 获取用户收货地址
        getUserAddressListInfo() {
            getUserAddressList(this.$store.state.loginFromData).then((res) => {
                if (res || res.status == 200) {
                    this.shippingAddressList = res.data;
                    // this.shippingAddressList.forEach((item) => {
                    //   if (item.defaultAddress == 1) {
                    //     return (this.newSite = item);
                    //   }
                    // });
                }
            });
        },
        // 用户下单
        // async createNewOrderInfo() {
        //   for (let index = 0; index < this.orderlist.length; index++) {
        //     const element = this.orderlist[index];
        //     // let list = {
        //     //   csmShopId: "", //店铺id
        //     //   csmUserAddressId: this.addressId, //用户收货地址id
        //     //   remarks: "", //备注
        //     //   total: "", //总价
        //     //   videoCall: "", //视频通话
        //     //   userId: "", //用户id
        //     //   transactionId: "", //交易时间
        //     //   refundType: "", //退款类型
        //     // };
        //     await new Promise((resolve) => {
        //       createNewOrder().then((res) => {
        //         console.log(res, "下单成功");
        //         // resolve();
        //       });
        //     });
        //   }
        //   // this.$router.push("/pay");
        // },

        // 下单2
        createNewOrderInfo() {
            this.orderlist.forEach((item) => {
                let storeList = {
                    // beginEmsTime: "",
                    // code: "",
                    // createTime: "", //开始时间
                    // deleted: 0, //删除
                    // exceptDeliveryTime: "", //收货时间
                    // isComments: 0, //评论
                    // isPay: 0,
                    // isUser: 0,
                    // orderFinishedTime: "", //订单结束时间
                    // orderRefundsTime: "", //订单退款时间
                    // payTime: "", //支付时间
                    // pickTime: "", //取货时间
                    // productCompletedTime: "", //完成时间
                    // refundType: 0, //退款类型
                    // updateTime: "", //更新时间
                    // verifyTime: "", //核销时间
                    // videoConfirmTime: "", //视频确认时间
                    csmUserAddressId: this.addressId, //用户收货地址id
                    remarks: this.remarks, //备注
                    total: "", //总价
                    videoCall: this.videoTrue, //视频通话
                    userId: localStorage.getItem("id"), //用户id
                    transactionId: "2022", //交易时间
                    refundType: "", //退款类型
                    orderStatus: 0, //订单状态
                    orderOriginalStatus: 0, //订单起始状态
                    paymentType: "", //支付类型
                    actualPay: 0, //实际价格
                    productCount: 0, //商品数量
                    emsCost: 0, //邮费
                    csmShopId: "", //店铺id
                    productDetailsList: [],
                };
                storeList.csmShopId = item.csmShopId;
                // storeList.emsCost = item.emsCost; //运费暂传0
                storeList.total = item.total;
                item.productDetailsItem.forEach((itemi) => {
                    delete itemi.productName;
                    delete itemi.productImageLink;
                    storeList.productDetailsList.push(itemi);
                });
                this.addshopList.push(storeList);
            });
            this.addshopList.forEach(async (item) => {
                await new Promise((resolve) => {
                    console.log(item, "itemitemitemitem");
                    createNewOrder(item).then((res) => {
                        if (res && res.status == 200) {
                            resolve(item);
                            this.$router.push({
                                path: "/pc/commitOrder",
                                query: {
                                    dataId: res.data,
                                    total: item.total,
                                },
                            });
                        } else {
                            this.$Message.error({
                                content: res.message,
                                duration: 4
                            })
                        }
                    });
                });
            });
        },
        // 获取用户选择收货地址
        changeAddress(itemi) {
            this.addressId = itemi.id;
            this.shippingAddressList.forEach((item) => {
                item.defaultAddress = 0;
                itemi.defaultAddress = 1;
            });
        },
        //提交订单
        commitOrderInfo() {
            this.createNewOrderInfo();
        },
        // 返回购物车
        goBackShoppingCart() {
            this.$router.push("/pc/shoppingCart");
        },
    },
};
</script>
<style lang="scss" scoped>
// 单选
:deep(.ivu-radio-checked .ivu-radio-inner) {
    border-color: #ea6240;
}

:deep(.ivu-radio-inner:after) {
    border-radius: 0;
    border: 2px solid #ea6240;
    background-color: transparent;
    width: 4px;
    height: 8px;
    top: 2px;
    left: 5px;
    border-top: 0;
    border-left: 0;
    transform: rotate(45deg) !important;
}

:deep(.ivu-radio-inner) {
    border-radius: 0;
}

:deep(.ivu-radio-focus) {
    box-shadow: 0 0 10px 2px #eb6b4b3e;
}

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

:deep(.ivu-input:focus) {
    border-color: #ea6240;
    box-shadow: 0 0 10px 2px #eb6b4b3e;
}

:deep(.ivu-input:hover) {
    border-color: #ea6240;
}

:deep(.ivu-btn:hover) {
    color: #ea6240;
    border-color: #ea6240;
}

:deep(.ivu-btn:focus) {
    box-shadow: 0 0 10px 2px #eb6b4b3e;
}

:deep(.ivu-btn-primary) {
    border-color: #ea6240;
}

:deep(.ivu-btn-primary:hover) {
    background-color: #ea6240;
    border-color: #ea6240;
    color: #fff;
}

:deep(.ivu-btn-primary:focus) {
    box-shadow: 0 0 10px 2px #eb6b4b3e;
}

.settlementBox {
    width: 1280px;

    .settlementBox_top {
        padding: 25px 30px;
        background-color: #fff;

        .settlementBox_top_t {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 30px;

            >div:nth-child(1) {
                font-size: 18px;
                font-weight: bold;
            }
        }

        .settlementBox_top_dzhi {
            display: flex;
            align-items: center;
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 25px;

            .settlementBox_top_dzhi_item {
                transition: all 0.3s;
                cursor: pointer;
                padding: 20px 20px;
                color: #666;
                text-align: left;
                position: relative;
                //   虚线设置
                border: 1px dashed transparent;
                background: linear-gradient(#fff, #fff) padding-box,
                    repeating-linear-gradient(-45deg,
                        #c0c0c0 0,
                        #c0c0c0 1em,
                        #fff 1em,
                        #fff 1.5em);

                >div:nth-child(2) {
                    margin: 15px 0 10px 0;
                }

                >div {
                    display: flex;
                    align-items: center;

                    img {
                        padding-right: 14px;
                    }
                }

                .img_b {
                    height: 36px;
                }
            }

            .settlementBox_top_dzhi_item:hover {
                box-shadow: 17px 15px 15px -10px #ccc;
            }

            .active {
                border: 1px dashed transparent;
                position: relative;
                background: linear-gradient(#fff, #fff) padding-box,
                    repeating-linear-gradient(-45deg,
                        #ea6240 0,
                        #ea6240 1em,
                        #fff 1em,
                        #fff 1.5em);
            }

            .active::after {
                position: absolute;
                content: "";
                width: 30px;
                height: 20px;
                top: -13px;
                right: -16px;
                transform: rotate(238deg);
                border: 1px dashed #ea6240;
                overflow: hidden;
                background-color: #fff;
                clip-path: polygon(0 0, 90% 100%, 0 calc(100% - 70px));
            }
        }

        .settlementBox_top_dzhi_item::after {
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

        .yun_song {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-start;

            >div {
                margin: 25px 0 20px 0;
            }
        }

        .placeanorder_time {
            display: flex;
            align-items: center;
            justify-content: space-between;

            >div:nth-child(1) {
                span {
                    margin-right: 20px;
                }
            }
        }

        .qued_xx {
            text-align: left;
            font-size: 18px;
            font-weight: bold;
        }
    }

    .order_top {
        display: flex;
        align-items: center;
        display: grid;
        padding: 10px 30px;
        grid-template-columns: 2fr 1fr 1fr 1fr;
        gap: 20px;
    }

    .settlementBox_bottom {
        padding: 25px 30px 1px 30px;
        background-color: #fff;

        .settlementBox_b_t {
            text-align: left;
            font-size: 15px;
            font-weight: bold;
            margin-bottom: 20px;
        }

        .settlementBox_b_item {
            display: flex;
            align-items: center;
            display: grid;
            grid-template-columns: 2fr 1fr 1fr 1fr;
            margin-bottom: 25px;
            gap: 30px;

            >div:nth-child(1) {
                display: flex;
                align-items: flex-start;
                font-size: 13px;
                font-weight: 500;
                text-align: left;
                line-height: 25px;

                img {
                    width: 100px;
                    height: 100px;
                    margin-right: 40px;
                }
            }

            >div {
                font-size: 15px;
            }

            >div:last-child {
                color: #ea6240;
            }
        }
    }

    .settlementBox_b_youhui {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #fff;
        padding: 10px 30px;

        >div:nth-child(1) {
            >span:nth-child(1) {
                margin-right: 30px;
            }

            >span:nth-child(2) {
                color: #666;
            }
        }

        >div:nth-child(2) {
            font-size: 16px;
            font-weight: bold;
            color: #999;
        }
    }

    .t_right {
        >div:nth-child(1) {
            >span:nth-child(1) {
                margin-right: 45px;
            }

            >span:nth-child(2) {
                color: #666;
            }
        }
    }

    .vb_box {
        background-color: #fff;
        padding: 0 30px;

        .video_box {
            display: flex;
            align-items: center;
            justify-content: flex-start;

            >span:last-child {
                color: #999;
            }
        }

        .textarea_box {
            display: flex;
            margin: 20px 0;

            >span:nth-child(1) {
                margin-right: 23px;
                width: 80px;
                display: inline-block;
            }
        }
    }

    .payment_box {
        text-align: right;
        padding-right: 90px;

        .h_span {
            font-weight: bold;
            margin: 0 25px;
        }

        >div {
            margin: 25px 0;
        }
    }

    .payment_btn {
        text-align: right;
        background-color: #fff;
        padding: 50px 90px 100px 0;
    }

    .dd_class {
        padding: 0 30px;
        background-color: #fff;
        display: flex;
    }
}
</style>
