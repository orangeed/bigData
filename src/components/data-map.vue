<template>
  <div id="container" />
</template>
<script>
import AMap from "AMap";
import AMapUI from "AMapUI";
import { citys } from "../utils/city.js";

export default {
  props: {
    reContry: Boolean, // 父组件带有一个返回全国的操作按钮控制
  },
  data() {
    return {
      amap: null,
      districtExplorer: null,
      tipMarker: null,
      $tipMarkerContent: null,
      currentAreaNode: null,
      aReContry: this.reContry,
      mask: null,
      marker: null,
    };
  },
  mounted() {
    this.amap = new AMap.Map("container", {
      mask: this.mask,
      defaultCursor: "pointer",
      center: [103.714129, 38.150339], // 地图中心点
      zooms: [3, 20],
      zoom: 8, // 地图显示的缩放级别
      resizeEnable: true, // 是否监控地图容器尺寸变化
      pitch: 45, // 地图俯仰角度，有效范围 0 度- 83 度
      viewMode: "3D", // 地图模式
      mapStyle: "amap://styles/5b59f9b29bb6261d416ce7b61509c972", // 地图样式
    });

    this.drawArea();
    this.seaPoint();
  },
  methods: {
    // 加载地图事件
    drawArea() {
      AMapUI.load(
        ["ui/geo/DistrictExplorer", "lib/$"],
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
            this.switch2AreaNode(props.adcode);
            this.aReContry = false;
            this.showAreaInfo();
            console.log("props.level", props.level);
            // if (props.level === "province") {
            // }
          });
          // 全国
          this.switch2AreaNode(100000);
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
          fillOpacity: isHover ? 0.5 : 0,
        });
      });
    },
    // 绘制某个区域的边界
    renderAreaPolygons(areaNode) {
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
        return {
          cursor: "default",
          bubble: true,
          strokeColor: "#fff", // 线颜色
          strokeOpacity: 0.4, // 线透明度
          strokeWeight: 1, // 线宽
          fillOpacity: 0, // 填充透明度
        };
      });
      // 绘制父区域
      this.districtExplorer.renderParentFeature(areaNode, {
        cursor: "default",
        bubble: true,
        strokeColor: "#fff", // 线颜色
        strokeOpacity: 1, // 线透明度
        strokeWeight: 1, // 线宽
        fillOpacity: 0, // 填充透明度
      });
    },
    // 切换区域后刷新显示内容
    refreshAreaNode(areaNode) {
      console.log("areaNode", areaNode);
      this.districtExplorer.setHoverFeature(null);
      this.renderAreaPolygons(areaNode);
    },
    // 切换区域
    switch2AreaNode(adcode, callback) {
      console.log("adcode", adcode);
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
        this.refreshAreaNode(areaNode);
        if (callback) {
          callback(null, areaNode);
        }
      });
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
    // 点坐标
    seaPoint() {
      for (let index = 0; index < citys.length; index++) {
        const city = citys[index];
        this.marker = new AMap.Marker({
          position: city.lnglat, // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          title: city.name,
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
          this.$store.commit("SET_CARDSHOW", true);
          this.$store.commit("SET_NATIONWIDE", true);
        });
        this.amap.add(this.marker);
      }
    },
    // 两边的信息消失，展示区域信息，以及全国汇总信息
    showAreaInfo() {
      console.log(" 两边的信息消失，展示区域信息，以及全国汇总信息");
      this.$store.commit("SET_NATIONWIDE", true);
    },
  },
  watch: {
    reContry(val) {
      this.aReContry = val;
      this.switch2AreaNode(100000);
      this.$store.commit("SET_NATIONWIDE", false);
      this.$store.commit("SET_CARDSHOW", false);
    },
  },
};
</script>

<style lang="scss">
// @import "../style/middle-map.scss";
@import "../style/background-map.scss";
</style>
