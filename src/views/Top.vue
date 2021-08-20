<template>
  <div class="fixed top-1/3 w-screen h-96 text-center">
    <app-logo class="mt-2 mb-12 md:mb-20 px-8 md:px-0" size="large" />
    <router-link
      to="/login"
      class="px-16 md:px-24 py-4 bg-black text-white hover:bg-gray-700"
    >
      ログイン
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppLogo from "@/components/Common/AppLogo.vue";

export default defineComponent({
  name: "Top",
  components: { AppLogo }
});
</script>
