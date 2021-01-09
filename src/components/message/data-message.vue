<!-- message.vue 可配置版 -->
<template>
  <div class="echojoy-message" :class="type ? `echojoy-message--${type}` : ''">
    <p class="echojoy-message-content">
      <svgIcon
        icon-style="icon"
        :icon-class="type ? 'icon-Messagesuccess' : 'icon-prompt_'"
      />
      {{ content }}
    </p>
  </div>
</template>

<script>
// 主要就改了 data
export default {
  name: "EchojoyMessage",
  data() {
    return {
      type: "",
      content: "",
      duration: 3000,
    };
  },
  mounted() {
    setTimeout(() => {
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    }, this.duration);
  },
  components: {},
};
</script>
<style lang="scss" scoped>
@import "../../style/base-color.scss";
.echojoy-message {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  color: #fff;
  z-index: 9999;
  background: transparent;
  > p {
    padding: 12px 22px;
    border-radius: 4px;
    min-width: 300px;
  }
  &--error p {
    background: $color-error;
  }
  &--success p {
    background: $color-success;
  }
}
</style>
