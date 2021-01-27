<!-- 下方提醒 -->
<template>
  <div id="notice">
    <div class="title-new">
      <span class="title-new-bg">{{ title }}</span>
    </div>
    <div>
      <div class="notice-info">
        <div
          v-for="(item, index) in defaultInfo.data"
          :key="item.id"
          :class="item.state === 0 ? ' bg-ligra text1' : ' bg-ligra danger'"
        >
          <transition name="slide" >
            <div class="notice-info-item" v-show="!timer || index">
              {{ item.info }}
            </div>
          </transition>
        </div>
      </div>

      <!-- </dv-border-box-7> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: () => {
        return {};
      },
    },
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      defaultInfo: {
        // 源数据
        data: [],
        // 动画时间
        duration: 2000,
      },
      timer: undefined,
    };
  },
  computed: {},
  created() {
    const data = this.info.data;
    delete this.info.data;
    const info = Object.assign(this.info, this.defaultInfo);
    info.data = data;
    this.defaultInfo = info;
    this.info.data.forEach((v, i) => {
      v.id = i + 1;
    });
  },
  mounted() {
    this.startInterval();
  },
  watch: {},
  methods: {
    // 开始动画
    startInterval() {
      if (!this.timer) {
        const scroll = () => {
          const list = [...this.defaultInfo.data];
          list.push(list.shift());
          this.defaultInfo.data = list;
          this.defaultInfo = {...this.defaultInfo}
        };
        this.timer = setInterval(() => {
          scroll();
        }, this.defaultInfo.duration);
      }
    },
  },
  components: {},
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
};
</script>

<style scoped lang="scss">
#notice {
  position: relative;
  .notice-info {
    margin-top: 20px;
    border: 30px solid transparent;
    border-image: url("../assets/border/1/left_03.png") 30;
    height: 96px;
    overflow: hidden;
    .notice-info-item {
      padding: 8px;
      margin-bottom: 10px;
      height: 20px;
      margin-top: 0px;
      transition: all 0.3s;
      &:nth-child(1) {
        margin-top: 10px;
      }

      &:nth-last-child(1) {
        // margin-bottom: 5px !important;
      }
    }
  }
}

@keyframes noticeScroll {
  0% {
    margin-top: 0px;
  }

  100% {
    margin-top: -40px;
  }
}
.slide-leave-active {
  animation: noticeScroll 1 .3s forwards;
}
</style>
