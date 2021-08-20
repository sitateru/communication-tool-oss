import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  isNavigationFailure
} from "vue-router";
import Top from "@/views/Top.vue";
import Login from "@/views/Login.vue";
import Home from "@/views/Home.vue";
import Users from "@/views/Users.vue";
import User from "@/views/Users/_id.vue";
import Tweets from "@/views/Tweets.vue";
import UserEdit from "@/views/Users/Edit.vue";
import Register from "@/views/Users/Register.vue";
import firebase from "firebase";
import { firebaseInitialized } from "@/firebase";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Top",
    component: Top
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "/users",
    name: "Users",
    component: Users
  },
  {
    path: "/users/register",
    name: "Register",
    component: Register
  },
  {
    path: "/users/:id",
    name: "User",
    component: User
  },
  {
    path: "/users/:id/edit",
    name: "UserEdit",
    component: UserEdit
  },
  {
    path: "/tweets",
    name: "Tweets",
    component: Tweets
  },
  {
    path: "/users/:id/tweets",
    name: "UserTweets",
    component: Tweets
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const navigationToLoginPage = to.name === "Top" || to.name === "Login";
  if (navigationToLoginPage) {
    next();
    return;
  }

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      next();
      return;
    }
    next({ name: "Top" });
  });
});

router.afterEach((to, from, failure) => {
  if (!isNavigationFailure(failure)) {
    firebaseInitialized
      .analytics()
      // eslint-disable-next-line @typescript-eslint/camelcase
      .logEvent("page_view", { page_name: to.name, page_path: to.path });
  }
});

export default router;
