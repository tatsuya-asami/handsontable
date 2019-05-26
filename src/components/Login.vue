<template>
  <div>
    <h1>Welcome to My Awesome App</h1>
    <div id="firebaseui-auth-container"></div>
    <div id="loader">Loading...</div>
  </div>
</template>

<script>
import uiConfig from "./authSettings.js";
import firebase from "../../firebase.js";

const ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start("#firebaseui-auth-container", uiConfig);

ui;

export default {
  name: "Login"
};
</script>

<style src="../../node_modules/firebaseui/dist/firebaseui.css">
</style>
