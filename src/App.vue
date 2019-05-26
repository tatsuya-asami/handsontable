<template>
  <div id="app">
    <Login/>
    <!-- <TableIndex/> -->
  </div>
</template>

<script>
import Login from "./components/Login.vue";
import TableIndex from "./components/TableIndex.vue";

export default {
  name: "app",
  components: {
    Login,
    TableIndex
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
