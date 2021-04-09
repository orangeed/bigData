<!-- 省市区的头部信息 -->
<template>
  <div id="proTitle">
    <div
      :class="
        !$store.getters.isErrorDetails ? 'proTitle-item' : 'proTitle-item tra'
      "
    >
      <div class="bgc bg-ligra bg-round" v-if="!$store.getters.isErrorDetails">
        <div class="nationwide-info-item">
          <p class="nationwide-info-item-title">设备总量</p>
          <p class="nationwide-info-item-num blue">
            {{ totalNum.equipmentAll }}
          </p>
        </div>
        <div class="nationwide-info-item">
          <p class="nationwide-info-item-title">设备实时在线量</p>
          <p class="nationwide-info-item-num text1">
            {{ totalNum.equipmentOnline }}
          </p>
        </div>
        <div
          class="nationwide-info-item"
          @click="dangerInfo"
          style="cursor: pointer;"
        >
          <p class="nationwide-info-item-title">
            设备异常量<svgIcon
              icon-style="icon"
              icon-class="icon-gaojing"
              style="font-size:16px"
            />
          </p>
          <p class="nationwide-info-item-num danger">
            {{ totalNum.equipmentErr }}
          </p>
        </div>
      </div>
      <div class="bgc bg-ligra bg-round errorInfo" v-else>
        <p>
          <span>设备异常原因：</span>
          <span class="danger">闪电发货SDK峰会上开发设备异常原因</span>
        </p>
      </div>
    </div>
    <!-- <errorTable/> -->
  </div>
</template>

<script>
// import errorTable from '../components/data-errorTable.vue'
export default {
  props: {},
  data() {
    return {
      totalNum: {
        equipmentAll: 234567893,
        equipmentOnline: 4154,
        equipmentErr: 4548,
      },
      adcode: this.$store.getters.adcode,
    };
  },
  computed: {},
  created() {
   
  },
  mounted() {},
  watch: {},
  methods: {
    dangerInfo() {
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
#proTitle {
  .proTitle-item {
    border: 23px solid transparent;
    border-image: url("../assets/border/4/4_03.png") 23;
    // background-color: rgba(0, 20, 33, 0.8);
    border-radius: 16px;

    .nationwide-info-item {
      text-align: center;
      width: 100%;
      padding: 0px 20px;
      .nationwide-info-item-title {
        font-size: 14px;
        min-width: 100px;
        width: 100%;
      }
      .nationwide-info-item-num {
        font-size: 20px;
        // font-weight: 700;
      }
    }
    .errorInfo {
      width: 355px !important;
      height: 127px;
      word-wrap: break-word;
      word-break: break-all;
      overflow: hidden; /*这个参数根据需要来绝对要不要*/
      padding: 0px 10px;
      display: flex;
      align-items: center;
    }
    .bgc {
      background-color: rgba(0, 20, 33, 0.8);
      display: flex;
      width: 100%;
      margin: -8px 0px;
    }
  }
  .tra {
    transform: translateX(22%) !important;
    text-align: center;
  }
}
</style>
