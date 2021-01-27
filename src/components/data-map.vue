<!-- 高德地图 -->
<template>
  <div id="container" ref="container" />
</template>
<script>
import AMap from "AMap";
import AMapUI from "AMapUI";
// import echarts from "echarts/lib/echarts";
// import echarts from 'echarts'
// import 'echarts-gl'
// 引入柱状图
// import 'echarts/lib/chart/bar';
// // 引入提示框和标题组件
// import 'echarts/lib/component/tooltip';
// import 'echarts/lib/component/title';

import { citys } from "../utils/city.js";
import { province } from "../utils/province.js";
import { heatGrid } from "../utils/gard.js";
import { openInfoWin } from "../utils/utils.js";

export default {
  props: {
    // 父组件带有一个返回全国的操作按钮控制
    reContry: {
      type: Boolean,
      default: false,
    },
    position: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      amap: null,
      districtExplorer: null,
      tipMarker: null,
      $tipMarkerContent: null,
      currentAreaNode: null,
      aReContry: this.reContry,
      marker: null,
      isChange: false,
      layer: null,
      loca: null,
      object3Dlayer: new AMap.Object3DLayer(),
      prism: null,
    };
  },
  mounted() {
    this.amap = new AMap.Map("container", {
      defaultCursor: "pointer",
      center: [107.4, 35.42], // 地图中心点
      zooms: [3, 20],
      // zoom: 5, // 地图显示的缩放级别
      resizeEnable: true, // 是否监控地图容器尺寸变化
      pitch: 45, // 地图俯仰角度，有效范围 0 度- 83 度
      viewMode: "3D", // 地图模式
      mapStyle: "amap://styles/5b59f9b29bb6261d416ce7b61509c972", // 地图样式
    });
    /**
     * 使用1.2.0版本的loca的时候需要自建一个底
     */
    // this.loca = Loca.create(this.amap);
    this.drawArea();

    // this.setHistogramEcharts()
    // console.log("heatGrid", heatGrid);
  },
  methods: {
    // 加载地图事件
    drawArea() {
      AMapUI.load(
        ["ui/geo/DistrictExplorer", "lib/$", "ui/misc/PointSimplifier"],
        (DistrictExplorer, $) => {
          // 创建一个实例
          this.districtExplorer = new DistrictExplorer({
            eventSupport: true, // 打开事件支持
            map: this.amap,
          });
          // 当前聚焦的区域
          this.$tipMarkerContent = $('<div class="tipMarker top"></div>');
          this.tipMarker = new AMap.Marker({
            content: this.$tipMarkerContent.get(0),
            offset: new AMap.Pixel(0, 0),
            bubble: true,
          });
          // 监听feature的hover事件
          this.districtExplorer.on(
            "featureMouseout featureMouseover",
            (e, feature) => {
              this.toggleHoverFeature(
                feature,
                e.type === "featureMouseover",
                e.originalEvent ? e.originalEvent.lnglat : null
              );
            }
          );

          // 监听鼠标在feature上滑动
          this.districtExplorer.on("featureMousemove", (e) => {
            // 更新提示位置
            this.tipMarker.setPosition(e.originalEvent.lnglat);
          });
          // feature被点击
          this.districtExplorer.on("featureClick", (e, feature) => {
            const props = feature.properties;
            //  if (props.level === "province") {
            // 只下钻到省一级 （省：province，市：city，县：district）
            // 若是下钻到县一级，那么这个if判断就可以注释掉
            console.log("props", props);
            this.switch2AreaNode(props.adcode, 0, 0, props.level);
            this.aReContry = false;
            this.showAreaInfo();
            this.$store.commit("SET_SHOWERRORTABLE", false);
            // this.$store.commit("SET_SHOWMODULEOPTIONS", false);
            // this.$store.commit("SET_SHOWMODULEOPTIONS", false);
            this.$store.commit("SET_SHOWMODULEOPTIONS", false);
            this.$store.commit("SET_ERRORDETAILS", false);
            this.layer.setMap(null);
            this.seaPoint();
            this.object3Dlayer.remove(this.prism);
            this.setPrism(props);
          });

          // 全国
          this.switch2AreaNode(100000);
          this.setPrism();
          // this.setHistogram();
          // setTimeout(() => {
          //   this.setHistogram();
          //   // this.setHistogramEcharts();
          // }, 4000);
        }
      );
    },
    // 根据Hover状态设置相关样式
    toggleHoverFeature(feature, isHover, position) {
      this.tipMarker.setMap(isHover ? this.amap : null);
      if (!feature) {
        return;
      }
      const props = feature.properties;
      if (isHover) {
        // 更新提示内容
        this.$tipMarkerContent.html(props.name);
        // 更新位置
        this.tipMarker.setPosition(position || props.center);
      }
      // 更新相关多边形的样式
      const polys = this.districtExplorer.findFeaturePolygonsByAdcode(
        props.adcode
      );
      polys.forEach((elemnt) => {
        elemnt.setOptions({
          fillOpacity: isHover ? 1 : 0,
        });
      });
    },
    // 绘制某个区域的边界
    renderAreaPolygons(areaNode, level) {
      // console.log("areaNode", areaNode);
      console.log("level", level);
      // 更新地图视野
      if (!this.aReContry) {
        this.amap.setBounds(areaNode.getBounds(), null, null, true);
      } else {
        this.amap.setZoom(4);
        this.amap.setCenter(new AMap.LngLat(103.714129, 38.150339));
      }
      // 清除已有的绘制内容
      this.districtExplorer.clearFeaturePolygons();
      // 绘制子区域
      this.districtExplorer.renderSubFeatures(areaNode, () => {
        // var fillColor = colors[i % colors.length];
        // var strokeColor = colors[colors.length - 1 - (i % colors.length)];
        return {
          cursor: "default",
          // bubble: true,
          strokeColor: "#fff", // 线颜色
          strokeOpacity: 0.4, // 线透明度
          strokeWeight: 1, // 线宽
          fillOpacity: 0, // 填充透明度
          fillColor: "#00c1fc", // 填充子区域的背景色
          // 66edff
        };
      });
      // 绘制父区域
      this.districtExplorer.renderParentFeature(areaNode, {
        cursor: "default",
        bubble: true,
        strokeColor: "#fff", // 线颜色
        strokeOpacity: areaNode.adcode == "100000" ? 0 : 1, // 线透明度
        strokeWeight: 1, // 线宽
        fillOpacity: level !== "district" ? 0.5 : 0, // 填充透明度
        fillColor: "#006996",
        // fillColor: "#00b7ff",
      });
    },
    // 切换区域后刷新显示内容
    refreshAreaNode(areaNode, level) {
      // console.log("areaNode", areaNode);
      console.log("refreshAreaNode", level);
      this.districtExplorer.setHoverFeature(null);
      this.renderAreaPolygons(areaNode, level);
    },
    // 切换区域
    switch2AreaNode(adcode, lat, lng, level, callback) {
      // console.log("adcode", adcode);
      console.log("switch2AreaNode", adcode, lat, lng, level);
      if (
        this.currentAreaNode &&
        "" + this.currentAreaNode.getAdcode() === "" + adcode
      ) {
        return;
      }
      this.loadAreaNode(adcode, (error, areaNode) => {
        if (error) {
          if (callback) {
            callback(error);
          }
          return;
        }
        this.currentAreaNode = areaNode;
        // 设置当前使用的定位用节点
        this.districtExplorer.setAreaNodesForLocating([this.currentAreaNode]);
        this.refreshAreaNode(areaNode, level);
        if (this.isChange) {
          this.amap.setZoomAndCenter(20, [lat, lng]);
          this.isChange = false;
        }
        if (callback) {
          callback(null, areaNode);
        }
      });
      // this.setPrism(level);
    },
    // 加载区域
    loadAreaNode(adcode, callback) {
      this.districtExplorer.loadAreaNode(adcode, (error, areaNode) => {
        if (error) {
          if (callback) {
            callback(error);
          }
          window.console.error(error);
          return;
        }
        if (callback) {
          callback(null, areaNode);
        }
      });
    },
    // 点标记
    seaPoint() {
      for (let index = 0; index < citys.length; index++) {
        const city = citys[index];
        this.marker = new AMap.Marker({
          position: city.lnglat, // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          title: city.name,
          icon: "//vdata.amap.com/icons/b18/1/2.png",
          // icon:'https://s3.ax1x.com/2021/01/18/syBxTH.gif'
        });
        // 显示卡片
        AMap.event.addListener(this.marker, "click", (city) => {
          // alert(`经度, ${city.lnglat.lat}, 纬度, ${city.lnglat.lng}`);
          console.log("经度", city.lnglat.lat, "纬度", city.lnglat.lng);
          // 通过经纬度查询点位的信息
          const data = {
            lat: city.lnglat.lat,
            lng: city.lnglat.lng,
          };
          this.searchPoint();
          this.$store.commit("SET_CARDSHOW", true);
          this.$store.commit("SET_NATIONWIDE", true);
        });
        this.amap.add(this.marker);
      }
    },
    // 移除点标记
    removePoint() {
      this.amap.clearMap();
    },
    // 两边的信息消失，展示区域信息，以及全国汇总信息
    showAreaInfo() {
      console.log(" 两边的信息消失，展示区域信息，以及全国汇总信息");
      this.$store.commit("SET_NATIONWIDE", true);
    },
    // 通过经纬度查询点位的信息
    searchPoint(val) {
      console.log(val);
      const unitData = {
        unitName: "杭州市第一高级中学",
        address: "浙江省杭州市萧山区xxxxx路",
        contactName: "李振华",
        contactPhone: "18858490700",
      };
      this.$emit("jinwei", unitData);
      const cabinet = {
        equipmentNo: "30000007",
        cabinetName: "迷你型",
        cabinetNo: "GX000-1608016637972756089",
      };
      this.$emit("cabinet", cabinet);
    },
    // 设置地图的棱柱
    setPrism(val) {
      console.log("setPrism", val);
      let city = val ? val.name : "中国";
      // 设置光照
      this.amap.AmbientLight = new AMap.Lights.AmbientLight([1, 1, 1], 0.5);
      this.amap.DirectionLight = new AMap.Lights.DirectionLight(
        [0, 0, 1],
        [1, 1, 1],
        1
      );
      // let object3Dlayer = new AMap.Object3DLayer();
      this.amap.add(this.object3Dlayer);
      AMap.plugin("AMap.DistrictSearch", () => {
        new AMap.DistrictSearch({
          subdistrict: 0, //返回下一级行政区
          extensions: "all", //返回行政区边界坐标组等具体信息
          level: "city", //查询行政级别为 市
        }).search(city, (status, result) => {
          const bounds = result.districtList[0].boundaries;
          let height = 500000;
          const color = "#00ffff80";

          if (val) {
            if (val.level === "city" || val.level === "province") {
              height = 50000;
              this.prism = new AMap.Object3D.Prism({
                path: bounds,
                height: height,
                color: color,
              });
              this.prism.transparent = true;
              this.object3Dlayer.add(this.prism);
            } else {
              // height = 0;
              // this.object3Dlayer.remove(this.prism);
            }
          } else {
            this.prism = new AMap.Object3D.Prism({
              path: bounds,
              height: height,
              color: color,
            });
            this.prism.transparent = true;
            this.object3Dlayer.add(this.prism);
          }

          // const color = "#0088ffcc"; // rgba
        });
      });
    },
    // 设置地图的柱状图 高德地图本身的
    setHistogram() {
      this.layer = new Loca.ScatterPointLayer({
        map: this.amap,
        eventSupport: true,
      });
      let oldvalue = 0;
      let index = 0;

      setInterval(() => {
        let newHeatGrid = [];
        newHeatGrid = heatGrid.map((item) => {
          const sqr = Math.ceil(Math.random() * 30 + 30);
          // index ++
          // console.log('oldvalue',oldvalue);

          // const sqr = oldvalue*2;
          // console.log('val',val);
          // console.log("val + Number(item.Number)", sqr + Number(item.value)/5);
          // if (oldvalue < item.value) {
          return {
            coord: item.coord,
            // value: sqr + Number(item.value) / 5,
            value: sqr + Number(item.value),
          };
          // }
        });
        newHeatGrid.forEach((v) => {
          oldvalue = Number(v.value);
        });
        // console.log("heatGrid", newHeatGrid);
        const data = [...newHeatGrid];
        this.layer.setData(data, {
          lnglat: "coord",
        });
        this.layer.setOptions({
          // 单位米
          unit: "meter",
          style: {
            // 正多边形半径
            radius: 25000,
            height: {
              key: "value",
              // value: [0, 100000],
              value: [0, 500000],
            },

            color: function(obj) {
              // console.log("obj", obj);
              if (obj.value.value > 5000) {
                return "#DCE872";
              }
              if (obj.value.value > 3000) {
                return "#7CCF98";
              }
              return "#10B3B0";
            },

            opacity: 0.9,
          },
          selectStyle: {
            color: "#fcff19",
            opacity: 0.9,
          },
        });
        this.layer.render();
      }, 1000);
    },
  },

  watch: {
    reContry(val) {
      this.aReContry = val;
      this.switch2AreaNode(100000);
      this.$store.commit("SET_NATIONWIDE", false);
      this.$store.commit("SET_CARDSHOW", false);
      this.removePoint();
      this.setHistogram();
      this.object3Dlayer.remove(this.prism);
      this.setPrism();
    },
    position(val) {
      /**
       * 定位到点位所在市区和定位到点位有冲突，不能同步，只能异步
       */
      this.isChange = true;
      // 经度
      const lat = Number(val[4].split(",")[0].trim());
      // 纬度
      const lng = Number(val[4].split(",")[1].trim());
      this.$store.commit("SET_CARDSHOW", true);
      this.$store.commit("SET_NATIONWIDE", true);
      this.$store.commit("SET_SHOWERRORTABLE", false);
      const data = {
        lat,
        lng,
      };
      this.searchPoint(data);
      // 定位到点位的所在市区
      this.switch2AreaNode(330104, lat, lng);
      // 同时设置地图层级与中心点，定位到点位
      // this.amap.setZoomAndCenter(20, [lat, lng]);
    },
  },
};
</script>

<style lang="scss">
// @import "../style/middle-map.scss";
@import "../style/background-map.scss";
// h1 {
//   color: #00c1fc80;
//   color: rgb(0, 105, 150);
//   transition: all 1s;
// }
h1 {
  color: #00ffffb4;
}
</style>
