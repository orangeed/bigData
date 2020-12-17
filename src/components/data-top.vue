<!-- 头部 -->
<template>
  <div>
    <div class="main-header">
      <div class="mh-left"></div>
      <div class="mh-middle">
        证件柜大数据展示平台
        <dv-decoration-5 style="width: 1000px; height: 40px" :dur="3" />
      </div>
      <div class="mh-right">
        <!-- <dv-border-box-2
          style="
            width: 120px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            margin-left: 200px;
          "
        >
          证件柜展示
        </dv-border-box-2> -->
      </div>
    </div>

  </div>
</template>

<script>
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
  components: {},
};
</script>

<style scoped lang="scss">
.main-header {
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  .mh-left {
    font-size: 20px;
    color: rgb(1, 134, 187);

    a:visited {
      color: rgb(1, 134, 187);
    }
  }

  .mh-middle {
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .mh-left,
  .mh-right {
    width: 450px;
  }
}
</style>
