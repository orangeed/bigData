<!-- 卡片 -->
<template>
  <div id="card">
    <div v-if="info.unitName" class="card-item bg-ligra bg-round">
      <p>单位名称：{{ info.unitName }}</p>
      <p>单位地址：{{ info.address }}</p>
      <p>单位负责人：{{ info.contactName }}</p>
      <p>联系方式：{{ info.contactPhone }}</p>
    </div>
    <div v-if="info.equipmentNo" class="card-item bg-ligra bg-round">
      <p>设备序列号：{{ info.equipmentNo }}</p>
      <p>柜子类型：{{ info.cabinetName }}</p>
      <p>柜子序列号：{{ info.cabinetNo }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  computed: {},
  created() {
    console.log(this.info);
  },
  mounted() {},
  watch: {},
  methods: {},
  components: {},
};
</script>

<style scoped lang="scss">
#card {
  width: 100%;
  height: 100%;
  // background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 10px solid transparent;
  border-image: url("../assets/border/4/4_03.png") 10;
  .card-item {
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    background-color: rgba(0, 20, 33, 0.8);
    margin: 0;
    p {
      margin: 10px 0px;
    }
  }
}
</style>
