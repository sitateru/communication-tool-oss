<template>
  <div class="fixed top-1/3 w-screen text-center">
    <div id="firebaseui-auth-container" class="transform sm:scale-150"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick } from "vue";
import router from "@/router";
import "firebaseui/dist/firebaseui.css";
import { getCurrentUser, startAuthUI } from "@/firebase";

export default defineComponent({
  name: "Login",
  setup() {
    const currentUser = getCurrentUser();
    if (currentUser) router.push("/home");

    nextTick(() => {
      startAuthUI(
        "#firebaseui-auth-container",
        () => router.push("/home"),
        error => {
          console.warn(error.message);
          alert(error.message);
        }
      );
    });
  }
});
</script>
