<!-- 左边信息展示 -->
<template>
  <div class="left-info">
    <!-- 单位统计信息 -->
    <div
      v-if="$store.getters.moduleOptions.unitStatistics"
      class="fadein unit-info transition"
    >
      <!-- <div class="title">单位统计信息</div> -->
      <div class="title-new">
        <span class="title-new-bg">单位统计信息</span>
      </div>
      <!-- <dv-border-box-8 class="first-info" :dur="10"> -->
      <div class="first-info">
        <div class="bg-ligra bg-round" style="margin-bottom: 2px">
          <div>
            <p
              class="center"
              style="font-size: 14px; padding: 10px 0px 10px 0; margin: 0px"
            >
              激活单位总数(个)
            </p>

            <number
              :textColor="totalNumber"
              :startVal="totalNumber.startVal"
              :endVal="totalNumber.endVal"
              :duration="3000"
            />
          </div>
          <div class="unitInfo">
            <div class="unitInfo-left">
              <p class="center" style="font-size: 14px">异常单位数量(个)</p>
              <number
                :textColor="waitNumber"
                :startVal="waitNumber.startVal"
                :endVal="waitNumber.endVal"
                :duration="3000"
                style="padding-bottom: 10px"
              />
            </div>
            <div class="unitInfo-right">
              <p class="center" style="font-size: 14px">新增激活单位数量(个)</p>
              <number
                :textColor="activationNumber"
                :startVal="activationNumber.startVal"
                :endVal="activationNumber.endVal"
                :duration="3000"
                style="padding-bottom: 10px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 省份单位数量统计 -->
    <div
      class="fadein provincial transition"
      v-show="
        $store.getters.moduleOptions.unitStatisticsRannking ||
        provincialData.data.length > 0
      "
    >
      <div class="title-new">
        <span class="title-new-bg">省份单位数量统计</span>
      </div>
      <div class="provincialBoard">
        <div class="provincialBoard-item">
          <!-- <div class="bg-ligra bg-round"> -->
          <carouselRanking
            :carouselRanking="provincialData"
            @rowClick="rowClick"
          />
        </div>
      </div>
    </div>
    <!-- 单位激活信息 -->
    <div
      class="fadein unitNotice"
      v-if="$store.getters.moduleOptions.onlineUnitActivationInfo"
    >
      <notice title="实时单位激活信息" :info="unitInfo" />
    </div>
    <!-- 柜子激活信息 -->
    <div
      class="fadein notice"
      v-if="$store.getters.moduleOptions.onlineDeviceInfor"
    >
      <notice title="实时柜子信息" :info="noticeInfo" />
    </div>
    <div class="line">
      <img src="../assets/border/1/line.png" />
    </div>
  </div>
</template>

<script>
import notice from "@/components/data-notice.vue";
import number from "@/components/number/data-number.vue";
import carouselRanking from "@/components/carouselRanking/data-carouselRanking.vue";
import {
  unitStatistics,
  provinceCityStatistics,
  realTimeUnitActivation,
} from "../api/unitStatistics";
import { realTimeDeviceActivation } from "../api/deviceStatistics";

export default {
  props: {},
  data() {
    return {
      // 激活单位总数
      totalNumber: {
        color: "#3FA9F5",
        startVal: 0,
        endVal: 0,
      },
      // 异常单位数量
      waitNumber: {
        color: "#00FFFF",
        startVal: 0,
        endVal: 0,
      },
      // 新增激活单位数量
      activationNumber: {
        color: "#00FFFF",
        startVal: 0,
        endVal: 0,
      },
      // 省份单位数量统计
      provincialData: {
        data: [],
        // [
        //   {
        //     name: "周口",
        //     value: 111,
        //     adcode: "330000",
        //   },
        //   {
        //     name: "南阳",
        //     value: 777,
        //     adcode: "330000",
        //   },
        //   {
        //     name: "西峡",
        //     value: 4545,
        //     adcode: "330000",
        //   },
        //   {
        //     name: "驻马店",
        //     value: 788,
        //     adcode: "330000",
        //   },
        //   {
        //     name: "新乡",
        //     value: 234,
        //     adcode: "330000",
        //   },
        //   {
        //     name: "信阳",
        //     value: 1234,
        //     adcode: "330000",
        //   },
        //   {
        //     name: "漯河",
        //     value: 29,
        //     adcode: "330000",
        //   },
        //   {
        //     name: "新乡",
        //     value: 56456,
        //     adcode: "330000",
        //   },
        //   {
        //     name: "信阳",
        //     value: 4574,
        //     adcode: "330000",
        //   },
        //   {
        //     name: "漯河1",
        //     value: 44231,
        //     adcode: "330000",
        //   },
        //   {
        //     name: "南阳",
        //     value: 120,
        //     adcode: "330000",
        //   },
        //   {
        //     name: "西峡1",
        //     value: 12022,
        //     adcode: "330000",
        //   },
        //   {
        //     name: "驻马店1",
        //     value: 63411,
        //     adcode: "330000",
        //   },
        // ],
        fontSize: "14px",
        minHeight: "34px",
        backgroundColor: "#00444c",
        duration: 2000,
      },
      // 实时柜子信息
      noticeInfo: {
        data: [],
      },
      // 实时单位激活信息
      unitInfo: {
        data: [
          // {
          //   code: 0,
          //   unitName: "杭州市高级中学",
          //   time: "2020-03-23",
          // },
          // {
          //   code: 1,
          //   unitName: "杭州市高级中学1",
          //   time: "2020-03-23",
          // },
          // {
          //   code: 2,
          //   unitName: "杭州市高级中学2",
          //   time: "2020-03-23",
          // },
          // {
          //   code: 3,
          //   unitName: "杭州市高级中学3",
          //   time: "2020-03-23",
          // },
          // {
          //   code: 4,
          //   unitName: "杭州市高级中学4",
          //   time: "2020-03-23",
          // },
          // {
          //   code: 5,
          //   unitName: "杭州市高级中学5",
          //   time: "2020-03-23",
          // },
          // {
          //   code: 6,
          //   unitName: "杭州市高级中学6",
          //   time: "2020-03-23",
          // },
          // {
          //   code: 7,
          //   unitName: "杭州市高级中学7",
          //   time: "2020-03-23",
          // },
        ],
      },
      adcode: this.$store.getters.adcode,
      timer: null,
    };
  },
  computed: {},
  created() {
    // this.deviceStatistics();
    this.init();
  },
  mounted() {
    this.timer = setInterval(() => {
      this.adcode = this.$store.getters.adcode;
      this.init();
    }, this.$store.getters.timer);
  },
  watch: {},
  methods: {
    rowClick(val) {
      console.log(val);
      // this.enterMap();
      this.$emit("enterMap", val);
      // alert(`这个是省市区的排名的点击事件${JSON.stringify(val)}`);
    },
    // 初始化函数
    init() {
      this.deviceStatistics();
      this.provinceCityStatistics();
      this.realTimeUnitActivation();
      this.realTimeDeviceActivation();
    },
    // 单位统计信息
    deviceStatistics() {
      unitStatistics({ area: this.adcode }).then((res) => {
        if (res.code === 0) {
          this.totalNumber.endVal = res.result.unitTotalNumber;
          this.waitNumber.endVal = res.result.unitWaitNumber;
          this.activationNumber.endVal = res.result.unitAlreadyNumber;
        }
      });
    },
    // 省份或者城市单位数量统计
    provinceCityStatistics() {
      provinceCityStatistics({ area: this.adcode }).then((res) => {
        if (res.code === 0 && res.result.list != null) {
          this.provincialData.data = res.result.list;
        }
      });
    },
    // 获取实时激活单位信息
    realTimeUnitActivation() {
      realTimeUnitActivation({ area: this.adcode }).then((res) => {
        if (res.code === 0 && res.result.list != null) {
          this.unitInfo.data = res.result.list;
        }
      });
    },
    // 实施设备激活信息
    realTimeDeviceActivation() {
      realTimeDeviceActivation({ area: this.adcode }).then((res) => {
        // console.log("realTimeDeviceActivation", res);
        if (res.code === 0 && res.result.list != null) {
          this.noticeInfo.data = res.result.list;
        }
        // this.noticeInfo.data = {
        //   code: 0,
        //   unitName: "杭州市高级中学",
        //   time: "2020-03-23",
        // };
      });
    },
  },
  components: { notice, number, carouselRanking },
  destroyed() {
    clearInterval(this.timer);
  },
};
</script>

<style scoped lang="scss">
.left-info {
  margin-left: 20px;
  width: 80%;
  .unit-info {
    position: relative;
    // height: 80%;
    // width: 80%;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    // height: 120px;
    .first-info {
      margin: 20px 0px 0px 0px;
      border: 30px solid transparent;
      border-image: url("../assets/border/1/left_01.png") 30;

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
    margin-top: 10px;
    // width: 98%;
    width: 100%;
    min-height: 392px;
    height: 100%;
    // padding: 16px;
    // background-color: rgba(161, 161, 161, 0.1);
    position: relative;
    .provincialBoard {
      border: 30px solid transparent;
      border-image: url("../assets/border/1/left_02.png") 30;

      .provincialBoard-item {
        // padding: -16px;
        // display: flex;
        // justify-content: center;
        // align-items: center;
        // flex: 1;
        // width: 100%;
        // border: 30px solid transparent;
        // border-image: url("../assets/border/1/left_02.png") 30;
        // position: absolute;
        // width: 90%;
        // transform: translateX(5%);
        // // 排名轮播表外面的柱状图
        // .dv-scroll-ranking-board .ranking-column {
        //   background-color: #00444c !important;
        //   border: none !important;
        //   border-radius: 1px;
        // }
        // // 排名轮播表里面的柱状图
        // .dv-scroll-ranking-board .ranking-column .inside-column {
        //   background-color: rgba(0, 255, 255, 0.3);
        //   border-radius: 1px;
        // }
      }
    }
  }
  .unitNotice {
    margin-top: -10px;
  }
  .notice {
    margin-top: -10px;
  }
  .line {
    position: relative;
    top: -12px;
    left: 10px;
  }
}
</style>
