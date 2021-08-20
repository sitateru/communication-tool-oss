<template>
  <div class="flex justify-center">
    <img :src="src" :class="styles.app" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { appLogo } from "@/config";

export default defineComponent({
  name: "AppLogo",
  props: {
    size: {
      type: String,
      default: "medium"
    }
  },
  computed: {
    src() {
      switch (this.size) {
        case "large":
          return appLogo.large;
        default:
          return appLogo.default;
      }
    },
    styles() {
      switch (this.size) {
        case "large":
          return {
            app: ["mx-1", "md:mx-2"]
          };
        default:
          return {
            app: ["mx-1"]
          };
      }
    }
  }
});
</script>
