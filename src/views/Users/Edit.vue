<template>
  <Suspense>
    <template #default>
      <user-form v-if="user" :user="user" :redirect="`/users/${user.id}`" />
    </template>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import { findUser } from "@/lib/firestore/users";
import UserForm from "@/components/Form/UserForm.vue";
import router from "@/router";
import { getCurrentUser } from "@/firebase";
import { User } from "@/interfaces";

export default defineComponent({
  name: "UserEdit",
  components: { UserForm },
  async setup() {
    const id = useRoute().params.id as string;

    const userDocument = await findUser(id);
    if (userDocument) {
      const isMyProfile = userDocument.updatedBy === getCurrentUser()?.email;

      if (!isMyProfile) {
        router.replace(`/users/${id}`);
        return {};
      }
      return { user: { ...userDocument, id } };
    }

    // userDocumentがないのは想定していない.
    return { user: {} };
  }
});
</script>
