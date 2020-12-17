<!-- 卡片 -->
<template>
  <div id="card">
    <p>单位名称：{{ info.unitName }}</p>
    <p>单位地址：{{ info.address }}</p>
    <p>单位负责人：{{ info.contactName }}</p>
    <p>联系方式：{{ info.contactPhone }}</p>
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
  // position: absolute;
  // top: 0;
  // left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
}
</style>
