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
    <button @click="logout">ログアウト</button>
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
// import Login from "@/components/Login.vue";
import firebase from "../../firebase.js";

export default {
  name: "home",
  components: {
    // Login
  },
  methods: {
    logout: function() {
      firebase.auth().onAuthStateChanged(user => {
        console.log(user);
        if (!user) {
          return;
        }
        firebase
          .auth()
          .signOut()
          .then(() => {
            alert("ログアウトしました");
          })
          .catch(error => {
            alert(`ログアウト時にエラーが発生しました (${error})`);
          });
      });
    }
  }
};
</script>
