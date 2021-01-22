<!-- 数字变化组件 -->
<template>
  <div id="numberChange">
    <countTo
      class="countTo"
      :style="{ color: textColor.color }"
      :suffix="_suffix"
      v-bind="$attrs"
    ></countTo>
  </div>
</template>

<script>
import countTo from "vue-count-to";

export default {
  props: {
    textColor: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      setSuffix: "个",
    };
  },
  computed: {
    _suffix() {
      return this.setSuffix;
    },
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {},
  components: { countTo },
};
</script>

<style lang="scss">
#numberChange {
  .countTo {
    display: flex;
    justify-content: center;
    font-size: 20px;
  }
}
</style>
