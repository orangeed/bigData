<!-- 轮播排名 -->
<template>
  <!-- <div class="bg-ligra bg-round"> -->
  <div id="carouselRanking" class="bg-ligra bg-round">
    <div
      @mouseenter="mouseenter"
      @mouseleave="mouseleave"
      v-if="newCarouselRanking.data.length > 0"
    >
      <div
        v-for="(item, index) in newCarouselRanking.data"
        :key="item.id"
        @click="showItem(item)"
      >
        <transition name="item">
          <div
            v-show="!timer || index"
            class="carouselRanking-item"
            :style="{
              fontSize: newCarouselRanking.fontSize,
              margin: newCarouselRanking.margin,
            }"
          >
            <p class="top">
              <span class="flex-left">
                No.{{ item.id }}
                <span style="margin-left: 10px">{{ item.name }}</span>
              </span>
              <span class="flex-right">{{ item.value | numberFilter }}</span>
            </p>
            <div class="bottom">
              <p
                class="bottom-out"
                :style="{ backgroundColor: newCarouselRanking.backgroundColor }"
              ></p>
              <p
                class="bottom-inner"
                :style="{
                  backgroundColor: newCarouselRanking.innerBackgroundColor,
                  width: `${(item.value / firstNum) * 100}%`,
                }"
              ></p>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { sortObjectArray } from "../../utils/utils";
export default {
  filters: {
    numberFilter(val) {
      const numbers = val.toString().split("").reverse();
      const segs = [];
      while (numbers.length) segs.push(numbers.splice(0, 3).join(""));
      return segs.join(",").split("").reverse().join("");
    },
  },
  props: {
    carouselRanking: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      timer: undefined,
      newCarouselRanking: {
        //源数据
        data: [],
        // 字体大小
        fontSize: "14px",
        // 外面颜色
        backgroundColor: "#00444c",
        // 动画时间
        duration: 2000,
        // 间距
        margin: "0px",
        // 里面的颜色
        innerBackgroundColor: "#00FFFF",
      },
      firstNum: 0,
    };
  },
  computed: {},
  created() {
    // if (this.carouselRanking.data.length > 0) {
    //   const data = this.carouselRanking.data;
    //   delete this.carouselRanking.data;
    //   const carouselRanking = Object.assign(
    //     this.newCarouselRanking,
    //     this.carouselRanking
    //   );
    //   carouselRanking.data = data;
    //   this.newCarouselRanking = carouselRanking;
    //   this.newCarouselRanking.data = sortObjectArray(
    //     this.newCarouselRanking.data
    //   );
    //   this.firstNum = this.newCarouselRanking.data[0].value;
    //   this.newCarouselRanking.data.forEach((v, i) => {
    //     v.id = i + 1;
    //   });
    // }
  },
  mounted() {
    this.startInterval();
  },
  watch: {
    carouselRanking: {
      handler(val) {
        this.newCarouselRanking.data = [...val.data];
        if (this.carouselRanking.data.length > 0) {
          const data = this.carouselRanking.data;
          delete this.carouselRanking.data;
          const carouselRanking = Object.assign(
            this.newCarouselRanking,
            this.carouselRanking
          );
          carouselRanking.data = data;
          this.newCarouselRanking = carouselRanking;
          this.newCarouselRanking.data = sortObjectArray(
            this.newCarouselRanking.data
          );
          this.firstNum = this.newCarouselRanking.data[0].value;
          this.newCarouselRanking.data.forEach((v, i) => {
            v.id = i + 1;
          });
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    // 开始动画
    startInterval() {
      if (!this.timer) {
        const scroll = () => {
          const list = [...this.newCarouselRanking.data];
          list.push(list.shift());
          this.newCarouselRanking.data = list;
        };
        this.timer = setInterval(() => {
          scroll();
        }, this.newCarouselRanking.duration);
      }
    },
    mouseenter() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = undefined;
      }
    },
    mouseleave() {
      this.mouseenter();
      this.startInterval();
    },
    showItem(val) {
      this.$emit("rowClick", val);
    },
  },
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  components: {},
};
</script>

<style lang="scss">
#carouselRanking {
  overflow: hidden;
  height: 356px;
  width: 100%;
  cursor: pointer;
  padding: 10px 0px;

  .top {
    display: flex;
    margin: 0;
    padding: 0;
    .flex-left {
      flex: 1;
    }
    .flex-right {
      flex: 1;
      display: flex;
      justify-content: flex-end;
    }
  }
  .bottom {
    margin-top: -5px;

    position: relative;
    .bottom-out {
      width: 100%;
      height: 5px;
      border-radius: 5px;
      position: absolute;
      top: 0;
    }
    .bottom-inner {
      @extend .bottom-out;
      top: 0;
    }
  }

  .carouselRanking-item {
    margin-top: 0;
    height: 46px;
    transition: all 0.3s;
    padding: 0px 16px;

    // padding: 32px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.8);
      // width: 110%;
    }
  }
}
.item-leave-active {
  animation: scroll 1 0.3s forwards;
}
</style>
