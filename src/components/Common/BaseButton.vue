<template>
  <span class="tooltip-container relative">
    <button class="focus:outline-none" :class="buttonClass" @click="onClick">
      <slot />
    </button>
    <div v-if="tooltipText" class="tooltip" :class="tooltipTopClass">
      {{ tooltipText }}
    </div>
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseButton",
  props: {
    tooltipText: {
      type: String
    },
    buttonClass: {
      type: String
    },
    tooltipTopClass: {
      type: String,
      default: "mt-1"
    }
  },
  setup(props, { emit }) {
    const onClick = (e: Event) => {
      emit("click", e);
    };

    return {
      onClick
    };
  }
});
</script>

<style scoped>
.tooltip-container .tooltip::before {
  content: "";
  @apply absolute;
  @apply border-4 border-solid border-transparent;
  border-bottom-color: rgb(112, 112, 112);
  @apply left-1/2 bottom-full;
  @apply transform -translate-x-1/2;
}

.tooltip-container .tooltip {
  @apply hidden;
  @apply absolute;
  @apply text-xs text-white;
  @apply max-w-xs bg-gray-dark rounded p-2 py-1;
  @apply left-1/2;
  @apply transform -translate-x-1/2;
  @apply z-50;
}

.tooltip-container:hover .tooltip {
  @apply block;
}
</style>
