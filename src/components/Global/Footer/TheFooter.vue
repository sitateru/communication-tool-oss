<template>
  <footer
    class="bottom-0 inset-x-0 w-screen h-12 md:h-20 py-3 md:py-6 text-center bg-black text-white"
    :class="className"
  >
    <the-copyright />
  </footer>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, watch } from "vue";
import TheCopyright from "@/components/Global/Footer/TheCopyright.vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "TheFooter",
  components: { TheCopyright },
  setup() {
    const route = useRoute();
    const state = reactive({ path: "" });

    watch(
      () => route.name,
      () => {
        state.path = route.path;
      },
      {
        immediate: true
      }
    );

    const className = computed(() =>
      state.path !== "/tweets" ? "absolute" : "hidden"
    );

    return { className };
  }
});
</script>
