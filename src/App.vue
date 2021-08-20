<template>
  <div class="relative min-h-screen">
    <the-header />
    <div class="py-12 md:py-20">
      <Suspense>
        <template #default>
          <router-view />
        </template>
        <template #fallback>
          <p>loading...</p>
        </template>
      </Suspense>
    </div>
    <the-footer />
  </div>
</template>

<script lang="ts">
import { defineComponent, provide } from "vue";
import { users, profileMessages } from "@/lib/firestore/users";
import { tweets } from "@/lib/firestore/tweets";
import { ProfileMessagesKey, UsersKey, TweetsKey } from "@/injectionKeys";
import TheHeader from "./components/Global/Header/TheHeader.vue";
import TheFooter from "./components/Global/Footer/TheFooter.vue";

export default defineComponent({
  name: "App",
  components: { TheHeader, TheFooter },
  setup() {
    provide(UsersKey, users);
    provide(ProfileMessagesKey, profileMessages);
    provide(TweetsKey, tweets);
    return {};
  }
});
</script>
