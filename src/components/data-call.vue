<!-- 催缴 -->
<template>
  <div id="call">
    <div class="title-new">
      <span class="title-new-bg">催缴</span>
    </div>
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
import { call } from "../api/call";

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
        ],
        fontSize: "14px",
        minHeight: "34px",
        backgroundColor: "#f7931e4d",
        duration: 2000,
        margin: "4px 0px",
        innerBackgroundColor: "#F7931E",
      },
      adcode: this.$store.getters.adcode,
      timer: null,
    };
  },
  computed: {},
  created() {
    this.timer = setInterval(() => {
      this.call();
    }, this.$store.getters.timer);
  },
  mounted() {},
  watch: {},
  methods: {
    call() {
      console.log('call',this.adcode);
      call({ area: this.adcode }).then((res) => {
        if (res.code === 0 && res.result.list != null) {
          this.provincialData.data = [];
          this.provincialData.data = res.result.list;
        }
      });
    },
  },
  components: { carouselRanking },
  destroyed() {
    clearInterval(this.timer);
  },
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
