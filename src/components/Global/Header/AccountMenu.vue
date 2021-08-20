<template>
  <div v-if="state.currentUser" class="relative">
    <button
      @click="toggleDropdown"
      :class="[
        'block',
        'h-16',
        'md:h-20',
        'w-44',
        'md:w-48',
        'min-w-max',
        'px-6',
        'py-2',
        'md:py-5',
        'text-right',
        'focus:outline-none',
        ...menuStyles
      ]"
    >
      <div>
        <span class="inline-block text-sm md:text-base">
          {{ username }}
        </span>
        <img
          v-if="state.avatar"
          :src="state.avatar"
          class="inline-block w-8 h-8 md:w-10 md:h-10 ml-2 md:ml-3 rounded-full object-cover"
        />
      </div>
      <ul
        v-show="state.isOpen"
        class="fixed flex flex-col w-44 md:w-48 top-16 md:top-20 right-0 rounded-lg md:rounded-xl border bg-gray-800"
      >
        <li>
          <router-link
            v-if="state.myProfile && state.myProfile.id"
            :to="`/users/${state.myProfile.id}`"
            class="inline-block md:h-12 h-15 my-2 w-full py-2 md:py-3 text-center text-white hover:bg-blue-700 focus:outline-none"
          >
            マイプロフィール
          </router-link>
        </li>
        <li>
          <button
            @click="confirmLogout"
            class="inline-block md:h-12 h-15 my-2 w-full py-2 md:py-3 text-center text-white hover:bg-blue-700 focus:outline-none"
          >
            ログアウト
          </button>
        </li>
      </ul>
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, watch } from "vue";
import { useRoute } from "vue-router";
import firebase from "firebase";
import { logout, getCurrentUser, getResourceUrl } from "@/firebase";
import { User } from "@/interfaces";
import { findMe } from "@/lib/firestore/users";

export default defineComponent({
  name: "AccountMenu",
  setup() {
    const state: {
      isOpen: boolean;
      currentUser: firebase.User | null;
      myProfile?: User;
      avatar?: string | null;
    } = reactive({
      isOpen: false,
      currentUser: getCurrentUser(),
      avatar: getCurrentUser()?.photoURL
    });

    const route = useRoute();

    watch(
      () => route.params,
      async () => {
        state.currentUser = getCurrentUser();

        const myProfile = await findMe();
        if (myProfile) {
          state.myProfile = myProfile;

          if (myProfile?.avatar) {
            const avatar = await getResourceUrl(myProfile.avatar);
            if (avatar) state.avatar = avatar;
          }
        } else {
          state.avatar = getCurrentUser()?.photoURL;
        }
      }
    );

    const username = computed(() => {
      const { myProfile, currentUser } = state;
      const profileName =
        myProfile && [myProfile.lastNameJP, myProfile.firstNameJP].join(" ");
      const googleName = currentUser?.displayName;
      return profileName || googleName;
    });

    const menuStyles = computed(() => {
      return state.isOpen ? ["bg-gray-800"] : [];
    });

    const confirmLogout = () => {
      if (!confirm("ログアウトしますか？")) return;
      logout();
    };

    const toggleDropdown = () => {
      state.isOpen = !state.isOpen;
    };

    return { state, username, menuStyles, confirmLogout, toggleDropdown };
  }
});
</script>
