<!-- 右边信息展示 -->
<template>
  <div class="right-info">
    <!-- 设备总数 -->
    <div>
      <div class="title">设备统计信息</div>
      <dv-border-box-8 class="first-info" :dur="10">
        <div class="unitInfo">
          <div class="unitInfo-left">
            <p class="center">设备总量</p>
            <dv-digital-flop :config="config" style="height: 50px" />
          </div>
          <div class="unitInfo-right">
            <p class="center">设备实时在线量</p>
            <dv-digital-flop :config="config1" style="height: 50px" />
          </div>
        </div>
        <div class="unitInfo">
          <div
            class="unitInfo-left"
            style="cursor: pointer;"
            @click="showError"
          >
            <p class="center">设备异常量</p>
            <dv-digital-flop :config="config2" style="height: 50px;" />
          </div>
          <div class="unitInfo-right">
            <p class="center">设备在线率</p>
            <dv-digital-flop :config="config4" style="height: 50px" />
            <!-- <p class="center onlineRate">
              {{ (config1.number[0] / config.number[0]) * 100 }}%
            </p> -->
          </div>
        </div>
      </dv-border-box-8>
    </div>
    <!-- 设备类型 -->
    <div class="type">
      <div class="title">设备类型信息</div>
      <div class="ring">
        <ve-ring
          :data="chartData"
          :settings="chartSettings"
          :legend="legend"
        ></ve-ring>
      </div>
    </div>
    <div class="notice">
      <notice title="实时柜子信息" />
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
// 设备总量
const config = {
  number: [123456],
  content: "{nt}个",
  formatter,
};
// 设备实时在线量
const config1 = {
  number: [123456],
  content: "{nt}个",
  formatter,
  style: {
    fill: "#67C23A",
  },
};
export default {
  props: {},
  data() {
    return {
      // 设备总量
      config,
      // 设备实时在线量
      config1,
      // 设备异常量
      config2: {
        number: [456],
        content: "{nt}个",
        formatter,
        style: {
          fill: "#f5222d",
        },
      },
      config4: {
        number: [(config1.number[0] / config.number[0]) * 100],
        content: "{nt}%",
        style: {
          fill: "#2376b7",
        },
      },
      chartSettings: {
        radius: [50, 100],
        offsetY: 150,
      },
      // 图配配置
      legend: {
        // 文字颜色
        textStyle: {
          color: "#fff",
        },
        // 图例关闭时候的颜色
        inactiveColor: "#676665",
      },
      chartData: {
        columns: ["类型", "数量"],
        rows: [
          { 类型: "迷你型", 数量: 1393 },
          { 类型: "小型", 数量: 3530 },
          { 类型: "中小型", 数量: 2923 },
          { 类型: "中型", 数量: 1723 },
          { 类型: "大型", 数量: 3792 },
        ],
      },
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    // 显示异常设备信息
    showError() {
      const showErrorTable = this.$store.getters.showErrorTable;
      if (showErrorTable) {
        this.$store.commit("SET_SHOWERRORTABLE", false);
        return;
      }
      this.$store.commit("SET_SHOWERRORTABLE", true);
    },
  },
  components: { notice },
};
</script>

<style scoped lang="scss">
.right-info {
  margin-left: 20px;
  width: 80%;
  position: relative;
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
        .onlineRate {
          font-size: 30px;
          margin: 0;
        }
      }
    }
  }
  .type {
    margin-top: 30px;
    .ring {
      padding-top: 30px;
      // background-color: rgba(161, 161, 161, 0.1);
    }
  }
  .notice {
    margin-top: -100px;
  }
}
</style>
