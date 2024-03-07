<template>
  <div class="topsearchBox">
    <div class="divo">
      <div><img src="../assets/logotext.png" alt="" /></div>
    </div>
    <div>
      <div>
        <div><img src="../assets/videlo.png" alt="" /></div>
        <div>视频网购</div>
      </div>
      <div>
        <div><img src="../assets/anq.png" alt="" /></div>
        <div>安全放心</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
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
.topsearchBox {
  font-size: 15px;
  color: #333;
  width: 1280px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  display: grid;
  grid-auto-flow: column;
  column-gap: 16px;
  .divo {
    width: 200px;
    display: flex;
    justify-content: center;
  }
  > div:nth-child(2) {
    display: flex;
    align-items: center;
    > div {
      display: flex;
      align-items: center;
      margin: 0 10px;
      > div:nth-child(1) {
        display: flex;
        align-items: center;
      }
      > div:nth-child(2) {
        margin-left: 5px;
      }
    }
  }
}
</style>
