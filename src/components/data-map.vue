<!-- 高德地图 -->
<template>
  <div id="container" ref="container" />
</template>
<script>
import AMap from "AMap";
import AMapUI from "AMapUI";
// import echarts from "echarts";
// import 'echarts-gl'

import { citys } from "../utils/city.js";
import { heatGrid } from "../utils/gard.js";
import { heatmapLayer } from "../utils/test.js";
import { openInfoWin } from "../utils/utils.js";
import { pointInfo, pointInfoDetal } from "../api/point";
import {
  heatMapDeviceAll,
  heatMapDeviceOnline,
  heatMapDeviceError,
} from "../api/heatMap";

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
    adcode: {
      type: String,
      default: "",
    },
    whichClick: {
      type: Number,
      default: 1,
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
      // object3Dlayer: new AMap.Object3DLayer(),
      prism: null,
      infoWindow: null,
      routeFeatures: [],
      colors: ["#ADB6C1"],
      index: 0,
      level: null,
      whichClickData: this.whichClick,
      features: [],
    };
  },
  mounted() {
    this.amap = new AMap.Map("container", {
      defaultCursor: "pointer",
      center: [103.714129, 35.150339], // 地图中心点
      // zooms: [3, 20],
      zoom: 4.5, // 地图显示的缩放级别
      resizeEnable: true, // 是否监控地图容器尺寸变化
      pitch: 45, // 地图俯仰角度，有效范围 0 度- 83 度
      viewMode: "3D", // 地图模式
      mapStyle: "amap://styles/5b59f9b29bb6261d416ce7b61509c972", // 地图样式
    });
    this.drawArea();
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
            this.level = props.level;
            this.$store.commit("SET_ADCODE", props.adcode);
            console.log("adcode", this.$store.getters.adcode);
            this.switch2AreaNode(props.adcode, 0, 0, props.level);
            this.aReContry = false;
            if (props.level == "district") {
              this.showAreaInfo();
              this.$store.commit("SET_SHOWERRORTABLE", false);
              this.$store.commit("SET_SHOWMODULEOPTIONS", false);
              this.$store.commit("SET_ERRORDETAILS", false);
            }
            this.amap.clearMap();
            this.seaPoint();
            // this.layer.setMap(null);
            // this.object3Dlayer.remove(this.prism);
            // this.setPrism(props);
          });
          // 外部区域被点击
          this.districtExplorer.on("outsideClick", (e) => {
            this.districtExplorer.locatePosition(
              e.originalEvent.lnglat,
              (error, routeFeatures) => {
                if (routeFeatures && routeFeatures.length > 1) {
                  // 切换到省级区域
                  this.switch2AreaNode(routeFeatures[1].properties.adcode);
                } else {
                  // 切换到全国

                  this.$nextTick(() => {
                    if (this.$store.getters.adcode == 100000) {
                      return false;
                    }
                    this.aReContry = true;
                    this.switch2AreaNode(100000);
                    this.$store.commit("SET_ADCODE", 100000);
                    this.$store.commit("SET_NATIONWIDE", false);
                    this.$store.commit("SET_CARDSHOW", false);
                    this.removePoint();
                    this.showNolInfo();
                    this.showErrorInfo();
                  });
                }
              },
              {
                levelLimit: 2,
              }
            );
          });

          // 地图缩放
          // this.amap.on("zoomchange", () => {
          //   this.$nextTick(() => {
          //     this.removePoint();
          //   });
          // });
          // 全国
          this.switch2AreaNode(100000);
          this.setFlyLine();

          // this.setPrism();

          this.showNolInfo();
          this.showErrorInfo();
          this.setHeatmapLayer();
          // setTimeout(() => {
          // this.setGIFHight();
          // }, 3000);

          // this.seaPoint();

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
          fillOpacity: isHover ? 1 : 0.5,
        });
      });
    },
    // 绘制某个区域的边界
    renderAreaPolygons(areaNode, level) {
      // console.log("areaNode", areaNode);
      // console.log("level", level);
      console.log("aReContry", this.aReContry);
      // 更新地图视野
      if (!this.aReContry) {
        this.amap.setBounds(areaNode.getBounds(), null, null, true);
      } else {
        this.amap.setZoom(4.5);
        // this.amap.setCenter(new AMap.LngLat(103.714129, 38.150339));
        this.amap.setCenter(new AMap.LngLat(103.714129, 35.150339));
      }
      // 清除已有的绘制内容
      this.districtExplorer.clearFeaturePolygons();
      // 绘制子区域
      this.districtExplorer.renderSubFeatures(areaNode, (feature, i) => {
        const fillColor = this.colors[i % this.colors.length];
        // var strokeColor = colors[colors.length - 1 - (i % colors.length)];
        return {
          cursor: "default",
          bubble: true,
          strokeColor: "#fff", // 线颜色
          strokeOpacity: 1, // 线透明度
          strokeWeight: 1, // 线宽
          fillOpacity: 0.35, // 填充透明度
          // fillColor: "#00c1fc", // 填充子区域的背景色
          fillColor: fillColor,
          // 66edff
        };
      });
      // 绘制父区域
      this.districtExplorer.renderParentFeature(areaNode, {
        // cursor: "default",
        bubble: true,
        strokeColor: "#fff", // 线颜色
        strokeOpacity: areaNode.adcode == "100000" ? 0 : 1, // 线透明度
        // strokeOpacity:0,
        strokeWeight: 1, // 线宽
        fillOpacity: level !== "district" ? 0.35 : 0, // 填充透明度
        // fillOpacity: 1,
        // fillColor: "#006996",
        fillColor: areaNode.getSubFeatures().length ? null : this.colors[0], //填充色
        // fillColor: "#fff",
      });
    },
    // 切换区域后刷新显示内容
    refreshAreaNode(areaNode, level) {
      this.districtExplorer.setHoverFeature(null);
      this.renderAreaPolygons(areaNode, level);
    },
    // 切换区域
    switch2AreaNode(adcode, lat, lng, level, callback) {
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
      const citys = [];
      pointInfo({ area: this.$store.getters.adcode }).then((res) => {
        console.log(res);
        if (res.code === 0 && res.result.list != null) {
          citys = res.result.list;
          for (let index = 0; index < citys.length; index++) {
            const city = citys[index];
            this.marker = new AMap.Marker({
              position: city.lnglat, // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
              title: city.name,
              icon: "//vdata.amap.com/icons/b18/1/2.png",
              // icon:'https://s3.ax1x.com/2021/01/18/syBxTH.gif'
            });
            // 显示卡片
            this.marker.on("click", () => {
              console.log("经度", city.lnglat.lat, "纬度", city.lnglat.lng);
              // 通过经纬度查询点位的信息
              const data = {
                lat: city.lnglat.lat,
                lng: city.lnglat.lng,
              };
              this.searchPoint(city.id);
              this.$store.commit("SET_CARDSHOW", true);
              this.$store.commit("SET_NATIONWIDE", true);
            });
            this.amap.add(this.marker);
          }
        }
      });
    },
    // 移除点标记,清除屏幕
    removePoint() {
      if (this.$store.getters.adcode == 100000) {
        return false;
      }
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
      const unitData = {};
      const cabinet = {};
      pointInfoDetal({ id: val }).then((res) => {
        console.log(res);
        if (res.code === 0) {
          unitData = {
            unitName: res.result.unitName,
            address: res.result.address,
            contactName: res.result.unitPrincipal,
            contactPhone: res.result.contact,
          };
          cabinet = {
            equipmentNo: res.result.deviseSerialNumber,
            cabinetName: res.result.deviceType,
            cabinetNo: res.result.cabinetSerialNumber,
          };
          this.$emit("jinwei", unitData);
          this.$emit("cabinet", cabinet);
        }
      });
    },
    // 设置地图的棱柱
    // setPrism(val) {
    //   console.log("setPrism", val);
    //   let city = val ? val.name : "中国";
    //   // 设置光照
    //   this.amap.AmbientLight = new AMap.Lights.AmbientLight([1, 1, 1], 0.5);
    //   this.amap.DirectionLight = new AMap.Lights.DirectionLight(
    //     [0, 0, 1],
    //     [1, 1, 1],
    //     1
    //   );
    //   this.amap.add(this.object3Dlayer);
    //   AMap.plugin("AMap.DistrictSearch", () => {
    //     new AMap.DistrictSearch({
    //       subdistrict: 0, //返回下一级行政区
    //       extensions: "all", //返回行政区边界坐标组等具体信息
    //       level: "city", //查询行政级别为 市
    //     }).search(city, (status, result) => {
    //       const bounds = result.districtList[0].boundaries;
    //       let height = 500000;
    //       const color = "#00ffff80";

    //       if (val) {
    //         if (val.level === "city" || val.level === "province") {
    //           height = 50000;
    //           this.prism = new AMap.Object3D.Prism({
    //             path: bounds,
    //             height: height,
    //             color: color,
    //           });
    //           this.prism.transparent = true;
    //           this.object3Dlayer.add(this.prism);
    //         } else {
    //           // height = 0;
    //           // this.object3Dlayer.remove(this.prism);
    //         }
    //       } else {
    //         this.prism = new AMap.Object3D.Prism({
    //           path: bounds,
    //           height: height,
    //           color: color,
    //         });
    //         this.prism.transparent = true;
    //         this.object3Dlayer.add(this.prism);
    //       }

    //       // const color = "#0088ffcc"; // rgba
    //     });
    //   });
    // },
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

            color: function (obj) {
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
    // 通过gif柱状图设置设备激活的高度
    setGIFHight() {
      for (let i = 0; i < heatGrid.length; i++) {
        const heatGridItem = heatGrid[i];
        // heatGridItem.coord[1] += 7;
        // console.log("heatGridItem", heatGridItem);
        this.marker = new AMap.Marker({
          position: heatGridItem.coord,
          icon: "https://s3.ax1x.com/2021/02/26/yxwmdO.gif",
        });
        this.amap.add(this.marker);
      }
    },
    // 显示正常激活的信息弹窗
    showNolInfo() {
      // 信息窗体的内容
      // var content = [
      //   "<div style='color:#000'><div><b>集信科技</b>",
      //   "电话 : 010-84107000   邮编 : 100102",
      //   "地址 : 浙江省杭州市江干区</div></div>",
      // ];
      // 创建 infoWindow 实例
      // var infoWindow = new AMap.InfoWindow({
      //   content: content.join("<br>"), //传入 dom 对象，或者 html 字符串
      //   offset: new AMap.Pixel(0, -30),
      // });
      console.log("---", citys[0]);
      this.marker = new AMap.Marker({
        position: citys[0].lnglat, // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        // icon: "//vdata.amap.com/icons/b18/1/2.png",
        // icon:'https://s3.ax1x.com/2021/01/18/syBxTH.gif'
      });

      this.amap.add(this.marker);
      // 打开信息窗体
      // infoWindow.open(this.amap, citys[0].lnglat);
    },
    // 显示异常的信息弹窗
    showErrorInfo() {
      // 信息窗体的内容
      var content = [
        "<div style='color:#000;'><div><b>异常的信息</b>",
        "电话 : 010-84107000   邮编 : 100102",
        "地址 : 陕西省西安市碑林区</div></div>",
      ];
      // 创建 infoWindow 实例
      var infoWindow1 = new AMap.InfoWindow({
        content: content.join("<br>"), //传入 dom 对象，或者 html 字符串
        offset: new AMap.Pixel(0, -30),
      });
      console.log("+++", citys[1]);

      let marker = new AMap.Marker({
        position: [108.948024, 34.263161], // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        // icon: "//vdata.amap.com/icons/b18/1/2.png",
        icon: "https://s3.ax1x.com/2021/01/18/syBxTH.gif",
      });

      this.amap.add(marker);
      // 打开信息窗体
      infoWindow1.open(this.amap, [108.948024, 34.263161]);
    },
    // 根据地理位置信息查询所在地
    searchPosition(address) {
      let geocoder = new AMap.Geocoder({
        city: "全国", //城市设为北京，默认：“全国”
      });
      let marker = new AMap.Marker();
      geocoder.getLocation(address, (status, result) => {
        if (status === "complete" && result.geocodes.length) {
          const lnglat = result.geocodes[0].location;
          marker.setPosition(lnglat);
          // map.add(marker);
          this.amap.setFitView(marker);
        } else {
          console.log("根据地址查询位置失败", status);
          alert("根据地址查询位置失败", status);
        }
      });
    },
    // 飞线图
    setFlyLine() {},
    // 热力图获取数据
    setHeatmapLayer() {
      // 1.获取点击的是哪一个功能
      // let whichClick = this.$store.getters.whichClick;
      const adcode = this.$store.getters.adcode;
      // 2.获取设备数量
      this.features = [];
      switch (this.whichClickData) {
        // 设备总量
        case 1:
          console.log(1);
          heatMapDeviceAll({ area: adcode }).then((res) => {
            if (res.code === 0 && res.result.list != null) {
              res.result.list.forEach((v) => {
                let point = {
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: [
                      Number(v.latlng.split(",")[0].trim()),
                      Number(v.latlng.split(",")[1].trim()),
                    ],
                  },
                  properties: {
                    count: v.count,
                  },
                };
                this.features.push(point);
              });
              this.renderData();
            }
          });
          break;
        // 设备在线量
        case 2:
          console.log(2);
          heatMapDeviceOnline({ area: adcode }).then((res) => {
            if (res.code === 0 && res.result.list != null) {
              res.result.list.forEach((v) => {
                let point = {
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: [
                      Number(v.latlng.split(",")[0].trim()),
                      Number(v.latlng.split(",")[1].trim()),
                    ],
                  },
                  properties: {
                    count: v.count,
                  },
                };
                this.features.push(point);
              });
              this.renderData();
            }
          });
          break;
        // 设备异常量
        case 3:
          console.log(3);
          heatMapDeviceError({ area: adcode }).then((res) => {
            if (res.code === 0 && res.result.list != null) {
              res.result.list.forEach((v) => {
                let point = {
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: [
                      Number(v.latlng.split(",")[0].trim()),
                      Number(v.latlng.split(",")[1].trim()),
                    ],
                  },
                  properties: {
                    count: v.count,
                  },
                };
                this.features.push(point);
              });
              this.renderData();
            }
          });
          break;
        default:
          break;
      }
    },
    // 热力图渲染数据
    renderData() {
      console.log("运行到我了！");
      if (heatmap) {
        heatmap.setMap(null);
      }
      // 3.创建一个画布容器
      let loca = new Loca.Container({
        map: this.amap,
      });
      const geo = new Loca.GeoJSONSource({
        data: {
          type: "FeatureCollection",
          features: this.features,
        },
      });
      let heatmap = new Loca.HeatMapLayer({
        zIndex: 10,
        opacity: 1,
        visible: true,
        zooms: [2, 22],
      });
      // 4.渲染数据
      heatmap.setSource(geo, {
        radius: 20,
        unit: "px",
        height: 90,
        // radius: 10,
        // unit: 'px',
        // height: 10,
        gradient: {
          0.1: "rgba(50,48,118,1)",
          0.2: "rgba(127,60,255,1)",
          0.4: "rgba(166,53,219,1)",
          0.6: "rgba(254,64,95,1)",
          0.8: "rgba(255,98,4,1)",
          1: "rgba(236,220,79,1)",
        },
        value: function (index, feature) {
          return feature.properties.count;
        },
        min: 0,
        max: 10, //4.6
        heightBezier: [0, 0.53, 0.37, 0.98],
      });
      loca.add(heatmap);
    },
  },

  watch: {
    reContry(val) {
      this.removePoint();
      this.$nextTick(() => {
        this.aReContry = true;
        this.switch2AreaNode(100000);
        this.$store.commit("SET_NATIONWIDE", false);
        this.$store.commit("SET_CARDSHOW", false);
        this.$store.commit("SET_ERRORDETAILS", false);
        this.$store.commit("SET_ADCODE", 100000);
        this.showNolInfo();
        this.showErrorInfo();
      });

      // this.setGIFHight();
      // this.setHistogram();
      // this.object3Dlayer.remove(this.prism);
      // this.setPrism();
    },
    position(val) {
      console.log("val", val);
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
      // this.switch2AreaNode(330104, lat, lng);
      this.searchPosition(val[1]);
      // 同时设置地图层级与中心点，定位到点位
      // this.amap.setZoomAndCenter(20, [lat, lng]);
    },
    whichClick(val) {
      this.whichClickData = val;
      console.log("whichClick", this.whichClick);
      if (this.level !== "district") {
        this.setHeatmapLayer();
      }
    },
  },
};
</script>

<style lang="scss">
@import "../style/background-map.scss";
</style>
