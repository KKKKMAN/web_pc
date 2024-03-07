<template>
  <div class="notfound_box">
    <img src="../assets/fourError.png" alt="">
    <h5>网页被吸走了... 不见了</h5>
  </div>
</template>

<script>
export default {
  name: "notfound",
  components: {},
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.notfound_box {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  h5 {
    font-size: 20px;
    margin-top: 10px;
  }
}
</style>
