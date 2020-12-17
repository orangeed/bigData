<!-- 首页 -->
<template>
  <div id="data-view">
    <dv-full-screen-container>
      <dv-loading v-if="loading">Loading...</dv-loading>
      <div v-else>
        <top />
        <div class="plate">
          <div class="left"><left /></div>
          <div class="mapp">
            <dataMap :re-contry="reContry" />
            <bottom />
          </div>
          <div class="right"><right /></div>
        </div>
      </div>
    </dv-full-screen-container>
  </div>
</template>

<script>
import top from "../components/data-global.vue";
import dataMap from "../components/data-map.vue";
import left from "../components/data-left.vue";
import right from "../components/data-right.vue";
import bottom from "../components/data-bottom.vue";
// import nationwide from "../components/data-nationwide.vue";

export default {
  props: {},
  data() {
    return {
      loading: true,
      reContry: true,
    };
  },
  computed: {},
  created() {
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  },
  mounted() {},
  watch: {},
  methods: {
    returnCountry() {
      this.reContry = true;
      setTimeout(() => {
        this.reContry = false;
      }, 500);
      console.log("reContry", this.reContry);
    },
  },
  components: { top, dataMap, left, right, bottom, nationwide },
};
</script>

<style scoped lang="scss">
#data-view {
  width: 100%;
  height: 100%;
  background-color: #010b46;
  color: #fff;
  #dv-full-screen-container {
    background-image: url("../assets/bg.png");
    // background-image: radial-gradient(#031d72, #010b46);
    background-size: 100% 100%;
    // box-shadow: 0 0 3px blue;
    display: flex;
    flex-direction: column;
    .plate {
      display: flex;
      .left {
        flex: 1;
      }
      .mapp {
        flex: 1;
        // width: 100vw;
        height: 60vh;
        // height: 60%;
        z-index: 2;
        border-radius: 20px;
      }
      .right {
        flex: 1;
      }
    }
  }
}
</style>
