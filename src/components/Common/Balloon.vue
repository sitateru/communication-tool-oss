<template>
  <img ref="element" :src="src" :style="randomStyle" />
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref } from "vue";
import { randomInt } from "@/lib/util";

export default defineComponent({
  name: "Balloon",
  props: {
    src: {
      type: String,
      required: true
    }
  },
  setup() {
    const element = ref<HTMLElement | null>(null);

    const randomStyle = computed(() => {
      const windowY = window.innerHeight;
      const animation = `animation: rise ${randomInt(3, 10)}s linear 1`;
      const position = `left: ${randomInt(0, 100)}%`;
      const top = `top: ${windowY}px`;
      return `${animation}; ${position}; ${top};`;
    });

    const listner = () => {
      element.value?.remove();
    };

    onMounted(() => element.value?.addEventListener("animationend", listner));
    onUnmounted(() =>
      element.value?.removeEventListener("animationend", listner)
    );

    return { element, randomStyle };
  }
});
</script>

<style scoped>
img {
  width: auto;
  height: 10vh;
  position: absolute;
}
</style>

<style>
@keyframes rise {
  0% {
    transform: translateY(0%);
  }

  100% {
    transform: translateY(-1000%);
  }
}
</style>
