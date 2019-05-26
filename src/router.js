import Vue from "vue";
import Router from "vue-router";
import firebase from "firebase/app";
// import "firebaseui";
import store from "./store";
import Home from "./views/Home.vue";
import Table from "./views/Table.vue";
import About from "./views/About.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/table",
      name: "table",
      component: Table,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/about",
      name: "about",
      component: About,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

const loginStatus = store.state.loginStatus;
const auth = firebase.auth().currentUser;
// console.log(auth);

// const user = firebase.auth().onAuthStateChanged(user => {
//   console.log(user);
//   return user;
// });
// console.log(user);

router.beforeEach((to, from, next) => {
  // console.log(to);
  // console.log(from);
  // console.log(next);
  // console.log(loginStatus);

  if (to.matched.some(record => record.meta.requiresAuth)) {
    // このルートはログインされているかどうか認証が必要です。
    // もしされていないならば、ログインページにリダイレクトします。

    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      if (!user) {
        next({
          name: "home"
          // query: { redirect: to.fullPath }
        });
      } else {
        next();
      }
    });
    // if (user) {
    //   next({
    //     name: "home"
    //     // query: { redirect: to.fullPath }
    //   });
    // } else {
    //   next();
    // }
  } else {
    // next(); // next() を常に呼び出すようにしてください!
    next();
  }
});

export default router;
