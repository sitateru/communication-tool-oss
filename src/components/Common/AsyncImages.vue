<template>
  <screen v-if="state.urls.length" :disabled="disabled">
    <template v-slot:default>
      <img
        v-for="(url, index) in state.urls"
        :key="index"
        :src="url"
        @click="onClickImageNote(index)"
        class="w-48 h-48 m-2 object-cover"
      />
    </template>

    <template v-slot:content>
      <image-carousel
        v-if="state.urls.length"
        :urls="state.urls"
        :current="state.index"
      />
    </template>
  </screen>
</template>

<script lang="ts">
import Screen from "@/components/Common/Screen.vue";
import ImageCarousel from "@/components/Common/ImageCarousel.vue";
import { computed, defineComponent, PropType, reactive, watch } from "vue";
import { getResourceUrl } from "@/firebase";

interface State {
  urls: string[];
  index: number;
}

export default defineComponent({
  name: "AsyncImages",
  components: {
    Screen,
    ImageCarousel
  },
  props: {
    paths: {
      type: Array as PropType<string[]>,
      required: true
    },
    previewable: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const state = reactive<State>({ urls: [], index: 0 });

    const disabled = computed(() => !state.urls.length);

    function onClickImageNote(index: number) {
      state.index = index;
    }

    watch(
      () => props.paths,
      async newPaths => {
        const resources = await Promise.all(
          newPaths.map(path => getResourceUrl(path))
        );
        state.urls = resources.filter(Boolean) as string[];
      },
      { immediate: true }
    );

    return { state, disabled, onClickImageNote };
  }
});
</script>
