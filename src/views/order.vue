<template>
  <div class="myorderBox">
    <OrderBreadcrumb :title="this.title" />
    <Tabs value="0" @on-click="tabsClickItem">
      <!-- 全部订单 -->
      <TabPane class="ff" :label="allOrder" name="0">
        <div class="tabBox">
          <div class="tabtitle">
            <span class="onetab">订单详情</span>
            <div class="tabfour">
              <span>金额</span>
              <span>全部状态</span>
              <span>操作</span>
            </div>
          </div>
          <div class="taborderList" v-for="(v, i) in orderListData" :key="i">
            <div class="tabst">
              <div class="divone">
                <span class="tabsleft"></span>
                <span>订单号：{{ v.shopId }}</span>
                <span class="tabright"
                  ><span class="yuandian"></span>{{ v.shopName }}</span
                >
              </div>
              <div>下单时间：{{ v.createTime }}</div>
            </div>
            <div class="tabw">
              <div class="tablistfalse">
                <div
                  class="labbox"
                  v-for="(item, index) in v.productItemsList"
                  :key="index"
                >
                  <div class="labimg">
                    <img :src="item.img01.split(',')[0]" alt="" />
                  </div>
                  <div class="listname to">{{ item.productName }}</div>
                  <div class="to">X{{ item.number }}</div>
                </div>
              </div>
              <div class="righttext">
                <!-- <div class="e">小猪佩奇</div> -->
                <div class="e t">
                  <div style="color: #ea6240">
                    <span>实付款：￥</span>
                    <span>{{ v.actualPay }}</span>
                  </div>
                  <Divider style="margin: 0" />
                  <div class="c_p">含运费：￥0.00</div>
                </div>
                <div class="e o">
                  <div>
                    <div>{{ $ORDER_STATUS_DATA[v.orderStatus] }}</div>
                    <div v-if="v.orderStatus == '003'">
                      <div v-if="v.videoCall == 1">
                        <div>待视频确定</div>
                      </div>
                      <div>商家已接单</div>
                    </div>
                  </div>
                  <div class="c_p" @click="orderDetailsItem(v)">订单详情</div>
                </div>
                <div class="e">
                  <div class="ee" v-if="v.orderStatus == '000'">
                    <div class="c_p video_class">去支付</div>
                  </div>
                  <div class="ee" v-if="v.orderStatus == '003'">
                    <div v-if="v.videoCall == 1">
                      <div class="c_p video_class">视频通话</div>
                    </div>
                    <div class="c_p video_class">确认订单</div>
                    <div class="c_p video_class">取消订单</div>
                  </div>
                  <span v-if="v.orderStatus == '007' || '008' || '009'"></span>
                  <div class="ee" v-if="v.orderStatus == '006'">
                    <div class="c_p recur">去评价</div>
                    <div class="c_p recur">再来一单</div>
                  </div>
                  <div class="ee" v-if="v.orderStatus == '200'">
                    <div class="c_p recur">去评价</div>
                    <div class="c_p recur" @click="recurMonad">再来一单</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Page
          v-if="this.orderListData.length > 0"
          class="fixedpage"
          :current="currentNum"
          :total="qorderList"
          show-total
          :page-size="pageSize"
          prev-text="上一页"
          next-text="下一页"
          @on-change="onChange"
        >
          <template>共{{ qorderList }}条订单</template>
        </Page>
        <div v-else>
          <img src="../assets/null.png" alt="" />
          <p>暂无内容数据</p>
        </div>
      </TabPane>
      <!-- 待付款 -->
      <TabPane :label="awaitPayment" name="1">
        <div v-if="this.obligationListData.length > 0">
          <div class="tabBox">
            <div class="tabtitle">
              <span class="onetab">订单详情</span>
              <div class="tabfour">
                <span>金额</span>
                <span>全部状态</span>
                <span>操作</span>
              </div>
            </div>
            <div
              class="taborderList"
              v-for="(v, i) in obligationListData"
              :key="i"
            >
              <div class="tabst">
                <div class="divone">
                  <span class="tabsleft"></span>
                  <span>订单号：{{ v.shopId }}</span>
                  <span class="tabright"
                    ><span class="yuandian"></span>{{ v.shopName }}</span
                  >
                </div>
                <div>下单时间：{{ v.createTime }}</div>
              </div>
              <div class="tabw">
                <div class="tablistfalse">
                  <div
                    class="labbox"
                    v-for="(item, index) in v.productItemsList"
                    :key="index"
                  >
                    <div class="labimg">
                      <img :src="item.img01.split(',')[0]" alt="" />
                    </div>
                    <div class="listname to">{{ item.productName }}</div>
                    <div class="to">X{{ item.number }}</div>
                  </div>
                </div>
                <div class="righttext">
                  <div class="e t">
                    <div style="color: #ea6240">
                      <span>实付款：￥</span>
                      <span>{{ v.actualPay }}</span>
                    </div>
                    <Divider style="margin: 0" />
                    <div class="c_p">含运费：￥0.00</div>
                  </div>
                  <div class="e o">
                    <div>等待付款</div>
                    <div class="c_p" @click="orderDetailsItem(v)">订单详情</div>
                  </div>
                  <div class="e">
                    <div class="ee">
                      <div class="c_p video_class">去支付</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Page
          v-if="this.obligationListData.length > 0"
          class="fixedpage"
          :current="currentNumf"
          :total="orderListf"
          show-total
          :page-size="pageSize"
          prev-text="上一页"
          next-text="下一页"
          @on-change="onChangef"
        >
          <template>共{{ orderListf }}条订单</template>
        </Page>
        <div v-else>
          <img src="../assets/null.png" alt="" />
          <p>暂无内容数据</p>
        </div>
      </TabPane>
      <!-- 待确定 -->
      <TabPane :label="awaitConfirm" name="2">
        <div v-if="this.toBeDecidedListData.length > 0">
          <div class="tabBox">
            <div class="tabtitle">
              <span class="onetab">订单详情</span>
              <div class="tabfour">
                <span>金额</span>
                <span>全部状态</span>
                <span>操作</span>
              </div>
            </div>
            <div
              class="taborderList"
              v-for="(v, i) in toBeDecidedListData"
              :key="i"
            >
              <div class="tabst">
                <div class="divone">
                  <span class="tabsleft"></span>
                  <span>订单号：{{ v.shopId }}</span>
                  <span class="tabright"
                    ><span class="yuandian"></span>{{ v.shopName }}</span
                  >
                </div>
                <div>下单时间：{{ v.createTime }}</div>
              </div>
              <div class="tabw">
                <div class="tablistfalse">
                  <div
                    class="labbox"
                    v-for="(item, index) in v.productItemsList"
                    :key="index"
                  >
                    <div class="labimg">
                      <img :src="item.img01.split(',')[0]" alt="" />
                    </div>
                    <div class="listname to">{{ item.productName }}</div>
                    <div class="to">X{{ item.number }}</div>
                  </div>
                </div>
                <div class="righttext">
                  <div class="e t">
                    <div style="color: #ea6240">
                      <span>实付款：￥</span>
                      <span>{{ v.actualPay }}</span>
                    </div>
                    <Divider style="margin: 0" />
                    <div class="c_p">含运费：￥0.00</div>
                  </div>
                  <div class="e o">
                    <div>等待确认</div>
                    <div v-if="v.videoCall == 1">待视频确认</div>
                    <div v-else>商家已接单</div>
                    <div class="c_p" @click="orderDetailsItem(v)">订单详情</div>
                  </div>
                  <div class="e">
                    <div class="ee">
                      <div class="c_p video_class" v-if="v.videoCall == 1">
                        视频通话
                      </div>
                      <div class="c_p video_class">确认订单</div>
                      <div class="c_p video_class">取消订单</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Page
          v-if="this.toBeDecidedListData.length > 0"
          class="fixedpage"
          :current="currentNumq"
          :total="orderListq"
          show-total
          :page-size="pageSize"
          prev-text="上一页"
          next-text="下一页"
          @on-change="onChangeq"
        >
          <template>共{{ orderListq }}条订单</template>
        </Page>
        <div v-else>
          <img src="../assets/null.png" alt="" />
          <p>暂无内容数据</p>
        </div>
      </TabPane>
      <!-- 待收货 -->
      <TabPane :label="awaitGoods" name="3">
        <div v-if="this.waitForReceivingListData.length > 0">
          <div class="tabBox">
            <div class="tabtitle">
              <span class="onetab">订单详情</span>
              <div class="tabfour">
                <span>金额</span>
                <span>全部状态</span>
                <span>操作</span>
              </div>
            </div>
            <div
              class="taborderList"
              v-for="(v, i) in waitForReceivingListData"
              :key="i"
            >
              <div class="tabst">
                <div class="divone">
                  <span class="tabsleft"></span>
                  <span>订单号：{{ v.shopId }}</span>
                  <span class="tabright"
                    ><span class="yuandian"></span>{{ v.shopName }}</span
                  >
                </div>
                <div>下单时间：{{ v.createTime }}</div>
              </div>
              <div class="tabw">
                <div class="tablistfalse">
                  <div
                    class="labbox"
                    v-for="(item, index) in v.productItemsList"
                    :key="index"
                  >
                    <div class="labimg">
                      <img :src="item.img01.split(',')[0]" alt="" />
                    </div>
                    <div class="listname to">{{ item.productName }}</div>
                    <div class="to">X{{ item.number }}</div>
                  </div>
                </div>
                <div class="righttext">
                  <div class="e t">
                    <div style="color: #ea6240">
                      <span>实付款：￥</span>
                      <span>{{ v.actualPay }}</span>
                    </div>
                    <Divider style="margin: 0" />
                    <div class="c_p">含运费：￥0.00</div>
                  </div>
                  <div class="e o">
                    <div>待收货</div>
                    <div class="c_p" @click="orderDetailsItem(v)">订单详情</div>
                  </div>
                  <div class="e">
                    <div class="ee">
                      <div class="c_p video_class" @click="confirmInfo(v)">
                        取消订单
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Page
          v-if="this.waitForReceivingListData.length > 0"
          class="fixedpage"
          :current="currentNums"
          :total="orderLists"
          show-total
          :page-size="pageSize"
          prev-text="上一页"
          next-text="下一页"
          @on-change="onChanges"
        >
          <template>共{{ orderLists }}条订单</template>
        </Page>
        <div v-else>
          <img src="../assets/null.png" alt="" />
          <p>暂无内容数据</p>
        </div>
      </TabPane>
      <!-- 待评论 -->
      <TabPane :label="awaitComment" name="4">
        <div v-if="this.awaitReviewedListData.length > 0">
          <div class="tabBox">
            <div class="tabtitle">
              <span class="onetab">订单详情</span>
              <div class="tabfour">
                <span>金额</span>
                <span>全部状态</span>
                <span>操作</span>
              </div>
            </div>
            <div
              class="taborderList"
              v-for="(v, i) in awaitReviewedListData"
              :key="i"
            >
              <div class="tabst">
                <div class="divone">
                  <span class="tabsleft"></span>
                  <span>订单号：{{ v.shopId }}</span>
                  <span class="tabright"
                    ><span class="yuandian"></span>{{ v.shopName }}</span
                  >
                </div>
                <div>下单时间：{{ v.createTime }}</div>
              </div>
              <div class="tabw">
                <div class="tablistfalse">
                  <div
                    class="labbox"
                    v-for="(item, index) in v.productItemsList"
                    :key="index"
                  >
                    <div class="labimg">
                      <img :src="item.img01.split(',')[0]" alt="" />
                    </div>
                    <div class="listname to">{{ item.productName }}</div>
                    <div class="to">X{{ item.number }}</div>
                  </div>
                </div>
                <div class="righttext">
                  <div class="e t">
                    <div style="color: #ea6240">
                      <span>实付款：￥</span>
                      <span>{{ v.actualPay }}</span>
                    </div>
                    <Divider style="margin: 0" />
                    <div class="c_p">含运费：￥0.00</div>
                  </div>
                  <div class="e o">
                    <div>待评价</div>
                    <div class="c_p" @click="orderDetailsItem(v)">订单详情</div>
                  </div>
                  <div class="e">
                    <div class="ee">
                      <div class="c_p video_class">去评论</div>
                      <div class="c_p video_class">再来一单</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Page
          v-if="this.awaitReviewedListData.length > 0"
          class="fixedpage"
          :current="currentNump"
          :total="orderListp"
          show-total
          :page-size="pageSize"
          prev-text="上一页"
          next-text="下一页"
          @on-change="onChangep"
        >
          <template>共{{ orderListp }}条订单</template>
        </Page>
        <div v-else>
          <img src="../assets/null.png" alt="" />
          <p>暂无内容数据</p>
        </div>
      </TabPane>
      <!-- 已完成 -->
      <TabPane :label="accomplish" name="5">
        <div v-if="this.accomplishListData.length > 0">
          <div class="tabBox">
            <div class="tabtitle">
              <span class="onetab">订单详情</span>
              <div class="tabfour">
                <span>金额</span>
                <span>全部状态</span>
                <span>操作</span>
              </div>
            </div>
            <div
              class="taborderList"
              v-for="(v, i) in accomplishListData"
              :key="i"
            >
              <div class="tabst">
                <div class="divone">
                  <span class="tabsleft"></span>
                  <span>订单号：{{ v.shopId }}</span>
                  <span class="tabright"
                    ><span class="yuandian"></span>{{ v.shopName }}</span
                  >
                </div>
                <div>下单时间：{{ v.createTime }}</div>
              </div>
              <div class="tabw">
                <div class="tablistfalse">
                  <div
                    class="labbox"
                    v-for="(item, index) in v.productItemsList"
                    :key="index"
                  >
                    <div class="labimg">
                      <img :src="item.img01.split(',')[0]" alt="" />
                    </div>
                    <div class="listname to">{{ item.productName }}</div>
                    <div class="to">X{{ item.number }}</div>
                  </div>
                </div>
                <div class="righttext">
                  <div class="e t">
                    <div style="color: #ea6240">
                      <span>实付款：￥</span>
                      <span>{{ v.actualPay }}</span>
                    </div>
                    <Divider style="margin: 0" />
                    <div class="c_p">含运费：￥0.00</div>
                  </div>
                  <div class="e o">
                    <div>已完成</div>
                    <div class="c_p" @click="orderDetailsItem(v)">订单详情</div>
                  </div>
                  <div class="e">
                    <div class="ee">
                      <div class="c_p video_class">去评价</div>
                      <div class="c_p video_class">再来一单</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Page
          v-if="this.accomplishListData.length > 0"
          class="fixedpage"
          :current="currentNumw"
          :total="orderListw"
          show-total
          :page-size="pageSize"
          prev-text="上一页"
          next-text="下一页"
          @on-change="onChangew"
        >
          <template>共{{ orderListw }}条订单</template>
        </Page>
        <div v-else>
          <img src="../assets/null.png" alt="" />
          <p>暂无内容数据</p>
        </div>
      </TabPane>
      <!-- 已评论 -->
      <TabPane :label="comment" name="6">
        <div v-if="this.commentListData.length > 0">
          <div class="tabBox">
            <div class="tabtitle">
              <span class="onetab">订单详情</span>
              <div class="tabfour">
                <span>金额</span>
                <span>全部状态</span>
                <span>操作</span>
              </div>
            </div>
            <div
              class="taborderList"
              v-for="(v, i) in commentListData"
              :key="i"
            >
              <div class="tabst">
                <div class="divone">
                  <span class="tabsleft"></span>
                  <span>订单号：{{ v.shopId }}</span>
                  <span class="tabright"
                    ><span class="yuandian"></span>{{ v.shopName }}</span
                  >
                </div>
                <div>下单时间：{{ v.createTime }}</div>
              </div>
              <div class="tabw">
                <div class="tablistfalse">
                  <div
                    class="labbox"
                    v-for="(item, index) in v.productItemsList"
                    :key="index"
                  >
                    <div class="labimg">
                      <img :src="item.img01.split(',')[0]" alt="" />
                    </div>
                    <div class="listname to">{{ item.productName }}</div>
                    <div class="to">X{{ item.number }}</div>
                  </div>
                </div>
                <div class="righttext">
                  <div class="e t">
                    <div style="color: #ea6240">
                      <span>实付款：￥</span>
                      <span>{{ v.actualPay }}</span>
                    </div>
                    <Divider style="margin: 0" />
                    <div class="c_p">含运费：￥0.00</div>
                  </div>
                  <div class="e o">
                    <div>已评论</div>
                    <div class="c_p" @click="orderDetailsItem(v)">订单详情</div>
                  </div>
                  <div class="e">
                    <div class="ee">
                      <div class="c_p video_class">查看评价</div>
                      <div class="c_p video_class">再来一单</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Page
          v-if="this.commentListData.length > 0"
          class="fixedpage"
          :current="currentNumpl"
          :total="orderListpl"
          show-total
          :page-size="pageSize"
          prev-text="上一页"
          next-text="下一页"
          @on-change="onChangepl"
        >
          <template>共{{ orderListpl }}条订单</template>
        </Page>
        <div v-else>
          <img src="../assets/null.png" alt="" />
          <p>暂无内容数据</p>
        </div>
      </TabPane>
    </Tabs>
    <!-- 视频模块 -->
    <!-- <Modal
      v-model="videoBoxShow"
      title="adasd"
      @on-ok="ok"
      @on-cancel="cancel"
      :closable="false"
      :mask-closable="false"
      scrollable
      draggable
      sticky
    >
      <p>Content of dialog</p>
      <p>Content of dialog</p>
      <p>Content of dialog</p>
    </Modal> -->

    <div v-show="videoBoxShow" class="videoBoxClass">
      <div>
        <div class="inviteVideo" v-videoDrag>
          <div v-show="false" class="inviteVideotitle">
            <div class="inviteVideoImg">
              <img src="../assets/392471a3cf07609b.png" alt="" />
            </div>
            <div class="inviteVideoname">左邻右舍便利店</div>
            <div class="inviteVideotext">正在等待对方接受邀请</div>
            <div class="inviteVideostatus">对方忙!</div>
          </div>

          <div v-show="false" class="inviteVideobtn">
            <div>
              <img src="../assets/gbmkf.png" alt="" />
              <div>麦克风已开</div>
            </div>
            <div >
              <img src="../assets/jj.png" alt="" />
              <div>挂断</div>
            </div>
            <div>
              <img src="../assets/gbysq.png" alt="" />
              <div>扬声器已关</div>
            </div>
          </div>
          <video
            id="video"
            width="370"
            height="628"
            autoplay
            class="video_Box"
          ></video>
          <!-- <canvas width="370" height="628" id="videoPlay"></canvas> -->
        </div>
      </div>
      <div v-show="false">
        <div class="videoBox" v-videoDrag>
          <div class="videoTop">
            <img src="../assets/12aa4a93649e292a.jpg" alt="" />
            <div>
              <p>左邻右舍便利店</p>
              <p>13455667788</p>
            </div>
          </div>
          <div class="video"></div>
          <div class="videoBottm"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getOrderList, getAllCommentByUserId,confirmReceived } from "@/utils/api";
import OrderBreadcrumb from "../components/orderBreadcrumb.vue";
import { connectFn, unsubscribe, unconnect } from "@/utils/mqtt";
export default {
  name: "order",
  components: { OrderBreadcrumb },
  props: {},
  data() {
    return {
      title: "",
      videoWidth: 370, //视频宽度
      videoHeight: 200, //视频高度
      videoBoxShow: false, //视频模块
      canvasE: "",
      // 全部订单
      currentNum: 1, // 全部当前页码
      pageSize: 10, // 全部每页条数
      qorderList: null, //全部条数
      currentNumf: 1, // 待付款页码
      orderListf: null, // 待付款条数
      currentNumq: 1, // 待确定页码
      orderListq: null, // 待确定条数
      currentNums: 1, // 待收货页码
      orderLists: null, // 待收货条数
      currentNump: 1, // 待评价页码
      orderListp: null, // 待评价条数
      currentNumw: 1, // 已完成页码
      orderListw: null, // 已完成条数,
      currentNumpl: 1, // 已评价页码
      orderListpl: null, // 已评价条数
      orderListData: [], //全部订单列表
      obligationListData: [], //待付款列表
      toBeDecidedListData: [], //待确定
      waitForReceivingListData: [], //待收货
      awaitReviewedListData: [], //待评论
      accomplishListData: [], //已完成
      commentListData: [], //已评论
      allOrder: (h) => {
        return h("div", [
          h("span", "全部订单"),
          this.orderListData.length > 0 ? h("Badge") : "",
        ]);
      },
      awaitPayment: (h) => {
        return h("div", [
          h("span", "待付款"),
          this.obligationListData.length > 0 ? h("Badge") : "",
        ]);
      },
      awaitConfirm: (h) => {
        return h("div", [
          h("span", "待确定"),
          this.toBeDecidedListData.length > 0 ? h("Badge") : "",
        ]);
      },
      awaitGoods: (h) => {
        return h("div", [
          h("span", "待收货"),
          this.waitForReceivingListData.length > 0 ? h("Badge") : "",
        ]);
      },
      awaitComment: (h) => {
        return h("div", [
          h("span", "待评价"),
          this.awaitReviewedListData.length > 0 ? h("Badge") : "",
        ]);
      },
      accomplish: (h) => {
        return h("div", [
          h("span", "已完成"),
          this.accomplishListData.length > 0 ? h("Badge") : "",
        ]);
      },
      comment: (h) => {
        return h("div", [
          h("span", "已评价"),
          this.commentListData.length > 0 ? h("Badge") : "",
        ]);
      },
    };
  },
  created() {},
  mounted() {
    this.title = this.$route.meta.title;
    this.getOrderListInfo(); //全部订单
    this.getobligationOrderListInfo(); //待付款
    this.gettoBeDecidedOrderListInfo(); //待确定
    this.getwaitForReceivingOrderListInfo(); //待收货
    this.getawaitReviewedOrderListInfo(); //待评价
    this.getawaitReviewedOrderListInfopwc(); //已完成
    this.getawaitReviewedOrderListInfoppl(); //已评价
  },
  methods: {
    // tabs item 点击事件
    tabsClickItem(name) {
      switch (name) {
        case "0":
          this.getOrderListInfo();
          break;
        case "1":
          this.getobligationOrderListInfo();
          break;
        case "2":
          this.gettoBeDecidedOrderListInfo();
          break;
        case "3":
          this.getwaitForReceivingOrderListInfo();
          break;
        case "4":
          this.getawaitReviewedOrderListInfo();
          break;
        case "5":
          this.getawaitReviewedOrderListInfopwc();
          break;
        case "6":
          this.getawaitReviewedOrderListInfoppl();
          break;
      }
    },
    // 全部订单
    getOrderListInfo() {
      var getOrderListData = {
        currPage: this.currentNum, //页数
        records: this.pageSize, //每页个数
        queryCondition01: "", //订单状态
      };
      getOrderList(getOrderListData).then((res) => {
        if (res || res.status == 200) {
          // console.log(res, "我是订单");
          this.orderListData = res.data.list;
          this.qorderList = res.data.total;
        }
      });
    },
    // 全部订单分页
    onChange(e) {
      this.currentNum = e;
      document.documentElement.scrollTop = 126;
      this.getOrderListInfo();
    },
    // 待付款
    onChangef(e) {
      this.currentNumf = e;
      document.documentElement.scrollTop = 126;
      this.getobligationOrderListInfo();
    },
    // 待确认
    onChangeq(e) {
      this.currentNumq = e;
      document.documentElement.scrollTop = 126;
      this.gettoBeDecidedOrderListInfo();
    },
    // 待收货分页
    onChanges(e) {
      this.currentNum = e;
      document.documentElement.scrollTop = 126;
      this.getwaitForReceivingOrderListInfo();
    },
    //待评论分页
    onChangep(e) {
      this.currentNump = e;
      document.documentElement.scrollTop = 126;
      this.awaitReviewedListData();
    },
    // 已完成
    onChangew(e) {
      this.currentNumw = e;
      document.documentElement.scrollTop = 126;
      this.getawaitReviewedOrderListInfopwc();
    },
    // 已评论
    onChangepl(e) {
      this.currentNumpl = e;
      document.documentElement.scrollTop = 126;
      this.getawaitReviewedOrderListInfoppl();
    },
    // 订单详情
    orderDetailsItem(value) {
      this.$router.push({
        path: "/pc/orderstatusdetails",
        query: { orderitemd: JSON.stringify(value) },
      });
      // window.open(routeUrl.href, "_blank");
    },
    // 待付款
    getobligationOrderListInfo() {
      var getOrderListData = {
        currPage: this.currentNumf, //页数
        records: this.pageSize, //每页个数
        queryCondition01: "000", //订单状态
      };
      getOrderList(getOrderListData).then((res) => {
        if (res || res.status == 200) {
          this.orderListf = res.data.total;
          this.obligationListData = res.data.list;
        }
      });
    },
    // 待确定
    gettoBeDecidedOrderListInfo() {
      var getOrderListData = {
        currPage: this.currentNumq, //页数
        records: this.pageSize, //每页个数
        queryCondition01: "003", //订单状态 待视频确定状态码
      };
      getOrderList(getOrderListData).then((res) => {
        if (res || res.status == 200) {
          this.orderListq = res.data.total;
          this.toBeDecidedListData = res.data.list;
        }
      });
    },
    // 待收货
    getwaitForReceivingOrderListInfo() {
      var getOrderListData = {
        currPage: this.currentNums, //页数
        records: this.pageSize, //每页个数
        queryCondition01: "005", //订单状态
      };
      getOrderList(getOrderListData).then((res) => {
        if (res || res.status == 200) {
          console.log(res,'res')
          this.orderLists = res.data.total;
          this.waitForReceivingListData = res.data.list;
        }
      });
    },
    // 待评价
    getawaitReviewedOrderListInfo() {
      var getOrderListData = {
        currPage: this.currentNump, //页数
        records: this.pageSize, //每页个数
        queryCondition01: "006", //订单状态
      };
      getOrderList(getOrderListData).then((res) => {
        if (res || res.status == 200) {
          this.orderListp = res.data.total;
          this.awaitReviewedListData = res.data.list;
        }
      });
    },
    // 已完成
    getawaitReviewedOrderListInfopwc() {
      var getOrderListData = {
        currPage: this.currentNumw, //页数
        records: this.pageSize, //每页个数
        queryCondition01: "200", //订单状态
      };
      getOrderList(getOrderListData).then((res) => {
        if (res || res.status == 200) {
          this.orderListw = res.data.total;
          this.accomplishListData = res.data.list;
        }
      });
    },
    // 已评价
    getawaitReviewedOrderListInfoppl() {
      var getOrderListData = {
        currPage: this.currentNumpl, //页数
        records: this.pageSize, //每页个数
        queryCondition01: "200", //订单状态
      };
      getOrderList(getOrderListData).then((res) => {
        if (res || res.status == 200) {
          this.orderListpl = res.data.total;
          this.commentListData = res.data.list;
        }
      });
    },
    // 取消订单
    confirmInfo(data){

    }
    // 视频确定
    // videoSueeccInfo() {
    //   this.videoBoxShow = true;
    //   var video = document.getElementById("video");
    //   var canvas = document.querySelector("#videoPlay");
    //   video.autoplay = true;
    //   navigator.mediaDevices
    //     .getUserMedia({
    //       video: true,
    //     })
    //     .then((success) => {
    //       if (success) {
    //         // video.srcObject = success;
    //         video.play();
    //         var ctx = canvas.getContext("2d");
    //         ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    //       }
    //     })
    //     .catch((error) => {
    //       console.error("摄像头开启失败，请检查摄像头是否可用！");
    //     });
    // },
    // 挂断事件
    // videooff() {
    //   this.videoBoxShow = false;
    //   if (!this.$refs["video"].srcObject) return;
    //   let stream = this.$refs["video"].srcObject;
    //   let tracks = stream.getTracks();
    //   tracks.forEach((track) => {
    //     track.stop();
    //   });
    //   this.$refs["video"].srcObject = null;
    // },

    // 测试视频
    // videoSueeccInfo() {
    //   this.videoBoxShow = true;
    //   var video = document.getElementById("video");
    //   navigator.mediaDevices
    //     .getUserMedia({
    //       video: {
    //         width: this.videoWidth,
    //         height: this.videoHeight,
    //       },
    //       audio: true,
    //     })
    //     .then(function (stream) {
    //       if ("srcObject" in video) {
    //         video.srcObject = stream;
    //       } else {
    //         // 防止在新的浏览器里使用它，应为它已经不再支持了
    //         video.src = window.URL.createObjectURL(stream);
    //       }
    //       video.onloadedmetadata = function (e) {
    //         video.play();
    //       };
    //     })
    //     .catch(function (err) {
    //       console.log(err.name + ": " + err.message);
    //     });
    // },
  },
};
</script>
<style lang="scss" scoped>
.videoBoxClass {
  z-index: 999;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba($color: #2a2a2a, $alpha: 0.5);
  transition: all 1s;
  // 邀请
  .inviteVideo {
    width: 370px;
    height: 628px;
    border-radius: 16px;
    overflow: hidden;
    position: absolute;
    display: flex !important;
    flex-direction: column !important;
    justify-content: space-between !important;
    align-items: center;
    color: #fff;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba($color: #000, $alpha: 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    .inviteVideotitle {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .inviteVideobtn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-bottom: 50px;
      > div:hover {
        cursor: pointer;
      }
    }
    .inviteVideoImg {
      width: 98px;
      height: 98px;
      border-radius: 50%;
      margin: 80px 0 15px 0;
      img {
        width: 100%;
      }
    }
    .inviteVideotext {
      margin: 20px 0 50px 0;
    }
    .inviteVideostatus {
      padding: 10px 30px;
      color: #fff;
      background-color: #2a2a2a;
    }
    // .video_Box {
    //   position: absolute;
    //   top: 0;
    //   left: 0;
    // }
    canvas {
      display: block;
      margin: 0 auto;
      z-index: 999;
    }
  }
  .videoBox {
    width: 370px;
    height: 628px;
    padding: 30px;
    border-radius: 16px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: pink;
  }
}
:deep(.ivu-page) {
  margin: 30px 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
:deep(.ivu-page-next) {
  padding: 0 10px;
  border: 1px solid #dcdee2;
}
:deep(.ivu-page-prev) {
  padding: 0 10px;
  border: 1px solid #dcdee2;
}
:deep(.ivu-page-custom-text:hover) {
  border-color: #ea6240;
}
:deep(.ivu-page-custom-text:hover a) {
  color: #ea6240 !important;
}
.myorderBox {
  width: 1280px;
  :deep(.ivu-tabs-nav .ivu-tabs-tab-active) {
    color: #ea6240 !important;
  }
  :deep(.ivu-tabs-ink-bar) {
    background-color: #ea6240;
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
  :deep(.ivu-badge) {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #ea6240;
    margin-left: 6px;
    top: -8px;
  }
  .tabBox {
    width: 100%;
    .tabtitle {
      width: 100%;
      padding: 11px 0;
      display: flex;
      justify-content: flex-start;
      .onetab {
        width: 685px;
      }
      .tabfour {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span {
          flex: 1;
        }
      }
    }
    .taborderList {
      width: 100%;
      background-color: #fff;
      margin-bottom: 20px;
      .tabst {
        width: 100%;
        height: 54px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        display: grid;
        grid-auto-flow: column;
        column-gap: 10px;
        background-color: #f7f7f7;
        .divone {
          display: flex;
          align-items: center;
          .tabsleft {
            width: 6px;
            height: 32px;
            display: inline-block;
            background-color: #ea6240;
            border-radius: 0 10px 10px 0;
            margin-right: 10px;
          }
          .tabright {
            margin-left: 80px;
            font-weight: bold;
            .yuandian {
              display: inline-block;
              width: 8px;
              height: 8px;
              background-color: #ea6240;
              border-radius: 50%;
              margin-right: 10px;
            }
          }
        }
      }
      .tabw {
        width: 100%;
        display: flex;
        // align-items: center;
        justify-content: space-between;
        .tablistfalse {
          width: 685px;
          border-right: 1px solid #dadbda;
          .labbox {
            width: 100%;
            height: 130px;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #dadbda;
            .listname {
              margin: 0 70px 0 30px;
            }
            .to {
              margin-top: 10px;
            }
            .labimg {
              width: 100px;
              height: 102px;
              overflow: hidden;
              margin-left: 16px;
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
          div:last-child {
            border-bottom: 0;
          }
        }

        .righttext {
          flex: 1;
          height: 130px;
          display: flex;
        }
        .e {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-evenly;
          flex: 1;
          .c_p {
            cursor: pointer;
          }
          .c_p:hover {
            color: #ea6240;
          }
          .video_class {
            padding: 4px 8px;
            border: 1px solid #ea6240;
            color: #ea6240;
            border-radius: 4px;
          }
          .recur {
            padding: 4px 8px;
            border: 1px solid #64676d;
            color: #515a6e;
            border-radius: 4px;
          }
          .recur:hover {
            border: 1px solid #ea6240;
          }
          .invoiceClass:hover {
            color: #ea6240;
            cursor: pointer;
          }
          .ee {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            flex: 1;
          }
        }
        .t {
          border-right: 1px solid #dadbda;
        }
        .o {
          border-right: 1px solid #dadbda;
        }
      }
    }
  }
}
</style>
