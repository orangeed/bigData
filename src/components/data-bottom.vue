<!-- 底部 -->
<template>
  <div id="bottom">
    <!-- <ve-line
      :x-axis="xAxis"
      :data="chartData"
      :y-axis="yAxis"
      height="300px"
      :settings="chartSettings"
    ></ve-line> -->
    <ve-histogram
      :data="chartData"
      :y-axis="yAxis"
      :x-axis="xAxis"
      height="300px"
      :settings="chartSettings"
    ></ve-histogram>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      chartSettings: {
        metrics: ["设备注册量", "单位注册量"],
        // showLine: ["设备注册量","单位注册量"],
      },
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
#bottom {
  // height: 400px;
  // width: 600px;
  // height: 30%;
  width: 50vw;
}
</style>
