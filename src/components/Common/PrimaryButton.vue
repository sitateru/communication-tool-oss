<template>
  <button
    :class="
      `primary-button button w-${width || 300}px h-${height ||
        60}px bg-black text-white font text-${fontSize ||
        18}px hover:bg-gray-700 focus:outline-none disabled:bg-gray`
    "
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PrimaryButton",
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

<style scoped>
.primary-button:disabled {
  cursor: not-allowed;
}
</style>
