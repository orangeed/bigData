<!-- 首页展示的设备基本信息 -->
<template>
  <div id="nationwide" v-if='$store.getters.moduleOptions.deviceStatistics'>
    <div class="nationwide-info ">
      <div class="el-title">
        <p>设备统计信息</p>
      </div>
      <div class="nationwide-info-item bg-ligra">
        <p class="nationwide-info-item-title ">设备数量</p>
        <p class="nationwide-info-item-num text1">
          {{ totalNum.equipmentAll }}
        </p>
      </div>

      <div class="nationwide-info-item bg-ligra">
        <p class="nationwide-info-item-title ">设备实时在线量</p>
        <p class="nationwide-info-item-num blue">
          {{ totalNum.equipmentOnline }}
        </p>
      </div>

      <div class="nationwide-info-item bg-ligra">
        <p class="nationwide-info-item-title ">设备在线率</p>
        <p class="nationwide-info-item-num blue">
          100%
        </p>
      </div>

      <div
        :class="
          $store.getters.showErrorTable
            ? 'nationwide-info-item bg-ligra border'
            : 'nationwide-info-item bg-ligra'
        "
        style="cursor: pointer;"
        @click="showError"
      >
        <p class="nationwide-info-item-title ">设备异常量</p>
        <p class="nationwide-info-item-num danger">
          {{ totalNum.equipmentErr }}
        </p>
        <img v-show="$store.getters.showErrorTable" src="../assets/border/2/2_68.png" alt="" />
      </div>
    </div>
    <!-- <div class="btn-grounp">
      <button class="btn" @click="returnCountry">返回全国</button>
      <button class="changeModuleOptions" @click="changeModuleOptions">
        选择展示项
      </button>
    </div> -->
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      totalNum: {
        equipmentAll: 234567893,
        equipmentOnline: 4154,
        equipmentErr: 4548,
        reContry: true,
      },
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    // 返回全国
    returnCountry() {
      this.reContry = true;
      setTimeout(() => {
        this.reContry = false;
        this.$store.commit("SET_SHOWERRORTABLE", false);
        this.$emit("returnCountry", this.reContry);
      }, 500);
    },
    // 显示展示项
    changeModuleOptions() {
      if (this.$store.getters.showModuleOptions) {
        this.$store.commit("SET_SHOWMODULEOPTIONS", false);
        return;
      }
      this.$store.commit("SET_SHOWMODULEOPTIONS", true);
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
  components: {},
};
</script>

<style scoped lang="scss">
#nationwide {
  //   height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  right: 50px;
  .nationwide-info {
    .el-title {
      position: absolute;
      top: -26px;
      font-size: 16px;
      // background-color: red;
      p {
        // height: 30px;
        height: 0px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    border: 23px solid transparent;
    border-image: url("../assets/border/1/1_09.png") 23;
    display: flex;
    padding: 6px 50px 0px 0px;
    position: relative;
    // box-shadow: 0px 10px 10px rgba(131, 129, 129, 0.562);
    .nationwide-info-item {
      //   flex: 1;
      min-width: 156px;
      height: 70px;
      text-align: center;
      margin-right: 20px;
      transform: translateX(20%);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      position: relative;
      .nationwide-info-item-title {
        font-size: 14px;
        font-weight: 600;
        margin: -3px 7px 11px 7px;
      }
      .nationwide-info-item-num {
        font-size: 20px;
        font-weight: 700;
        margin: 0;
      }
      img {
        position: absolute;
        bottom: -25px;
      }
    }
  }
  .border {
    border: 1px solid #f7931e;
    // border-bottom: ;
    box-sizing: border-box;
    position: relative;
    &::before {
      content: "";
      display: block;
      width: 25%;
      height: 1px;
      position: absolute;
      left: 37.5%;
      top: 68px;
      background-color: #002f3a;
      // background-color: red;
    }
    // &::after {
    //   // content: "";
    //   position: absolute;
    //   // width: 0;
    //   // height: 0;
    //   // left: 0;
    //   top: 69px;
    //   border-left: 30px solid transparent;
    //   border-right: 30px solid transparent;
    //   border-top: 30px solid #f7931e;
    // }
  }
}
</style>
