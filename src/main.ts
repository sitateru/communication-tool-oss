import "vue-loaders/dist/vue-loaders.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueLoaders from "vue-loaders";
import "@/assets/css/tailwind.css";
import { firebaseInitialized } from "./firebase";

firebaseInitialized.analytics();

createApp(App)
  .use(router)
  .use(VueLoaders)
  .mount("#app");
