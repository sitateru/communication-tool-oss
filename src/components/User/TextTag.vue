<template>
  <span class="px-2 py-1 text-sm text-white bg-black rounded-md">{{
    text
  }}</span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TextTag",
  props: {
    text: {
      type: String,
      required: true
    }
  }
});
</script>
