import { Header } from "view-design";
import request from "./index";
import qs from "qs";
// 获取验证码
export function getCode(params) {
  return request.post(`/csm/appApi/sms/sendSMSCode`, params);
}
// 注册账号
export function signin(params) {
  return request.post(`/csm/appApi/register/userRegister`, params);
}
// 登录
export function login(params) {
  return request.post(`/csm/appApi/login/userLogin`, params);
}
// 退出登录
export function unlogin(params) {
  return request.post(`/csm/appApi/login/userLogout`, params);
}
// 根据token 获取用户信息
export function getLoginUserInfo(params) {
  return request.post(`/csm/appApi/login/getLoginUserInfo`, params);
}
// 首页广告列表
export function getPosterInfo(params) {
  return request.post(`/csm/appApi/home/getPoster`, params);
}
// 首页获取商家商品列表
export function getAppShopList(params) {
  return request.post(`/csm/appApi/home/getAppShopList`, params);
}
// 根据商品id获取商品详情
export function getProductById(params) {
  return request({
    url: "/csm/appApi/shop/getProductById",
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    params: params,
  });
}
// 根据店铺id查询店铺信息
export function getShopInfoByIdAndPosition(params) {
  return request.post(`/csm/appApi/shop/getShopInfoByIdAndPosition`, params);
}
// 根据店铺id 查询店铺商品
export function getProductListByCategory(params) {
  return request.post(`/csm/appApi/shop/getProductListByCategory`, params);
}
// 获取商家详情页
export function getShopInfoById(params) {
  return request({
    url: "/csm/appApi/shop/getShopInfoById",
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    params: params,
  });
}
// 添加商品到购物车
export function addSingleProductToCart(params) {
  let { shopId, ...paramsData } = params;
  return request({
    url: "/csm/appApi/cart/addSingleProductToCart",
    method: "post",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: paramsData,
    params: {
      shopId: shopId,
    },
  });
}
// 用户下单
export function createNewOrder(params) {
  return request.post(`/csm/appApi/order/createNewOrder`, params);
}
// 确定收货
export function confirmReceived(params) {
  return request.post(`/csm/appApi/order/confirmReceived`, params);
}
// 用户订单支付
export function orderPay(params) {
  return request.post(`/csm/appApi/pay/orderPay`, params);
}
//微信下单二维码
export function createQrCode(params) {
  return request.post(`/csm/appApi/pay/createQrCode`, params);
}
//支付宝下单二维码
export function createQrCodes(params) {
  return request.post(`/csm/appApi/pay/createQrCode`, params);
}

// 微信支付回调
export function wxNotifyPlay() {
  return request.post(`/csm/appApi/notify/wxNotify`);
}
// 用户取消订单
export function cancelOrder(params) {
  return request.post(`/csm/appApi/order/cancelOrder`, params);
}
//用户再来一单
export function createOneMoreOrder(params) {
  return request.post(`/csm/appApi/order/createOneMoreOrder`,params)
}
// 根据一级分类获取
export function getAllCategoryTwoListById(params) {
  return request.post(`/csm/appApi/category/getAllCategoryOneList`, params);
}
// 获取用户收货地址列表
export function getUserAddressList(params) {
  return request.post(`/csm/appApi/address/getUserAddressList`, params);
}
// 获取订单分页列表
export function getOrderList(params) {
  return request.post("/csm/appApi/order/getOrderList", params);
}
// 查询店铺优惠卷
export function getShopCouponList(params) {
  return request.post(`/csm/appApi/shop/coupon/query/page`, params);
}
// 用户优惠券查询 // 根据店铺id查询店铺优惠卷
export function gettUserShopCouponList(params) {
  return request.post(`/csm/appApi/user/coupon/page`, params);
}
// 优惠卷领取
export function gettUserShopcollectList(params) {
  return request({
    url: "/csm/appApi/shop/coupon/collect",
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    params: params,
  });
}
//获取当前用户(所有)门店购物车
export function getAllShopCart(params) {
  return request.post(`/csm/appApi/cart/getAllShopCart`, params);
}
// 获取当前用户(所在)门店购物车
export function getCartByCurrShop(params) {
  return request.post(`/csm/appApi/cart/getCartByCurrShop`, params);
}
// 从购物车中移除部分商品
export function removeMultiProducts(params) {
  let { shopId, ...paramsData } = params;
  let goodsList = [];
  goodsList.push(paramsData);
  return request({
    url: "/csm/appApi/cart/removeMultiProducts",
    method: "post",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: goodsList,
    params: {
      shopId: shopId,
    },
  });
}
// 新增收货地址
export function addNewAddress(params) {
  return request.post(`/csm/appApi/address/addNewAddress`, params);
}
// 删除收货地址
export function delUserAddressByIds(params) {
  return request.post(`/csm/appApi/address/delUserAddressByIds`, params);
}
// 修改收获地址
export function updateUserAddress(params) {
  return request.post(`/csm/appApi/address/updateUserAddress`, params);
}
//获取所有市级列表
export function getAllCityList() {
  return request.post(`/csm/appApi/district/getAllCityList`);
}
//获取我的评价列表
export function getAllCommentByUserId(params) {
  return request.post(`/csm/appApi/comments/getAllCommentByUserId`, params);
}

// 获取用户订单评价
export function addNewOrderComments(params) {
  return request.post(`/csm/appApi/comments/addNewOrderComments`, params);
}

//获取店铺评价列表 csm/appApi/shop/getAllCommentByShopId
export function getAllCommentByShopId(shopId) {
  return request.get(`csm/appApi/shop/getAllCommentByShopId`, {
    params: {shopId: shopId}
  });
}