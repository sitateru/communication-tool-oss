<template>
  <Suspense>
    <template #default>
      <tweet-widget />
    </template>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TweetWidget from "@/components/Tweet/TweetWidget.vue";

export default defineComponent({
  name: "Tweets",
  components: {
    TweetWidget
  }
});
</script>
