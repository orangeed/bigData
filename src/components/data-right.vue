<!-- 右边信息展示 -->
<template>
  <div class="right-info">
    <!-- s设备类型信息 -->
    <ring class="fadein" v-show="$store.getters.moduleOptions.deviceTypeInfo" />
    <!-- 抽屉状态 -->
    <pictorialBar class="fadein" v-if="$store.getters.moduleOptions.drawersNumber"/>
    <!-- 抽屉操作次数 -->
    <operatingSituation class="fadein" v-show="$store.getters.moduleOptions.documentOperation"/>
    <!-- 催缴 -->
    <call class="fadein" v-show="$store.getters.moduleOptions.callDistribution"/>
  </div>
</template>

<script>
import ring from "./data-ring";
import pictorialBar from "./data-PictorialBar";
import operatingSituation from "./data-operatingSituation";
import call from "./data-call";
export default {
  props: {},
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {},
  components: { ring, pictorialBar, operatingSituation, call },
};
</script>

<style scoped lang="scss">
.right-info {
  // width: 80%;
  position: relative;
  margin: 20px 0px 0px 20px;
}
</style>
