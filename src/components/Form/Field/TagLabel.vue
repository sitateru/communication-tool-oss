<template>
  <span
    class="text-12px text-white bg-black font font-normal rounded-4px py-6px px-8px mr-8px mb-4px"
    >{{ tag }}</span
  >
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TagLabel",
  props: {
    tag: {
      type: String,
      required: true
    }
  }
});
</script>
