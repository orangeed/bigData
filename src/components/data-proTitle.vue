<!-- 省市区的头部信息 -->
<template>
  <div id="proTitle">
    <div class="proTitle-item">
      <div
        class=" bg-ligra bg-round"
        style="display: flex;width:100%;margin:-8px 0px"
      >
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
    };
  },
  computed: {},
  created() {},
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
  }
}
</style>
