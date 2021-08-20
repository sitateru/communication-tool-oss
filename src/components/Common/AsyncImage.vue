<template>
  <image-preview v-if="state.src" :previewable="previewable" :url="state.src">
    <img :src="state.src" :class="imageStyle" />
  </image-preview>
  <div
    v-else
    class="flex flex-wrap text-gray-500 bg-gray-300 justify-center content-center"
  >
    <span class="text-center">{{ emptyMessage }}</span>
  </div>
</template>

<script lang="ts">
import { getResourceUrl } from "@/firebase";
import { defineComponent, reactive, watch } from "vue";
import ImagePreview from "@/components/Common/ImagePreview.vue";

interface State {
  src?: string;
}

export default defineComponent({
  name: "AsyncImage",
  components: { ImagePreview },
  props: {
    imagePath: {
      type: String,
      default: ""
    },
    defaultImageUrl: {
      type: String,
      default: ""
    },
    emptyMessage: {
      type: String,
      default: "NO IMAGE"
    },
    previewable: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { attrs }) {
    const state = reactive<State>({});

    const imageStyle = ["object-cover"];
    if (attrs.class) imageStyle.push(attrs.class as string);

    watch(
      () => props.imagePath,
      async newValue => {
        state.src = (await getResourceUrl(newValue)) || props.defaultImageUrl;
      },
      { immediate: true }
    );

    return { state, imageStyle };
  }
});
</script>
