<!-- 轮播排名 -->
<template>
  <div id="carouselRanking" ref="box">
    <div>
      <div
        v-for="(item, index) in newCarouselRanking.data"
        :key="item.name"
        :style="{
          fontSize: newCarouselRanking.fontSize,
          minHeight: newCarouselRanking.minHeight,
        }"
        class="carouselRanking-item"
      >
        <!-- v-if="startIndex < index + 1 && endIndex > index" -->
        <transition name="item" :duration="1000">
          <!-- <div class="item" v-show="index !== 0">{{ value * 100 }}</div> -->
          <div class="item" v-show="index">
            <p class="top">
              <span class="flex-left"
                >No.{{ index + 1
                }}<span style="margin-left:10px">{{ item.name }}</span></span
              >
              <span class="flex-right">{{ item.value | numberFilter }}</span>
            </p>
            <p
              class="bottom"
              :style="{ backgroundColor: carouselRanking.backgroundColor }"
            ></p>
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
      const numbers = val
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
      startIndex: 0,
      endIndex: 8,
      // height: 35.6,
      // delay: 2000,
      // speed: 50,
      timer: undefined,
      newCarouselRanking: this.carouselRanking,
    };
  },
  computed: {},
  created() {
    this.newCarouselRanking.data = sortObjectArray(
      this.newCarouselRanking.data
    );
    this.endIndex = this.newCarouselRanking.endIndex;
    if (this.newCarouselRanking.time) {
      this.time = this.newCarouselRanking.time;
    }
    console.log("carouselRanking", this.newCarouselRanking);
  },
  mounted() {
    this.startInterval();
  },
  watch: {},
  methods: {
    startInterval() {
      if (!this.timer) {
        const scroll = () => {
          const list = [...this.newCarouselRanking.data];
          list.push(list.shift());
          this.newCarouselRanking.data = list;
          this.newCarouselRanking = JSON.parse(
            JSON.stringify(this.newCarouselRanking)
          );
        };
        this.timer = setInterval(() => {
          scroll();
        }, 1000);
      }
    },
    boxMouseenter() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = undefined;
      }
    },
    boxMouseleave() {
      this.boxMouseenter();
      this.startInterval();
    },
    roll() {
      // var area = document.getElementById("box");
      const area = this.$refs.box;
      area.innerHTML += area.innerHTML;
      var liHeight = 24;
      area.scrollTop = 0;
      var delay = 2000;
      var speed = 50;
      var time;

      function starMove() {
        area.scrollTop++;
        time = setInterval(scrollUp, speed);
      }

      function scrollUp() {
        if (area.scrollTop % liHeight == 0) {
          clearInterval(time);
          setTimeout(starMove, delay);
        } else {
          area.scrollTop++;
          if (area.scrollTop >= area.offsetHeight / 2) {
            area.scrollTop = 0;
          }
        }
      }
      setTimeout(starMove, delay);
      // const box = this.$refs.box;
      // box.scrollTop = 0;
      // box.innerHTML += box.innerHTML;
      // const restart = () => {
      //   if (box.scrollTop >= one.scrollHeight) {
      //     box.scrollTop = 0;
      //   } else {
      //     box.scrollTop += 43;
      //     console.log("box.scrollTop", box.scrollTop);
      //   }
      // };
      // function starMove() {
      //   box.scrollTop++;
      //   this.timer = setInterval(scrollUp, this.speed);
      // }

      // function scrollUp() {
      //   if (box.scrollTop % this.height == 0) {
      //     clearInterval(this.timer);
      //     setTimeout(starMove, this.delay);
      //   } else {
      //     box.scrollTop++;
      //     if (box.scrollTop >= box.offsetHeight / 2) {
      //       box.scrollTop = 0;
      //     }
      //   }
      // }
      // setTimeout(starMove, this.delay);

      // let timer = setInterval(restart, this.time);

      // box.onmouseover = () => {
      //   clearInterval(this.timer);
      // };
      // box.onmouseout = () => {
      //   // timer = setInterval(restart, this.time);
      //   setTimeout(startMove, this.delay);
      // };
    },
  },
  components: {},
};
</script>

<style lang="scss">
#carouselRanking {
  overflow: hidden;
  height: 356px;

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
    margin-top: 5px;
    height: 5px;
    border-radius: 5px;
  }

  .carouselRanking-item {
    margin-top: 0;
    height: 46px;
    transition: all 0.3s;
  }
}
.item-leave-active {
  animation: scroll 1 0.3s forwards;
}
</style>
