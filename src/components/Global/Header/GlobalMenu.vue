<template>
  <ul
    v-show="state.shouldShow"
    class="h-10 md:h-12 py-1 md:py-2 flex justify-center align-center bg-gray-darkest"
  >
    <global-menu-item label="Member List" link-to="/users" />
    <global-menu-item label="Tweets" link-to="/tweets" />
    <global-menu-item
      v-if="state.myProfile"
      label="My Profile"
      :link-to="`/users/${state.myProfile.id}`"
    />
  </ul>
</template>

<script lang="ts">
import { findMe } from "@/lib/firestore/users";
import { defineComponent, reactive, watch } from "vue";
import { useRoute } from "vue-router";
import GlobalMenuItem from "./GlobalMenuItem.vue";
import { User } from "@/interfaces";

export default defineComponent({
  name: "GlobalMenu",
  components: { GlobalMenuItem },
  setup() {
    const routeNamesToShow = ["Home", "Users", "User", "Tweets", "UserEdit"];

    const state: {
      shouldShow: boolean;
      myProfile: User | null;
    } = reactive({
      shouldShow: false,
      myProfile: null
    });

    const route = useRoute();

    watch(
      () => route.params,
      async () => {
        const routeName = route.name?.toString() ?? "";
        state.shouldShow = routeNamesToShow.includes(routeName);
        state.myProfile = await findMe();
      }
    );

    return { state };
  }
});
</script>
