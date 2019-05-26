import Vue from "vue";
import Vuex from "vuex";
import store from "./store";

Vue.use(Vuex);

const router = new Vuex.Store({
  state: {
    loginStatus: false
  },
  mutations: {
    login(state) {
      state.loginStatus = true;
    },
    logout(state) {
      state.loginStatus = false;
    }
  },
  actions: {}
});

export default router;
