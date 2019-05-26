<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <Login/> -->

    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/table">table</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <h3>login中</h3>
    <button>ログアウト</button>
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
// import Login from "@/components/Login.vue";

export default {
  name: "home",
  components: {
    // Login
  }
};
</script>
