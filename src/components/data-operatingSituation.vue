<!-- 抽屉操作情况 -->
<template>
  <div id="operatingSituation">
    <div class="title-new">
      <span class="title-new-bg">抽屉操作情况</span>
    </div>
    <div class="operatingSituation-item">
      <ve-bar
        :data="chartData"
        :settings="chartSettings"
        :legend="legend"
        :y-axis="yAxis"
        :x-axis="xAxis"
        height="143px"
        :grid="grid"
        class="bg-ligra bg-round"
      ></ve-bar>
    </div>
  </div>
</template>

<script>
import echarts from "echarts/lib/echarts";

export default {
  props: {},
  data() {
    return {
      // 柱状图颜色
      colors: [
        new echarts.graphic.LinearGradient(0, 1, 1, 0, [
          { offset: 1, color: "#00FFFF" },
          { offset: 0, color: "#00222B" },
        ]),
        new echarts.graphic.LinearGradient(0, 1, 2, 0, [
          { offset: 1, color: "#3FA9F5" },
          { offset: 0, color: "#052330" },
        ]),
      ],
      chartSettings: {
        metrics: ["a", "次数", "b"],
        itemStyle: {
          borderWidth: 10,
          normal: {
            color: function(params) {
              var colorList = [
                new echarts.graphic.LinearGradient(0, 1, 2, 0, [
                  { offset: 0, color: "#513819" },
                  { offset: 1, color: "#F7931E" },
                ]),
                new echarts.graphic.LinearGradient(0, 1, 2, 0, [
                  { offset: 0, color: "#00575D" },
                  { offset: 1, color: "#00FFFF" },
                ]),
                new echarts.graphic.LinearGradient(0, 1, 1, 0, [
                  { offset: 0, color: "#153F5E" },
                  { offset: 1, color: "#3FA9F5" },
                ]),
              ];
              return colorList[params.dataIndex];
            },
          },
        },
      },
      //   图例
      legend: {
        top: 10,
        // 文字颜色
        // textStyle: {
        //   color: "#fff",
        // },
        show: false,
      },
      // X轴设置
      xAxis: [
        {
          axisLabel: {
            show: false,
            textStyle: {
              color: "#fff", //坐标值得具体的颜色
            },
          },
          splitLine: {
            show: false, //不显示分割线
          },
        },
      ],
      // Y轴设置
      yAxis: [
        {
          type: "category",
          axisLabel: {
            show: true,
            textStyle: {
              color: "white", //这里是改变字体颜色
              fontSize: 12, //字体大小
            },
          },
          splitLine: {
            show: false, //不显示分割线
          },
          data: ["证件存入操作次数", "证件取出操作次数", "证件异常取出次数"],
        },
      ],
      // 距离
      grid: {
        top: "0%", //距上边距
        // left: "25%", //距离左边距
        // right: "3%", //距离右边距
        bottom: "0%", //距离下边距
      },

      chartData: {
        rows: [{ 次数: 1393 }, { 次数: 3530 }, { 次数: 2923 }],
      },
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {},
  components: {},
};
</script>

<style scoped lang="scss">
#operatingSituation {
  margin-top: 10px;
  .operatingSituation-item {
    padding-bottom: 14px;
    border: 28px solid transparent;
    border-image: url("../assets/border/1/right_03.png") 28;
    height: 143px;
  }
}
</style>
