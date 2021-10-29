<template>
  <Suspense>
    <template #default>
      <user-info />
    </template>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UserInfo from "@/components/User/UserInfo.vue";

export default defineComponent({
  name: "User",
  components: {
    UserInfo
  }
});
</script>
