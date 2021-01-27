<!-- 展示项 -->
<template>
  <div id="moduleOptions">
    <img src="../assets/border/2/middle_02.png" alt="" />
    <form class="bg-ligra">
      <div v-for="(item, index) in moduleOptions" :key="index" style="margin:16px 0px">
        <input
          type="checkbox"
          :id="item.value"
          :name="item.label"
          :value="item.value"
          :checked="item.checked"
          @click="checkInput"
        />
        <label :for="item.value">{{ item.label + item.remark }}</label
        ><br />
      </div>
    </form>
  </div>
</template>

<script>
import moduleOptions from "../utils/moduleOptions";
export default {
  props: {},
  data() {
    return {
      moduleOptions,
      checkOptions: this.$store.getters.moduleOptions,
    };
  },
  computed: {},
  created() {
    // this.$message.success({ content: "333" });
    console.log("store", this.$store.getters);
  },
  mounted() {},
  watch: {},
  methods: {
    // 选择模块
    checkInput(e) {
      const value = e.target.value;
      const checked = e.target.checked;
      const checkOptionsKeys = Object.keys(this.checkOptions);
      checkOptionsKeys.forEach((key) => {
        if (key === value) {
          this.checkOptions[key] = checked;
          // this.$store.commit("SET_SHOWMODULEOPTIONS", false);
        }
      });
    },
    // 提交展示项数据
    submit() {
      this.$store.commit("SET_MODULEOPTIONS", this.checkOptions);
      const checkOptionsKeys = Object.keys(this.checkOptions);
      moduleOptions.forEach((v) => {
        checkOptionsKeys.forEach((key) => {
          if (key === v.value) {
            v.checked = this.checkOptions[key];
            this.$message.success({ content: "修改成功！" });
            this.$store.commit("SET_SHOWMODULEOPTIONS", false);
          }
        });
      });
    },
  },
  components: {},
};
</script>

<style scoped lang="scss">
@import "../style/color.scss";
#moduleOptions {
  position: relative;
  img {
    position: absolute;
    top: -80px;
    right: -140px;
  }

  form {
    width: 104%;
    border: 5px solid transparent;
    border-radius: 20px;
    border-image: url("../assets/border/2/middle_01.png") 5;
    padding: 0 40px;

    div {
      margin: 10px 0px;
    }
    button {
      background-color: #1370fb;
      outline: none;
      border: none;
      color: $color-white;
      width: 20%;
      height: 5%;
      border-radius: 5px;
      &:active {
        background-color: $color-orange;
      }
    }
  }
  /*滚动条整体样式*/
  &::-webkit-scrollbar {
    width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  /*滚动条里面小方块*/
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 5px #00c1fc1a;
    background: #006eb8;
  }
  /*滚动条里面轨道*/
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px #00c1fc1a;
    border-radius: 10px;
    background: #ededed;
  }
}
</style>
