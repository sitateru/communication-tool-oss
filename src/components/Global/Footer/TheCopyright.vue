<template>
  <p>
    <small class="text-xs md:text-base font-corp" v-html="text"> </small>
  </p>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { copyright } from "@/config";

export default defineComponent({
  name: "TheCopyright",
  setup() {
    const text = copyright || "communication-tool";
    return { text };
  }
});
</script>
