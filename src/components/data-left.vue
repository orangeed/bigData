<!-- 左边信息展示 -->
<template>
  <div class="left-info">
    <!-- 单位统计信息 -->
    <div>
      <div class="title">单位统计信息</div>
      <dv-border-box-8 class="first-info" :dur="10">
        <div class="unitInfo">
          <div class="unitInfo-left">
            <p class="center">单位总数</p>
            <dv-digital-flop :config="config" style="height: 50px" />
          </div>
          <div class="unitInfo-right">
            <p class="center">待激活单位总数</p>
            <dv-digital-flop :config="config1" style="height: 50px" />
          </div>
        </div>
        <div>
          <p class="center">已激活单位总数</p>
          <dv-digital-flop :config="config2" style="height: 50px" />
        </div>
      </dv-border-box-8>
    </div>

    <!-- 省份单位数量统计 -->
    <div class="provincial">
      <div class="title">省份单位数量统计</div>

      <div class="provincialBoard">
        <div class="provincialBoard-item">
          <dv-scroll-ranking-board
            :config="provincialConfig"
            style="height: 500px;"
          />
        </div>
      </div>
    </div>
    <!-- 单位激活信息 -->
    <div class="unitNotice">
      <notice title="实时单位激活信息" :isUnit="false" />
    </div>
  </div>
</template>

<script>
import notice from "@/components/data-notice.vue";

const formatter = (number) => {
  const numbers = number
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
};
export default {
  props: {},
  data() {
    return {
      // 单位总数
      config: {
        number: [1234567893],
        content: "{nt}个",
        formatter,
      },
      // 待激活单位总数
      config1: {
        number: [1234567893],
        content: "{nt}个",
        formatter,
        style: {
          fill: "#E6A23C",
        },
      },
      // 已激活单位总数
      config2: {
        number: [567893],
        content: "{nt}个",
        formatter,
        style: {
          fill: "#67C23A",
        },
      },
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
        rowNum: 10,
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
  components: { notice },
};
</script>

<style scoped lang="scss">
.left-info {
  margin-left: 20px;
  width: 80%;
  .first-info {
    margin: 20px 0px 0px 0px;
    .unitInfo {
      display: flex;
      justify-content: center;
      align-items: center;

      .unitInfo-left {
        flex: 1;
      }
      .unitInfo-right {
        flex: 1;
      }
    }
  }
}
.provincial {
  margin-top: 30px;
  width: 100%;
  min-height: 530px;
  height: 100%;
  background-color: rgba(161, 161, 161, 0.1);
  // background-color: rgba(77, 76, 76, 0.5);

  .provincialBoard {
    // width: 400px;
    // width: 100%;
    position: relative;
    .provincialBoard-item {
      // margin: 0 auto;
      position: absolute;
      width: 90%;
      transform: translateX(5%);
      // width: 100%;

      // display: flex;
      // justify-content: center;
      // align-items: center;
    }
  }
}
.unitNotice {
  margin-top: 30px;
}
</style>
