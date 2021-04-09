<!-- 以地图作为背景的首页 -->
<template>
  <div id="data-view">
    <dv-full-screen-container>
      <dv-loading v-if="loading">Loading...</dv-loading>
      <div v-else class="bgmap">
        <!-- 高德地图 -->
        <dataMap
          :re-contry="reContry"
          @jinwei="jinwei"
          @cabinet="cabinet"
          :position="positionInfo"
          :adcode="adcode"
          :whichClick="$store.getters.whichClick"
        />
        <!-- 百度地图 -->
        <!-- <dataMapBaidu
          :re-contry="reContry"
          @jinwei="jinwei"
          @cabinet="cabinet"
          :position="positionInfo"
        /> -->
        <!-- echatrs地图 -->
        <!-- <echartsMap
          :re-contry="reContry"
          @jinwei="jinwei"
          @cabinet="cabinet"
          :position="positionInfo"
        /> -->
        <div class="top"><top /></div>
        <!-- 左边信息 -->
        <div
          :class="!$store.getters.nationwide ? 'fadein left' : 'fadeout left'"
          v-show="!$store.getters.nationwide"
        >
          <left @enterMap="enterMap" />
        </div>
        <!-- 底部数据统计 -->
        <div
          :class="
            !$store.getters.nationwide ? 'fadein bottom' : 'fadeout bottom'
          "
          v-show="!$store.getters.nationwide"
        >
          <bottom />
        </div>
        <!-- 省市区头部展示数据 -->
        <!-- <div
          :class="
            $store.getters.nationwide ? 'fadein pro-title' : 'fadeout pro-title'
          "
          v-show="$store.getters.nationwide"
        >
          <proTitle />
        </div> -->
        <!-- 右边展示信息 -->
        <div
          class="right"
          :class="!$store.getters.nationwide ? 'fadein' : 'fadeout'"
          v-show="!$store.getters.nationwide"
        >
          <right />
          <!-- <button class="btn" @click="returnCountry">返回全国</button>
          <button class="changeModuleOptions" @click="changeModuleOptions">
            选择展示项
          </button> -->
        </div>
        <!-- <button
          class="returnCountry"
          @click="returnCountry"
          v-show="$store.getters.nationwide"
        >
          返回全国
        </button> -->
        <!-- 单位信息的卡片 -->
        <div
          :class="
            $store.getters.cardShow ? 'fadein unit-card' : 'fadeout unit-card'
          "
          v-show="$store.getters.cardShow"
        >
          <card :info="info" />
        </div>
        <!-- 设备信息的卡片 -->
        <div
          :class="
            $store.getters.cardShow
              ? 'fadein cabinet-card'
              : 'fadeout cabinet-card'
          "
          v-show="$store.getters.cardShow"
        >
          <card :info="cabinetInfo" />
        </div>
        <!-- 设备异常信息表格 -->
        <errorTable
          class="errorTable"
          v-if="$store.getters.showErrorTable"
          @position="position"
        />
        <!-- 展示项选择面板 -->
        <moduleOptions
          :class="
            $store.getters.showModuleOptions
              ? 'moduleOptions fadein'
              : 'moduleOptions fadeout'
          "
          v-show="$store.getters.showModuleOptions"
        />
        <!-- 首页展示的设备基本信息 -->
        <!-- v-show="!$store.getters.nationwide" -->
        <indexNationWide
          class="nationwide fadein"
          @returnCountry="returnCountry"
          v-show="!$store.getters.isErrorDetails"
        />
        <!-- 按钮 -->
        <div class="btn-grounp">
          <div class="btn" @click="returnCountry">返回全国</div>
          <div
            v-show="!$store.getters.nationwide"
            class="changeModuleOptions"
            @click="changeModuleOptions"
          >
            选择展示项
          </div>
          <div
            class="jinggao"
            v-show="!$store.getters.nationwide"
            @click="showError"
          >
            设备异常表
            <!-- <svgIcon icon-style="icon" icon-class="icon-jinggao" />
            <span class="error-number">50</span> -->
          </div>
        </div>
      </div>
    </dv-full-screen-container>
  </div>
</template>

<script>
import top from "@/components/data-top.vue";
import dataMap from "@/components/data-map.vue";
// import dataMapBaidu from "@/components/data-mapBaidu.vue";
// import echartsMap from "@/components/data-echarts-map.vue";
import left from "@/components/data-left.vue";
import right from "@/components/data-right.vue";
import bottom from "@/components/data-bottom.vue";
import notice from "@/components/data-notice.vue";
// import chinaMap from "@/components/data-chinaMap.vue";
import proTitle from "../components/data-proTitle.vue";
import card from "../components/data-card.vue";
import errorTable from "../components/data-errorTable.vue";
import moduleOptions from "../components/data-moduleOptions.vue";
import indexNationWide from "../components/data-indexNationWide.vue";

export default {
  props: {},
  data() {
    return {
      loading: true,
      reContry: true,
      info: {},
      cabinetInfo: {},
      positionInfo: [],
      adcode: "", //区域编码
    };
  },
  computed: {},
  created() {
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  },
  mounted() {},
  watch: {},
  methods: {
    returnCountry(val) {
      // console.log(val);
      // this.reContry = val
      if (this.$store.getters.adcode == 100000) {
        return false;
      }
      this.reContry = true;
      setTimeout(() => {
        this.reContry = false;
        this.$store.commit("SET_SHOWERRORTABLE", false);
      }, 500);
    },
    jinwei(data) {
      console.log("data", data);
      this.info = data;
    },
    cabinet(data) {
      console.log("data", data);
      this.cabinetInfo = data;
    },
    // 获取异常设备的数据
    position(val) {
      console.log("position", val);
      this.positionInfo = [...val.row];
      this.$store.commit("SET_ERRORDETAILS", true);
    },
    // 显示展示项
    changeModuleOptions() {
      if (this.$store.getters.showModuleOptions) {
        this.$store.commit("SET_SHOWMODULEOPTIONS", false);
        return;
      }
      this.$store.commit("SET_SHOWMODULEOPTIONS", true);
    },
    // 点击省份单位数量统计进入地图
    enterMap(val) {
      // alert(`这个是省市区的排名的点击事件${JSON.stringify(val)}`);
      this.adcode = val.adcode;
      // this.$store.commit("SET_ERRORDETAILS", true);
      // this.position()
    },
    // 显示异常设备信息
    showError() {
      const showErrorTable = this.$store.getters.showErrorTable;
      if (showErrorTable) {
        this.$store.commit("SET_SHOWERRORTABLE", false);
        return;
      }
      this.$store.commit("SET_SHOWERRORTABLE", true);
    },
  },
  components: {
    top,
    dataMap,
    // dataMapBaidu,
    // echartsMap,
    left,
    right,
    bottom,
    notice,
    // chinaMap,
    proTitle,
    card,
    errorTable,
    moduleOptions,
    indexNationWide,
  },
};
</script>

<style scoped lang="scss">
@import "../style/color.scss";

#data-view {
  width: 100%;
  height: 100%;
  background-color: #010b46;
  color: #fff;
  #dv-full-screen-container {
    // background-image: url("../assets/bg.png");
    // background-image: radial-gradient(#031d72, #010b46);
    background-size: 100% 100%;
    // box-shadow: 0 0 3px blue;
    display: flex;
    flex-direction: column;
    .bgmap {
      position: relative;
      // display: flex;
      .left {
        position: absolute;
        flex: 1;
        min-width: 27%;
        height: calc(100vh - 40px);
        // left: 0;
        top: 3%;
      }
      .top {
        position: absolute;
        top: 0;
        width: 100%;
      }
      .bottom {
        position: absolute;
        transform: translateX(52%);
        // flex: 1;
        width: 50%;
        bottom: 4px;
        // bottom: -50px;
      }
      .right {
        position: absolute;
        height: calc(100vh - 40px);
        // flex: 1;
        // right: -60px;
        right: 30px;
        top: 3%;
        z-index: 2;
      }
      .right-botton {
        position: absolute;
        right: 0;
        // top:65%;
        bottom: -40px;
        flex: 1;
      }
      .btn-grounp {
        position: absolute;
        top: 0;
        right: 0;
        .btn {
          position: absolute;
          // display: flex;
          // flex-direction: column;
          // float: ;
          // bottom: 16px;
          // right: 400px;
          right: 25vw;
          // top: 200px;
          top: 100px;
          // margin: -60px 0px 30px 30px;
          // margin-left: 30px;
          height: 38px;
          width: 92px;
          // width: 100%;
          // height: 100%;
          // background-color: $color-btn;
          background-image: url("../assets/border/2/2_04.png");
          color: $color-white;
          border: none;
          // border-radius: 30px;
          outline: none;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          // &:active {
          //   background-color: $color-orange;
          // }
        }
      }

      .changeModuleOptions {
        @extend .btn;
        background-image: url("../assets/border/2/2_23.png") !important;
        top: 160px !important;
      }
      .jinggao {
        @extend .btn;
        // background: none !important;
        background-image: url("../assets/border/2/2_23.png") !important;

        top: 220px !important;
        // font-size: 40px;
        .error-number {
          // font-size: 20px;
          margin-top: 10px;
          color: $color-error;
        }
      }
      .nationwide {
        position: absolute;
        top: 8%;
        // width: 100%;
        // transform: translateX(155%);
        // display: flex;
        // justify-content: center;
        // align-items: center;
      }
      .pro-title {
        @extend .nationwide;
        transform: translateX(155%);
      }
      .returnCountry {
        // position: absolute;
        bottom: 0px;
        right: 330px;
        @extend .btn;
      }
      .unit-card {
        position: absolute;
        height: 20%;
        width: 20%;
        text-align: center;
        top: 30%;
        left: 16%;
      }
      .cabinet-card {
        position: absolute;
        height: 20%;
        width: 20%;
        text-align: center;
        top: 60%;
        left: 40%;
      }
      .errorTable {
        position: absolute;
        top: 0;
        left: 0;
        transform: translate(62%, 40%);
        // top: calc(50% - 400px);
        // left: calc(50% - 100px);
      }
      .moduleOptions {
        position: absolute;
        top: 0;
        width: 660px;
        height: 460px;
        transform: translate(90%, 62%);
      }
    }
  }
}
</style>
