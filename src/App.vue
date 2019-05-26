<template>
  <div id="app">
    <router-view/>
    <!-- <Login/> -->
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/table">table</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>-->
  </div>
</template>

<script>
import Login from "@/views/Login";

export default {
  name: "App",
  components: {
    Login
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
