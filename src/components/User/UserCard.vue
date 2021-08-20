<template>
  <div class="flex flex-row border-solid border w-56 h-16 rounded-lg p-2">
    <async-image
      :imagePath="avatar"
      class="inline-block h-11 w-11 text-xs rounded-full"
    />
    <div class="flex flex-col ml-3 justify-center">
      <div class="text-base font-semibold text-left">
        {{ nameJP }}
      </div>
      <div class="text-xs text-left font-corp capitalize">
        {{ name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AsyncImage from "@/components/Common/AsyncImage.vue";

export default defineComponent({
  components: { AsyncImage },
  name: "UserCard",
  props: {
    name: String,
    nameJP: String,
    avatar: String
  }
});
</script>
