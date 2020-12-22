<!-- 以地图作为背景的首页 -->
<template>
  <div id="data-view">
    <dv-full-screen-container>
      <dv-loading v-if="loading">Loading...</dv-loading>
      <div v-else class="bgmap">
        <dataMap
          :re-contry="reContry"
          @jinwei="jinwei"
          @cabinet="cabinet"
          :position="positionInfo"
        />
        <div class="top"><top /></div>
        <div
          :class="!$store.getters.nationwide ? 'fadein left' : 'fadeout left'"
          v-show="!$store.getters.nationwide"
        >
          <left />
        </div>
        <div
          :class="
            !$store.getters.nationwide ? 'fadein bottom' : 'fadeout bottom'
          "
          v-show="!$store.getters.nationwide"
        >
          <bottom />
        </div>
        <div
          :class="
            $store.getters.nationwide
              ? 'fadein nationwide'
              : 'fadeout nationwide'
          "
          v-show="$store.getters.nationwide"
        >
          <nationwide />
        </div>
        <div
          class="right"
          :class="!$store.getters.nationwide ? 'fadein' : 'fadeout'"
          v-show="!$store.getters.nationwide"
        >
          <right />
          <button class="btn" @click="returnCountry">返回全国</button>
          <button class="changeModuleOptions" @click="changeModuleOptions">
            选择展示项
          </button>
        </div>
        <button
          class="returnCountry"
          @click="returnCountry"
          v-show="$store.getters.nationwide"
        >
          返回全国
        </button>
        <div
          :class="
            $store.getters.cardShow ? 'fadein unit-card' : 'fadeout unit-card'
          "
          v-show="$store.getters.cardShow"
        >
          <card :info="info" />
        </div>
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
        <moduleOptions v-if="$store.getters.showModuleOptions" />
      </div>
    </dv-full-screen-container>
  </div>
</template>

<script>
import top from "@/components/data-top.vue";
import dataMap from "@/components/data-map.vue";
import left from "@/components/data-left.vue";
import right from "@/components/data-right.vue";
import bottom from "@/components/data-bottom.vue";
import notice from "@/components/data-notice.vue";
import chinaMap from "@/components/data-chinaMap.vue";
import nationwide from "../components/data-nationwide.vue";
import card from "../components/data-card.vue";
import errorTable from "../components/data-errorTable.vue";
import moduleOptions from "../components/data-moduleOptions.vue";

export default {
  props: {},
  data() {
    return {
      loading: true,
      reContry: true,
      info: {},
      cabinetInfo: {},
      positionInfo: [],
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
    returnCountry() {
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
    },
    // 显示展示项
    changeModuleOptions() {
      if (this.$store.getters.showModuleOptions) {
        this.$store.commit("SET_SHOWMODULEOPTIONS", false);
        return;
      }
      this.$store.commit("SET_SHOWMODULEOPTIONS", true);
    },
  },
  components: {
    top,
    dataMap,
    left,
    right,
    bottom,
    notice,
    chinaMap,
    nationwide,
    card,
    errorTable,
    moduleOptions,
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
      display: flex;
      .left {
        position: absolute;
        flex: 1;
        height: calc(100vh - 40px);
        left: 0;
        top: 5%;
      }
      .top {
        position: absolute;
        top: 0;
        width: 100%;
      }
      .bottom {
        position: absolute;
        transform: translateX(50%);
        // flex: 1;
        width: 50%;
        bottom: -50px;
      }
      .right {
        position: absolute;
        height: calc(100vh - 40px);
        flex: 1;
        right: -60px;
        top: 5%;
      }
      .right-botton {
        position: absolute;
        right: 0;
        // top:65%;
        bottom: -40px;
        flex: 1;
      }
      .btn {
        position: absolute;
        bottom: 16px;
        right: 390px;
        margin: -60px 0px 30px 30px;
        // margin-left: 30px;
        height: 30px;
        width: 100px;
        background-color: $color-btn;
        color: $color-white;
        border: none;
        border-radius: 30px;
        outline: none;
        cursor: pointer;
        &:active {
          background-color: $color-orange;
        }
      }
      .changeModuleOptions {
        @extend .btn;
        right: 200px;
      }
      .nationwide {
        position: absolute;
        top: 10%;
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
        top: 20%;
        left: 10%;
      }
      .cabinet-card {
        position: absolute;
        height: 20%;
        width: 20%;
        text-align: center;
        top: 20%;
        right: 10%;
      }
      .errorTable {
        position: absolute;
        top: calc(50% - 400px);
        left: calc(50% - 100px);
      }
    }
  }
}
</style>
