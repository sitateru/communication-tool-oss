<template>
  <screen :disabled="disabled">
    <template v-slot:default>
      <slot />
    </template>

    <template v-slot:content>
      <img :src="url" class="bg-white h-3/4 object-cover z-10" />
    </template>
  </screen>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, watch } from "vue";
import { getResourceUrl } from "@/firebase";
import Screen from "@/components/Common/Screen.vue";

export default defineComponent({
  name: "ImagePreview",
  components: {
    Screen
  },
  props: {
    url: {
      type: String,
      default: ""
    },
    previewable: {
      type: Boolean,
      required: true
    }
  },
  setup(props) {
    const disabled = computed(() => !props.previewable || !props.url);
    return { disabled };
  }
});
</script>
