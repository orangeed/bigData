<!-- 异常设备信息表格 -->
<template>
  <div
    id="errorTable"
    class="fadein"
    v-show="$store.getters.moduleOptions.equipmentAbnormality"
  >
    <dv-scroll-board :config="config" class="scrollTable" @click="clickRow" />
  </div>
</template>

<script>
import { deviceErrorInfo } from "../api/deviceStatistics";

export default {
  props: {},
  data() {
    return {
      adcode: this.$store.getters.adcode,
      config: {
        header: ["单位名称", "单位地址", "设备异常信息", "经纬度"],
        data: [
          ["浙宝大厦", "浙江省杭州市", "坏了", "120.171465, 30.250236"],
          [
            "浙江经贸职业技术学院",
            "浙江省杭州市",
            "坏了",
            "120.172763, 30.276271",
          ],
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
          ["杭州第一高级中学", "浙江省杭州市", "坏了", "119.279089, 29.472284"],
          ["杭州第一高级中学", "浙江省杭州市", "坏了", "119.279089, 29.472284"],
          ["杭州第一高级中学", "浙江省杭州市", "坏了", "119.279089, 29.472284"],
          ["杭州第一高级中学", "浙江省杭州市", "坏了", "119.279089, 29.472284"],
          ["杭州第一高级中学", "浙江省杭州市", "坏了", "119.279089, 29.472284"],
          ["杭州第一高级中学", "浙江省杭州市", "坏了", "119.279089, 29.472284"],
          ["杭州第一高级中学", "浙江省杭州市", "坏了", "119.279089, 29.472284"],
          ["杭州第一高级中学", "浙江省杭州市", "坏了", "119.279089, 29.472284"],
          ["杭州第一高级中学", "浙江省杭州市", "坏了", "119.279089, 29.472284"],
          ["杭州第一高级中学", "浙江省杭州市", "坏了", "119.279089, 29.472284"],
          ["杭州第一高级中学", "浙江省杭州市", "坏了", "119.279089, 29.472284"],
          ["杭州第一高级中学", "浙江省杭州市", "坏了", "119.279089, 29.472284"],
        ],
        index: true,
        indexHeader: "序号",
        columnWidth: [50],
        align: ["center"],
        waitTime: 2000,
        hoverPause: true,
        rowNum: 13,
        // headerBGC:
        //   "linear-gradient(360deg,rgba(247, 147, 30, 0.6) 1%,rgba(247, 147, 30, 0.5) 10%,rgba(247, 147, 30, 0.4) 20%,rgba(247, 147, 30, 0.3) 30%,rgba(247, 147, 30, 0.2) 40%,rgba(247, 147, 30, 0.1) 50%,rgba(247, 147, 30, 0.2) 60%,rgba(247, 147, 30, 0.3) 70%,rgba(247, 147, 30, 0.4) 80%,rgba(247, 147, 30, 0.5) 90%,rgba(247, 147, 30, 0.6) 99%",
      },
      timer: null,
    };
  },
  computed: {},
  created() {
    this.timer = setInterval(() => {
      this.adcode = this.$store.getters.adcode;
      this.deviceErrorInfo();
    }, this.$store.getters.timer);
  },
  mounted() {},
  watch: {},
  methods: {
    clickRow(val) {
      console.log("11111", val);
      // alert(JSON.stringify(val));
      this.$emit("position", val);
    },
    // 设备异常统计信息
    deviceErrorInfo() {
      deviceErrorInfo({ area: this.adcode }).then((res) => {
        if (res.code === 0 && res.result.list != null) {
          this.config.data = res.result.list;
        }
      });
    },
  },
  components: {},
  destroyed() {
    clearInterval(this.timer);
  },
};
</script>

<style scoped lang="scss">
#errorTable {
  background-color: rgba(161, 161, 161, 0.1);
  .scrollTable {
    width: 770px;
    height: 520px;
    // height: 100%;
    // border-image: url("../assets/logo.png") 30 30 round;
    border: 20px solid transparent;
    border-radius: 10px;
    // padding: 20px;
    border-image: url("../assets/border/3/3_18.png") 20;
    padding-bottom: 20px;
  }
}
</style>
