<template>
  <header class="fixed top-0 inset-x-0 w-screen z-30">
    <div class="h-16 md:h-20 flex justify-between bg-black text-white">
      <router-link to="/home">
        <app-logo class="mx-2 md:mx-6 my-2 md:my-5 bg-black text-white" />
      </router-link>
      <account-menu class="bg-black text-white" />
    </div>
    <global-menu />
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppLogo from "@/components/Common/AppLogo.vue";
import AccountMenu from "@/components/Global/Header/AccountMenu.vue";
import GlobalMenu from "@/components/Global/Header/GlobalMenu.vue";

export default defineComponent({
  name: "TheHeader",
  components: { AppLogo, AccountMenu, GlobalMenu }
});
</script>
