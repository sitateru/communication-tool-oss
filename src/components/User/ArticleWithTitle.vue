<template>
  <div v-if="body" class="mx-3">
    <div class="px-2 text-gray-700 bg-gray-200">
      {{ title }}
    </div>
    <div class="px-2">
      <p
        v-for="(safeHTML, index) in paragraphs"
        :key="index"
        class="mt-2 whitespace-pre-line"
        :class="className"
        v-html="safeHTML"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { safeHtmlWithLink } from "@/utils";

export default defineComponent({
  name: "ArticleWithTitle",
  props: {
    title: {
      type: String,
      required: true
    },
    body: {
      type: String,
      default: ""
    },
    large: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const paragraphs = computed(() =>
      props.body
        .split("\n\n")
        .map(text => safeHtmlWithLink(text, "text-blue underline"))
    );
    const className = computed(() => ({ "text-2xl": props.large }));

    return { paragraphs, className };
  }
});
</script>
