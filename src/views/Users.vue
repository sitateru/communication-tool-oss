<template>
  <div class="flex justify-center pt-20 pb-9">
    <Suspense>
      <template #default>
        <user-list />
      </template>
      <template #fallback>
        Loading...
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UserList from "@/components/User/UserList.vue";

export default defineComponent({
  name: "Users",
  components: {
    UserList
  }
});
</script>
