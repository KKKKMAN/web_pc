import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/index.vue";
import recommend from "../views/recommend.vue";
import order from "../views/order.vue";
import mycoupon from "../views/mycoupon.vue";
import mymessage from "../views/mymessage.vue";
import loginpage from "../views/loginpage.vue";
import shopParticulars from "../views/shopParticulars.vue";
import commoditydetailpage from "../views/commoditydetailpage.vue";
import shoppingCart from "../views/shoppingCart.vue";
import settlement from "../views/settlement.vue";
import commitOrder from "../views/commitOrder.vue";
import orderstatusdetails from "../views/orderstatusdetails.vue";
import review from "../views/review.vue"
Vue.use(VueRouter);
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location) {
  return routerPush.call(this, location).catch((err) => {});
};

const routes = [

  {
    path: "/pc",
    name: "index",
    component: Index,
  },

  {
    // 注册、登录
    path: "/pc/loginpage",
    name: "loginpage",
    component: loginpage,
    meta: {
      title: "注册",
      alive: "false",
    },
  },
  // {
  //   // 首页推荐
  //   path: "/",
  //   // redirect: "/pc/recommend",
  //   name: "recommend",
  //   component: Index,
  //   meta: {
  //     title: "首页推荐",
  //   },
  // },
  {
    // 我的订单
    path: "/pc/order",
    name: "order",
    component: order,
    meta: {
      title: "订单管理",
      requireAuth: true,
    },
  },
  {
    // 订单详情
    path: "/pc/orderstatusdetails",
    // redirect: "/pc/orderstatusdetails",
    name: "orderstatusdetails",
    component: orderstatusdetails,
    meta: {
      title: "订单详情",
      requireAuth: true,
    },
  },
  {
    // 我的优惠卷
    path: "/pc/mycoupon",
    // redirect: "/pc/mycoupon",
    name: "mycoupon",
    component: mycoupon,
    meta: {
      title: "优惠卷管理",
      requireAuth: true,
    },
  },
  {
    // 我的资料
    path: "/pc/mymessage",
    // redirect: "/pc/mymessage",
    name: "mymessage",
    component: mymessage,
    meta: {
      title: "我的资料",
      requireAuth: true,
    },
  },
  {
    // 门店详情
    path: "/pc/shopParticulars",
    // redirect: "/pc/shopParticulars",
    name: "shopParticulars",
    component: shopParticulars,
    meta: {
      title: "门店详情",
    },
  },
  {
    // 门店商品详情
    path: "/pc/commoditydetailpage",
    // redirect: "/pc/commoditydetailpage",
    name: "commoditydetailpage",
    component: commoditydetailpage,
    meta: {
      title: "门店商品详情",
    },
  },
  {
    // 购物车页面
    path: "/pc/shoppingCart",
    // redirect: "/pc/shoppingCart",
    name: "shoppingCart",
    component: shoppingCart,
    meta: {
      title: "购物车",
    },
  },
  {
    // 结算页面
    path: "/pc/settlement",
    // redirect: "/pc/settlement",
    name: "settlement",
    component: settlement,
    meta: {
      title: "下单",
    },
  },

  {
    // 结算页面
    path: "/pc/commitOrder",
    // redirect: "/pc/commitOrder",
    name: "commitOrder",
    component: commitOrder,
  },
  {
    // 去评论
    path: "/pc/review",
    // redirect: "/pc/commitOrder",
    name: "review",
    component: review,
  },
  {
    //定义404页面
    path: "/pc/404",
    // redirect: "/pc/404",
    component: () => import("../views/notfound.vue"),
  },
  
  // {
  //   //匹配未定义路由 然后重定向至404页面
  //   path: "/:pathMath(.*)",
  //   redirect: "/404",
  // },
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
