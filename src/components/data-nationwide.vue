<!-- 全国信息展示头部 -->
<template>
  <div id="nationwide">
    <div class="nationwide-info">
      <div class="nationwide-info-item">
        <p class="nationwide-info-item-title orange">设备总量</p>
        <p class="nationwide-info-item-num info">{{ totalNum.equipmentAll }}</p>
      </div>
      <div class="nationwide-info-item">
        <p class="nationwide-info-item-title orange">设备实时在线量</p>
        <p class="nationwide-info-item-num success">
          {{ totalNum.equipmentOnline }}
        </p>
      </div>
      <div class="nationwide-info-item">
        <p class="nationwide-info-item-title orange">设备异常量</p>
        <p class="nationwide-info-item-num error">
          {{ totalNum.equipmentErr }}
        </p>
      </div>
    </div>
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
      },
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {},
  components: {},
};
</script>

<style scoped lang="scss">
#nationwide {
  height: 100%;
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  .nationwide-info {
    display: flex;
    padding: 0px 50px 0px 50px;
    background-color: rgba(87, 87, 87, 0.5);
    box-shadow: 0px 10px 10px rgba(131, 129, 129, 0.562);
    .nationwide-info-item {
      text-align: center;
      margin-right: 20px;
      .nationwide-info-item-title {
        font-size: 20px;
        font-weight: 600;
      }
      .nationwide-info-item-num {
        font-size: 30px;
        font-weight: 700;
      }
    }
  }
}
</style>
