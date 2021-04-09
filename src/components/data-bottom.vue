<!-- 底部 -->
<template>
  <div id="bottom" v-if="$store.getters.moduleOptions.comprehensiveStatistics">
    <!-- <ve-line
      :x-axis="xAxis"
      :data="chartData"
      :y-axis="yAxis"
      height="300px"
      :settings="chartSettings"
    ></ve-line> -->
    <div class="bottom-item">
      <ve-histogram
        :data="chartData"
        :y-axis="yAxis"
        :x-axis="xAxis"
        height="206px"
        :settings="chartSettings"
        :legend="legend"
        :grid="grid"
        :colors="colors"
        :dataZoom="dataZoom"
        class="histogram bg-ligra bg-round"
      ></ve-histogram>
    </div>
  </div>
</template>

<script>
import echarts from "echarts/lib/echarts";
import { activation } from "../api/activation";
export default {
  props: {},
  data() {
    return {
      adcode: this.$store.getters.adcode,

      // 柱状图颜色
      colors: [
        new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "#00FFFF" },
          { offset: 1, color: "#00222B" },
        ]),
        new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "#3FA9F5" },
          { offset: 1, color: "#052330" },
        ]),
      ],
      // 基本设置
      chartSettings: {
        metrics: ["设备注册量", "单位注册量"],
        silent: false,
        label: {
          show: true,
          // position: "outside",
          position: [-5, -10],
          // distance: 15,
          align: "left",
          verticalAlign: "middle",
          rotate: 0,
          color: "#fff",
          // formatter: "{c}  {name|{a}}",
          formatter: "{c}",
          fontSize: 12,
          rich: {
            name: {},
          },
        },
      },
      // Y轴设置
      yAxis: [
        {
          axisLabel: {
            show: true,
            textStyle: {
              color: "white", //这里是改变字体颜色
              fontSize: 12, //字体大小
            },
          },
        },
      ],
      // X轴设置
      xAxis: [
        {
          type: "category",
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff", //坐标值得具体的颜色
            },
          },
          data: [
            "2020-01",
            "2020-02",
            "2020-03",
            "2020-04",
            "2020-05",
            "2020-06",
            "2020-07",
            "2020-08",
            "2020-09",
            "2020-10",
            "2020-11",
            "2020-12",
          ],
        },
      ],
      dataZoom: [
        {
          type: "inside",
        },
      ],
      // 距离
      grid: {
        top: "10%", //距上边距
        // left: "25%", //距离左边距
        right: "3%", //距离右边距
        bottom: "2%", //距离下边距
      },
      // 图配配置
      legend: {
        // 文字颜色
        textStyle: {
          color: "#fff",
        },
        // 图例关闭时候的颜色
        inactiveColor: "#676665",
        padding: [0, 0, 10, 0],
      },
      // 柱状图的标签
      // label: {
      //   show: true,
      //   position: "insideBottom",
      //   distance: 15,
      //   align: "left",
      //   verticalAlign: "middle",
      //   rotate: 90,
      //   formatter: "{c}  {name|{a}}",
      //   fontSize: 16,
      //   rich: {
      //     name: {},
      //   },
      // },
      // 柱状图数据
      chartData: {
        columns: ["日期", "设备注册量", "单位注册量"],
        rows: [
          { 日期: "2020-01", 设备注册量: 1393, 单位注册量: 1093 },
          { 日期: "2020-02", 设备注册量: 3530, 单位注册量: 3230 },
          { 日期: "2020-03", 设备注册量: 2923, 单位注册量: 2623 },
          { 日期: "2020-04", 设备注册量: 1723, 单位注册量: 1423 },
          { 日期: "2020-05", 设备注册量: 3792, 单位注册量: 3492 },
          { 日期: "2020-06", 设备注册量: 4593, 单位注册量: 4293 },
          { 日期: "2020-07", 设备注册量: 3530, 单位注册量: 3230 },
          { 日期: "2020-08", 设备注册量: 2923, 单位注册量: 2623 },
          { 日期: "2020-09", 设备注册量: 1723, 单位注册量: 1423 },
          { 日期: "2020-10", 设备注册量: 3792, 单位注册量: 3492 },
          { 日期: "2020-11", 设备注册量: 4593, 单位注册量: 4293 },
          { 日期: "2020-12", 设备注册量: 4593, 单位注册量: 4293 },
        ],
      },
      timer: null,
    };
  },
  computed: {},
  created() {
    this.timer = setInterval(() => {
      this.activation();
    }, this.$store.getters.timer);
  },
  mounted() {},
  watch: {},
  methods: {
    activation() {
      activation({ area: this.adcode }).then((res) => {
        if (res.code === 0 && res.result.list.length > 0) {
          this.xAxis[0].data = [];
          this.chartData.rows = [];
          res.result.list.forEach((v) => {
            this.xAxis[0].data.push(v.time);
            this.chartData.rows.push({
              日期: v.time,
              设备注册量: v.deviceRegistration,
              单位注册量: v.unitRegistration,
            });
          });
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
#bottom {
  // height: 400px;
  // width: 600px;
  // height: 30%;
  // width: 50vw;
  width: 100%;

  .bottom-item {
    border: 23px solid transparent;
    // width: 23px;
    // height: 23px;
    border-image: url("../assets/border/1/1_73.png") 23 stretch;
    height: 200px;
    // background: url("../assets/border/1/1_73.png") no-repeat;
    .histogram {
      margin: -10px 15px 0px 0px;
      transition: all 0.3s;
      // height: 200px;
      color: #5e9494;
    }
  }
}
</style>
