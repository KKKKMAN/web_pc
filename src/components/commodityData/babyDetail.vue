<template>
  <div class="long_img" v-html="descriptionImg"></div>
</template>

<script>
export default {
  name: "badyDetail",
  components: {},
  props: {},
  data() {
    return {
      descriptionImg: localStorage.getItem("description"),
    };
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style lang="scss">
.long_img {
  width: 800px;
  padding-top: 30px;
}
p {
  width: 100%;
  img {
    width: 100% !important;
  }
}
</style>
