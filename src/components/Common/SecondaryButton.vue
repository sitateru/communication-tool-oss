<template>
  <button
    :class="
      `w-${width || 300}px h-${height ||
        60}px bg-white text-black font text-${fontSize ||
        18}px hover:bg-gray-300 border border-black`
    "
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SecondaryButton",
  props: {
    height: {
      type: Number,
      required: false
    },
    width: {
      type: Number,
      required: false
    },
    fontSize: {
      type: Number,
      required: false
    }
  }
});
</script>
