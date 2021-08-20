<template>
  <footer
    class="absolute bottom-0 inset-x-0 w-screen h-12 md:h-20 py-3 md:py-6 text-center bg-black text-white"
  >
    <the-copyright />
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheCopyright from "@/components/Global/Footer/TheCopyright.vue";

export default defineComponent({
  name: "TheFooter",
  components: { TheCopyright }
});
</script>
