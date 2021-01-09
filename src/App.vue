<template>
  <div id="app">
    <!-- <index /> -->
    <indexmap />
  </div>
</template>

<script>
// import Index from "./views/index.vue";
import indexmap from "./views/index-map";
export default {
  name: "App",
  components: {
    // Index,
    indexmap,
  },
  created() {
    document.title = "大数据展示平台";
  },
};
</script>

<style lang="scss">
#app {
  // font-family: "Avenir", Helvetica, Arial, sans-serif;
  font-family: SimHei;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
// // 排名轮播表外面的柱状图
// .dv-scroll-ranking-board .ranking-column {
//   background-color: #00444c !important;
//   border: none !important;
//   border-radius: 5px;
// }
// // 排名轮播表里面的柱状图
// .dv-scroll-ranking-board .ranking-column .inside-column {
//   background-color: rgba(0, 255, 255, 0.3) !important;
//   border-radius: 5px !important;
//   padding: 1px 0px 1px 0px !important;
//   height: 4px !important;
//   margin: 0 !important;
//   padding: 0 !important;
// }
// .dv-scroll-ranking-board .ranking-info .rank {
//   color: #fff !important;
// }
.dv-scroll-board .header {
  background: linear-gradient(
    360deg,
    rgba(247, 147, 30, 0.3) 1%,
    rgba(247, 147, 30, 0.27) 10%,
    rgba(247, 147, 30, 0.24) 20%,
    rgba(247, 147, 30, 0.21) 30%,
    rgba(247, 147, 30, 0.18) 40%,
    rgba(247, 147, 30, 0.15) 50%,
    rgba(247, 147, 30, 0.18) 60%,
    rgba(247, 147, 30, 0.21) 70%,
    rgba(247, 147, 30, 0.24) 80%,
    rgba(247, 147, 30, 0.27) 90%,
    rgba(247, 147, 30, 0.3) 99%
  ) !important;
}
.dv-scroll-board .rows .row-item {
  background: linear-gradient(
    360deg,
    rgba(247, 147, 30, 0.2) 1%,
    rgba(247, 147, 30, 0.18) 10%,
    rgba(247, 147, 30, 0.16) 20%,
    rgba(247, 147, 30, 0.14) 30%,
    rgba(247, 147, 30, 0.12) 40%,
    rgba(247, 147, 30, 0.1) 50%,
    rgba(247, 147, 30, 0.12) 60%,
    rgba(247, 147, 30, 0.14) 70%,
    rgba(247, 147, 30, 0.16) 80%,
    rgba(247, 147, 30, 0.18) 90%,
    rgba(247, 147, 30, 0.2) 99%
  ) !important;
  margin: 5px 0px !important;
}
.dv-scroll-board .rows .index {
  background-color: transparent !important;
}
</style>
