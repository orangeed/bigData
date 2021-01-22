<!-- 百度地图 -->
<template>
  <div id="map_container"></div>
</template>

<script>
// import mapvgl from "mapvgl";
// import beijing from "../utils/beijing.json";
import china from "../utils/china.json";

export default {
  props: {},
  data() {
    return {
      BMap: null,
      point: null,
      view: null,
      layer: null,
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.initBMap();
    // this.a();
  },
  watch: {},
  methods: {
    // 初始化地图
    initBMap() {
      // 1.实例化地图
      this.BMap = new BMapGL.Map("map_container");
      //   设置中心点
      this.point = new BMapGL.Point(107.4, 35.42);
      this.BMap.centerAndZoom(this.point, 5);
      console.log("mapvgl", mapvgl);
      // 2. 创建MapVGL图层管理器
      this.view = new mapvgl.View({
        map: this.BMap,
      });
      // 3. 创建可视化图层，并添加到图层管理器中
      this.layer = new mapvgl.PointLayer({
        color: "rgba(50, 50, 200, 1)",
        blend: "lighter",
        size: 2,
      });
      this.view.addLayer(this.layer);
      // 4.添加上好看的皮肤
      this.BMap.setMapStyleV2({
        styleId: "f5a0afde973b896cc245980b07217e06",
      });
      //开启鼠标滚轮缩放
      this.BMap.enableScrollWheelZoom(true);
      // 设置倾斜角
      this.BMap.setTilt(70);
      // 设置柱状图
      this.setHistogram();
      // 点击地图
      this.BMap.addEventListener("click", this.featureClick);
    },
    // 设置柱状图
    setHistogram() {
      let grid = new mapvgl.HeatGridLayer({
        max: 80, // 最大阈值
        min: 10, // 最小阈值
        // color: function() {
        //     return 'rgb(200, 255, 0)';
        // },
        // gridSize: 50000,
        gridSize: 1000,

        style: "normal",
        gradient: {
          // 对应比例渐变色
          0.0: "rgb(50, 50, 256)",
          0.1: "rgb(50, 250, 56)",
          0.5: "rgb(250, 250, 56)",
          1.0: "rgb(250, 50, 56)",
        },
        riseTime: 1800, // 楼块初始化升起时间
        maxHeight: 100000, // 最大高度
        minHeight: 200, // 最小高度
      });
      this.view.addLayer(grid);
      let beijignData = china.result.data[0].bound;
      let data = [];

      for (let i = 0; i < beijignData.length; i++) {
        const item = beijignData[i];
        data.push({
          geometry: {
            type: "Point",
            coordinates: [item[0], item[1]],
          },
          properties: {
            count: item[2],
          },
        });
      }
      grid.setData(data);
    },
    // 点击地图
    featureClick(e) {
      console.log("info", e);
    },

    // a() {
    //   // 1.实例化地图
    //   var map = new BMap.Map("map_container");
    //   //   设置中心点
    //   var point = new BMap.Point(116.404, 39.915);
    //   map.centerAndZoom(point, 15);
    //   map.enableScrollWheelZoom(true);
    // },
  },
  components: {},
};
</script>

<style scoped lang="scss">
@import "../style/baiduMapCss.scss";
</style>
<style>
.BMap_cpyCtrl {
  display: none;
}
.anchorBL {
  display: none;
}
</style>
