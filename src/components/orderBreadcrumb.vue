<template>
  <div class="myorderToptext">
    <span></span>
    <div>我的云端超市</div>
    >
    <div>{{ title }}</div>
  </div>
</template>

<script>
export default {
  name: "orderBreadcrumb",
  components: {},
  props: ["title"],
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.myorderToptext {
  width: 100%;
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  display: grid;
  grid-auto-flow: column;
  column-gap: 10px;
  font-size: 14px;
  color: #666;
  span {
    width: 4px;
    height: 10px;
    background-color: #ea6240;
    border-radius: 20px;
  }
}
</style>
