<template>
  <div id="app">
    <!-- <index /> -->
    <indexmap />
  </div>
</template>

<script>
// import Index from "./views/index.vue";
import indexmap from "./views/index-map";

export default {
  name: "App",
  components: {
    // Index,
    indexmap,
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>
