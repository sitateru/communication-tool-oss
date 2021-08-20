<template>
  <div class="user grid grid-cols-1 md:grid-cols-3 gap-9">
    <template v-for="user in users" :key="user.id">
      <router-link :to="`/users/${user.id}`">
        <user-card
          :avatar="user.avatar"
          :name="name(user)"
          :nameJP="nameJP(user)"
        />
      </router-link>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { User } from "@/interfaces";
import UserCard from "@/components/User/UserCard.vue";
import { fetchUsers } from "@/lib/firestore/users";
import romkan from "romkan";

export default defineComponent({
  name: "UserList",
  components: {
    UserCard
  },
  async setup() {
    function name(user: User) {
      return `${user.firstName} ${user.lastName}`;
    }

    function nameJP(user: User) {
      return `${user.lastNameJP} ${user.firstNameJP}`;
    }

    function nameKana(user: User) {
      const name = `${user.lastName} ${user.firstName}`;
      return romkan(name);
    }

    const users: User[] = (await fetchUsers()).sort((a, b) => {
      const aName = nameKana(a);
      const bName = nameKana(b);
      if (aName < bName) return -1;
      if (aName > bName) return 1;
      return 0;
    });

    return {
      name,
      nameJP,
      users
    };
  }
});
</script>
