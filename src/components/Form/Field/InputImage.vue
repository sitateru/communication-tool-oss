<template>
  <div
    class="flex truncate box-border"
    :class="containerStyle"
    @click="onClick"
  >
    <img v-if="src" :src="src" class="object-cover w-full h-full" />
    <div v-else class="relative w-full h-full">
      <div class="input-image-add">
        ＋
      </div>
    </div>
    <input
      :id="id"
      :name="name"
      ref="inputFile"
      type="file"
      accept="image/*"
      class="input-image-file"
      @click.stop
      @change="onInputChange"
      :disabled="disabled"
      :required="required"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import { getResourceUrl } from "@/firebase";

/**
 * NOTE: input[type="file"]にvalueを設定することはできません
 */
export default defineComponent({
  name: "InputImage",
  props: {
    id: {
      type: String,
      value: ""
    },
    name: {
      type: String,
      value: ""
    },
    path: {
      type: String,
      default: null
    },
    change: {
      type: Function as PropType<(file: File) => void>,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  async setup(props) {
    const url = props.path ? await getResourceUrl(props.path) : null;
    const src = ref<string | ArrayBuffer | null>(url);
    const inputFile = ref<HTMLInputElement>();
    const containerStyle = computed(() => {
      const baseStyle = ["relative"];
      const emptyStyle = baseStyle.concat([
        "border-dashed",
        "border-2",
        "border-gray-dark"
      ]);

      if (src.value) return baseStyle;
      if (props.disabled) {
        emptyStyle.push("opacity-25", "cursor-default");
      }

      return emptyStyle;
    });

    function setImageSrc(file: File) {
      const reader = new FileReader();
      reader.addEventListener("load", () => (src.value = reader.result), false);
      reader.readAsDataURL(file);
    }

    function onClick() {
      inputFile.value?.click();
    }

    function onInputChange(e: Event) {
      if (e.target instanceof HTMLInputElement && e.target.files) {
        const [file] = e.target.files;
        if (file && file.type.startsWith("image/")) {
          setImageSrc(file);
          props.change(file);
        }
      }
    }

    function onInputDelete() {
      src.value = null;
    }

    return {
      src,
      inputFile,
      containerStyle,
      onClick,
      onInputChange,
      onInputDelete
    };
  }
});
</script>

<style scoped>
.input-image-add {
  @apply flex justify-center items-center;
  @apply h-full w-full;
  @apply text-40px text-gray-dark bg-white;
}

.input-image-file {
  @apply absolute;
  @apply w-full h-full;
  @apply opacity-0;
  @apply cursor-pointer;
}
</style>
