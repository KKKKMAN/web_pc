<template>
  <div class="topindex">
    <Headertop />
    <Topsearch v-if="this.$route.path !== '/pc/commitOrder'" />
    <commitOrdercom v-else />
    <Banners
      v-if="
        this.$route.path !== '/pc/commoditydetailpage' &&
        this.$route.path !== '/pc/commitOrder'
      "
    />
  </div>
</template>

<script>
import Headertop from "./headertop";
import Topsearch from "./topsearch";
import commitOrdercom from "./commitOrdercom";
import Banners from "./banners";
export default {
  name: "",
  components: { Headertop, Topsearch, Banners, commitOrdercom },
  props: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.topindex {
  width: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
