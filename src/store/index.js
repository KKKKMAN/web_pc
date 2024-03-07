import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    playLogin: localStorage.getItem("playLogin"),
    loginFromData: {
      id: localStorage.getItem("id"),
      token: localStorage.getItem("token"),
      status: localStorage.getItem("status"),
      username: localStorage.getItem("username"),
      nickname: localStorage.getItem("nickname"),
      avatar: localStorage.getItem("avatar"),
    },
    num: 0,
    goodsDataList: [], //商品列表数据
    goodsDataTota: 0, //商品列表数据总数
    currentNum: 1, // 当前页码
    pageSize: 10, // 每页条数
  },
  getters: {
    getPlayLogin: (state) => {
      return state.playLogin;
    },
    // 商品列表数据
    setData: (state) => {
      return state.goodsDataList;
    },
    // 数据总数
    getGoodsDataTota: (state) => {
      return state.goodsDataTota;
    },
    // 当前页码
    getCurrentNum: (state) => {
      return state.currentNum;
    },
  },
  mutations: {
    updateUser(state, user) {
      state.goodsDataList = user;
    },
    // 计算页数
    updateTota(state, user) {
      state.goodsDataTota = user;
    },
    // 计算页面
    updateCurrentNum(state, user) {
      state.currentNum = user;
    },
  },
  actions: {
    asyncUpdateUser(context, user) {
      context.commit("updateUser", user);
    },
    // 数据总数
    asyncUpdateTotalUser(context, user) {
      context.commit("updateTota", user);
    },
    //修改页数
    asyncUpdateCurrentNum(context, user) {
      context.commit("updateCurrentNum", user);
    },
  },
  modules: {},
});
