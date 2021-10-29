<template>
  <ul>
    <li v-for="(url, index) in urls" :key="index">
      <ogp-view-list-item :url="url" />
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import OgpViewListItem from "@/components/Common/OgpViewListItem.vue";

export default defineComponent({
  name: "OgpViewLis",
  components: { OgpViewListItem },
  props: {
    urls: {
      type: Array as PropType<string[]>,
      required: true
    }
  }
});
</script>

<style scoped></style>
