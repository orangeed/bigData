<!-- 环形图 -->
<template>
  <div class="ring" v-if="$store.getters.moduleOptions.deviceTypeInfo">
    <!-- 设备类型信息 -->
    <div class="title-new">
      <span class="title-new-bg">设备类型信息</span>
    </div>
    <div class="ring-item ">
      <ve-ring
        :data="chartData"
        :settings="chartSettings"
        :legend="legend"
        width="360px"
        height="196px"
        :colors="appcolor"
        class="bg-ligra bg-round"
        style="margin:0 auto;"
      ></ve-ring>
    </div>
  </div>
</template>

<script>
import { deviceTypeInfo } from "../api/deviceStatistics";
export default {
  props: {},
  data() {
    return {
      // 设备类型信息
      chartSettings: {
        radius: [38, 46],
        offsetY: 110,
        label: {
          // alignTo: "edge",
          formatter: "{a|{b}}\n{b|{c}} 个  {per|{d}%}",
          // formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
          // backgroundColor: "#F6F8FC",
          // borderColor: "#8C8D8E",
          borderWidth: 1,
          borderRadius: 4,
          rich: {
            a: {
              color: "#fff",
              // color: "#6E7079",
              lineHeight: 22,
              align: "center",
              // borderRadius: 4,
            },
            b: {
              // color: "#4C5058",
              color: "#fff",
              fontSize: 14,
              // fontWeight: "bold",
              lineHeight: 33,
            },
            per: {
              color: "#fff",
              backgroundColor: "#4C5058",
              padding: [3, 4],
              borderRadius: 4,
            },
          },
          labelLine: {
            length: 30,
          },
        },
        labelLine: {
          length: 15,
          length2: 10,
          maxSurfaceAngle: 80,
        },
        // labelLayout: function(params) {
        //   var isLeft = params.labelRect.x < myChart.getWidth() / 2;
        //   var points = params.labelLinePoints;
        //   // Update the end point.
        //   points[2][0] = isLeft
        //     ? params.labelRect.x
        //     : params.labelRect.x + params.labelRect.width;

        //   return {
        //     labelLinePoints: points,
        //   };
        // },
      },
      appcolor: ["#22B573", "#F15A24", "#007C3B", "#F28E4C", "#EFEA5A"],
      // 图配配置
      legend: {
        top: 10,
        // 文字颜色
        textStyle: {
          color: "#fff",
        },
        // 图例关闭时候的颜色
        inactiveColor: "#676665",
        data: [
          {
            name: "迷你型",
            icon:
              "path://M512 56.32c-233.472 0-422.707 189.235-422.707 422.707C89.293 712.5 278.528 901.734 512 901.734S934.707 712.5 934.707 479.027C934.707 245.555 745.472 56.32 512 56.32z m0 807.526c-212.582 0-384.82-172.236-384.82-384.819S299.419 94.208 512 94.208s384.82 172.237 384.82 384.82S724.581 863.845 512 863.845z,M272.18 479.027a117.1 117.1 0 1 0 479.64 0 117.1 117.1 0 1 0-479.64 0z",
          },
          {
            name: "小型",
            // icon: "diamond",
            icon:
              "path://M512 56.32c-233.472 0-422.707 189.235-422.707 422.707C89.293 712.5 278.528 901.734 512 901.734S934.707 712.5 934.707 479.027C934.707 245.555 745.472 56.32 512 56.32z m0 807.526c-212.582 0-384.82-172.236-384.82-384.819S299.419 94.208 512 94.208s384.82 172.237 384.82 384.82S724.581 863.845 512 863.845z,M272.18 479.027a117.1 117.1 0 1 0 479.64 0 117.1 117.1 0 1 0-479.64 0z",
          },
          {
            name: "中小型",
            // icon: "roundRect",
            icon:
              "path://M512 56.32c-233.472 0-422.707 189.235-422.707 422.707C89.293 712.5 278.528 901.734 512 901.734S934.707 712.5 934.707 479.027C934.707 245.555 745.472 56.32 512 56.32z m0 807.526c-212.582 0-384.82-172.236-384.82-384.819S299.419 94.208 512 94.208s384.82 172.237 384.82 384.82S724.581 863.845 512 863.845z,M272.18 479.027a117.1 117.1 0 1 0 479.64 0 117.1 117.1 0 1 0-479.64 0z",
          },
          {
            name: "中型",
            icon:
              // "path://M10.5,5.5a5,5,0,1,1-5-5A5,5,0,0,1,10.5,5.5Z,M8.5,5.5a3,3,0,1,1-3-3A3,3,0,0,1,8.5,5.5Z",
              "path://M512 56.32c-233.472 0-422.707 189.235-422.707 422.707C89.293 712.5 278.528 901.734 512 901.734S934.707 712.5 934.707 479.027C934.707 245.555 745.472 56.32 512 56.32z m0 807.526c-212.582 0-384.82-172.236-384.82-384.819S299.419 94.208 512 94.208s384.82 172.237 384.82 384.82S724.581 863.845 512 863.845z,M272.18 479.027a117.1 117.1 0 1 0 479.64 0 117.1 117.1 0 1 0-479.64 0z",
          },
          {
            name: "大型",
            // icon: "triangle",
            icon:
              "path://M512 56.32c-233.472 0-422.707 189.235-422.707 422.707C89.293 712.5 278.528 901.734 512 901.734S934.707 712.5 934.707 479.027C934.707 245.555 745.472 56.32 512 56.32z m0 807.526c-212.582 0-384.82-172.236-384.82-384.819S299.419 94.208 512 94.208s384.82 172.237 384.82 384.82S724.581 863.845 512 863.845z,M272.18 479.027a117.1 117.1 0 1 0 479.64 0 117.1 117.1 0 1 0-479.64 0z",
          },
        ],
      },
      seriesOptions: [
        {
          type: "pie",
          itemStyle: {
            shadowColor: "rgba(0, 0, 0, 0.5)",
            shadowBlur: 17.5,
          },
        },
      ],
      chartData: {
        columns: ["name", "value"],
        rows: [
          { name: "迷你型", value: 1393 },
          { name: "小型", value: 3530 },
          { name: "中小型", value: 2923 },
          { name: "中型", value: 1723 },
          { name: "大型", value: 3792 },
        ],
      },
      adcode: this.$store.getters.adcode,
      timer: null,
    };
  },
  computed: {},
  created() {
    this.timer = setInterval(() => {
      this.deviceTypeInfo();
    }, this.$store.getters.timer);
  },
  mounted() {},
  watch: {},
  methods: {
    deviceTypeInfo() {
      deviceTypeInfo({ area: this.adcode }).then((res) => {
        if (res.code === 0 && res.result.list != null) {
          this.chartData.rows = res.result.list;
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
.ring {
  .ring-item {
    padding-top: 10px;
    border: 28px solid transparent;
    border-image: url("../assets/border/1/right_01.png") 28;
    // color: rgb(21, 221, 21);
  }
}
</style>
