<!-- 下方提醒 -->
<template>
  <div id="notice">
    <div class="title-new">
      <span class="title-new-bg">{{ title }}</span>
    </div>
    <!-- <div class="title">{{ title }}</div> -->
    <div>
      <!-- <dv-border-box-7 class="notice-info"> -->
      <div class="notice-info">
        <div
          v-for="(item, index) in isUnit ? noticeInfo : unitInfo"
          :key="index"
          :class="
            item.state === 0
              ? 'notice-info-item bg-ligra text1'
              : 'notice-info-item bg-ligra danger'
          "
        >
          {{ item.info }}
        </div>
      </div>

      <!-- </dv-border-box-7> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isUnit: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      noticeInfo: [
        {
          state: 0,
          info: "杭州市教育局的迷你型柜子被激活了。",
        },
        {
          state: 1,
          info: "杭州市教育局的迷你型柜子被激活了。",
        },
        // {
        //   state: 1,
        //   info: "杭州市教育局的迷你型柜子被激活了。",
        // },
        // {
        //   state: 0,
        //   info: "杭州市教育局的迷你型柜子被激活了。",
        // },
      ],
      unitInfo: [
        {
          state: 0,
          info: "杭州市高级中学被激活了。",
        },
        {
          state: 0,
          info: "杭州市第三人民医院被激活了。",
        },
      ],
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
#notice {
  // width: 21vw;
  // height: 320px;
  width: 100%;
  height: 100%;
  position: relative;
  .notice-info {
    margin-top: 20px;
    border: 30px solid transparent;
    border-image: url("../assets/border/1/left_03.png") 30;
    .notice-info-item {
      padding: 8px;
      margin-bottom: 10px;
      &:nth-child(1){
        margin-top: 10px;
      }

      &:nth-last-child(1) {
        // margin-bottom: 5px !important;
      }
    }
  }
}
</style>
