<template>
  <div class="mycoupon">
    <orderBreadcrumb :title="title" />
    <Tabs value="name1" @on-click="onTabChange">
      <TabPane label="未使用" name="name1">
        <Table stripe :columns="unusedColumns" :data="unusedData">
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" ghost label="large" @click="dataItem(row)"
              >使用</Button
            >
          </template>
        </Table>
      </TabPane>
      <TabPane label="已使用" name="name2">
        <Table stripe :columns="columns2" :data="unusedData">
          <template slot="action">
            <span style="color: #ea6240">已使用</span>
          </template></Table
        >
      </TabPane>
      <TabPane label="已过期" name="name3">
        <Table stripe :columns="columns3" :data="unusedData">
          <template slot="action"> 已过期 </template></Table
        >
      </TabPane>
    </Tabs>
    <Page
      :current="paramsData.currPage"
      :total="totalNum"
      show-total
      :page-size="pageSize"
      prev-text="上一页"
      next-text="下一页"
      @on-change="onChange"
    >
      <template>共{{ totalNum }}条优惠卷</template>
    </Page>
  </div>
</template>

<script>
import { gettUserShopCouponList } from "@/utils/api";
import orderBreadcrumb from "@/components/orderBreadcrumb";
export default {
  name: "mycoupon",
  components: { orderBreadcrumb },
  props: {},
  data() {
    return {
      title: this.$route.meta.title,
      totalNum: null, //总条数
      currentNum: 1, // 当前页码
      pageSize: 10, // 每页条数
      unusedData: [], //未使用数据
      unusedColumns: [
        {
          title: "面额",
          key: "couponPrice",
        },
        {
          title: "适用范围",
          key: "shopName",
        },
        {
          title: "有效期",
          key: "endTime",
        },
        {
          title: "领取来源",
          key: "title",
        },
        {
          title: "操作",
          key: "action",
          slot: "action",
          width: 150,
          align: "center",
        },
      ],
      columns2: [
        {
          title: "面额",
          key: "couponPrice",
        },
        {
          title: "适用范围",
          key: "shopName",
        },
        {
          title: "有效期",
          key: "endTime",
        },
        {
          title: "领取来源",
          key: "title",
        },
        {
          title: "操作",
          key: "action",
          slot: "action",
          width: 150,
          align: "center",
        },
      ],
      columns3: [
        {
          title: "面额",
          key: "couponPrice",
        },
        {
          title: "适用范围",
          key: "shopName",
        },
        {
          title: "有效期",
          key: "endTime",
        },
        {
          title: "领取来源",
          key: "title",
        },
        {
          title: "状态",
          key: "action",
          slot: "action",
          width: 150,
          align: "center",
        },
      ],
      paramsData: {
        currPage: 1,
        records: 10,
        status: 0, //状态：0-未使用，1-已使用，2-已过期
        queryCondition01: "",
      }
    };
  },
  created() {},
  mounted() {
    this.gettUserShopCouponListInfo();
  },
  methods: {
    onTabChange(name) {
      if(name === 'name1'){
        this.paramsData.status = 0;
      }else if(name === 'name2') {
        this.paramsData.status = 1;
      } else if(name === 'name3') {
        this.paramsData.status = 2;
      }
      this.paramsData.currPage = 1;
      this.gettUserShopCouponListInfo();
    },
    dataItem(value) {
      // console.log(value, "value");
      this.$router.push({
        path: "/pc/shopParticulars",
        query: {
          shopId: value.shopId,
        },
      });
    },
    // 页码改变
    onChange(e) {
      // this.currentNum = e;
      this.paramsData.currPage = e;
      this.gettUserShopCouponListInfo();
    },
    // 我的优惠卷
    gettUserShopCouponListInfo() {
      gettUserShopCouponList(this.paramsData).then((res) => {
        this.unusedData = res.data.list;
        this.totalNum = res.data.total;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
:deep(.ivu-page) {
  margin-top: 30px;
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
:deep(.ivu-btn-primary:focus) {
  box-shadow: 0 0 10px 2px #eb6b4b3e;
}
:deep(.ivu-table-row:hover) {
  background-color: orange !important;
}
.mycoupon {
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
  :deep(.ivu-table-row) {
    height: 76px;
  }
  :deep(.ivu-table-row > td:first-child) {
    color: #ea6240 !important;
  }
  :deep(.ivu-table-fixed-shadow) {
    box-shadow: none;
  }
  :deep(.ivu-btn-ghost.ivu-btn-primary) {
    color: #ea6240;
    border-color: #ea6240;
  }
}
</style>
