<!-- 催缴 -->
<template>
  <div id="call">
    <div class="title-new">
      <span class="title-new-bg">催缴</span>
    </div>
    <!-- <div class="title">省份单位数量统计</div> -->
    <div class="call-item">
      <div class="provincialBoard-item">
        <div
          class="bg-ligra bg-round"
          style="padding: 0px 10px;margin-bottom:0px"
        >
          <dv-scroll-ranking-board
            :config="provincialConfig"
            style="height: 200px;"
          />
        </div>
      </div>
    </div>
    <div class="line">
      <img src="../assets/border/1/line.png" />
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      // 省份单位数量统计
      provincialConfig: {
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
          {
            name: "漯河1",
            value: 44231,
          },
          {
            name: "南阳",
            value: 120,
          },
          {
            name: "西峡1",
            value: 12022,
          },
          {
            name: "驻马店1",
            value: 63411,
          },
        ],
        unit: "个",
        rowNum: 5,
        waitTime: 2000,
        valueFormatter({ value }) {
          const numbers = value
            .toString()
            .split("")
            .reverse();
          const segs = [];
          while (numbers.length) segs.push(numbers.splice(0, 3).join(""));
          return segs
            .join(",")
            .split("")
            .reverse()
            .join("");
        },
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
#call {
  margin-top: 10px;
  // width: 98%;
  width: 100%;
  min-height: 392px;
  height: 100%;
  .call-item {
    border: 32px solid transparent;
    border-image: url("../assets/border/1/right_bottom.png") 32;
  }
  .line {
    position: relative;
    img {
      position: absolute;
      bottom: 0px;
      right: 0px;
      top: 0px;
    }
  }
}
// 排名轮播表外面的柱状图
/deep/.dv-scroll-ranking-board .ranking-column {
  background-color: rgba(247, 147, 30, 0.3) !important;
  border: none !important;
  border-radius: 5px;
}
// 排名轮播表里面的柱状图
/deep/.dv-scroll-ranking-board .ranking-column .inside-column {
  background-color: rgb(247, 147, 30) !important;
  border-radius: 5px !important;
  padding: 1px 0px 1px 0px !important;
  height: 4px !important;
  margin: 0 !important;
  padding: 0 !important;
}
/deep/.dv-scroll-ranking-board .ranking-info .rank {
  color: #fff !important;
}
</style>
