<!-- 催缴 -->
<template>
  <div id="call">
    <div class="title-new">
      <span class="title-new-bg">催缴</span>
    </div>
    <!-- <div class="title">省份单位数量统计</div> -->
    <div class="call-item">
      <carouselRanking
        :carouselRanking="provincialData"
        style="height:200px:padding:0;margin:10px 0 0 0"
      />
    </div>
    <div class="line">
      <img src="../assets/border/1/line.png" />
    </div>
  </div>
</template>

<script>
import carouselRanking from "@/components/carouselRanking/data-carouselRanking.vue";

export default {
  props: {},
  data() {
    return {
      // 省份单位数量统计
      provincialData: {
        data: [
          {
            name: "周口",
            value: 111,
          },
          {
            name: "南阳",
            value: 777,
          },
          {
            name: "西峡",
            value: 4545,
          },
          {
            name: "驻马店",
            value: 788,
          },
          {
            name: "新乡",
            value: 234,
          },
          {
            name: "信阳",
            value: 1234,
          },
          {
            name: "漯河",
            value: 29,
          },
          {
            name: "新乡",
            value: 56456,
          },
          {
            name: "信阳",
            value: 4574,
          },
        ],
        fontSize: "14px",
        minHeight: "34px",
        backgroundColor: "#f7931e4d",
        duration: 2000,
        margin: "4px 0px",
        innerBackgroundColor: "#F7931E",
      },
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {},
  components: { carouselRanking },
};
</script>

<style scoped lang="scss">
#call {
  margin-top: 10px;
  // width: 98%;
  width: 100%;
  // min-height: 392px;
  height: 100%;
  // height: 260px;
  .call-item {
    border: 32px solid transparent;
    border-image: url("../assets/border/1/right_bottom.png") 32;
    height: 220px;
    overflow: hidden;
  }
  .line {
    position: relative;
    img {
      position: absolute;
      bottom: 0px;
      right: 10px;
      top: 0px;
    }
  }
}
</style>
