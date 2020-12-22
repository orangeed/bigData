<!-- 异常设备信息表格 -->
<template>
  <div id="errorTable">
    <dv-scroll-board :config="config" class="scrollTable" @click="clickRow" />
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      config: {
        header: ["单位名称", "单位地址", "设备异常信息", "经纬度"],
        data: [
          ["杭州第一高级中学", "浙江省杭州市", "坏了", "120.171465, 30.250236"],
          ["杭州第一高级中学", "浙江省杭州市", "坏了", "120.172763, 30.276271"],
          ["杭州第一高级中学", "浙江省杭州市", "坏了", "120.202633, 30.266603"],
          ["杭州第一高级中学", "浙江省杭州市", "坏了", "120.150053, 30.314697"],
          ["杭州第一高级中学", "浙江省杭州市", "坏了", "120.147376, 30.272934"],
          ["杭州第一高级中学", "浙江省杭州市", "坏了", "120.21062, 30.206615"],
          ["杭州第一高级中学", "浙江省杭州市", "坏了", "120.27069, 30.162932"],
          ["杭州第一高级中学", "浙江省杭州市", "坏了", "120.301737, 30.421187"],
          ["杭州第一高级中学", "浙江省杭州市", "坏了", "119.949869, 30.049871"],
          ["杭州第一高级中学", "浙江省杭州市", "坏了", "119.685045, 29.797437"],
          ["杭州第一高级中学", "浙江省杭州市", "坏了", "119.044276, 29.604177"],
          ["杭州第一高级中学", "浙江省杭州市", "坏了", "119.279089, 29.472284"],
        ],
        index: true,
        columnWidth: [50],
        align: ["center"],
        waitTime: 1000,
        hoverPause: true,
      },
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    clickRow(val) {
      console.log(val);
      // alert(JSON.stringify(val));
      this.$emit("position", val);
    },
  },
  components: {},
};
</script>

<style scoped lang="scss">
#errorTable {
  background-color: rgba(161, 161, 161, 0.1);
  .scrollTable {
    width: 500px;
    height: 220px;
  }
}
</style>
