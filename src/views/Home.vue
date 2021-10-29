<template>
  <div />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import router from "@/router";
import { getCurrentUser } from "@/firebase";
import { fetchUsers } from "@/lib/firestore/users";

export default defineComponent({
  name: "Home",
  async setup() {
    const currentUser = getCurrentUser();

    // 自身のプロフィールを登録済みかチェック
    const users = await fetchUsers();
    const registered = users?.some(
      user => user?.updatedBy === currentUser?.email
    );

    const destination = registered ? "Users" : "Register";
    router.replace({ name: destination });
  }
});
</script>
