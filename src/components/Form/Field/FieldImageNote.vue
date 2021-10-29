<template>
  <div class="inline-flex flex-col">
    <input-label class="mb-2">画像</input-label>
    <div class="flex flex-row w-full overflow-x-auto">
      <div
        v-for="(file, index) in files"
        :key="index"
        class="w-200px h-200px mr-32px flex-shrink-0 relative"
      >
        <input-image
          :ref="setInputImage(index)"
          :path="getImagePath(file)"
          :change="changeFile(index)"
          :disabled="toDisableInputFile(index)"
          class="w-full h-full"
        />
        <div v-if="file" class="image-delete" @click="deleteFile(index)">×</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref } from "vue";
import InputLabel from "@/components/Form/Field/InputLabel.vue";
import InputImage from "@/components/Form/Field/InputImage.vue";

type NullableImageFiles = Array<string | File | null>;
export type ImageFiles = Array<string | File>;

export default defineComponent({
  name: "FieldImageNote",
  components: {
    InputLabel,
    InputImage
  },
  props: {
    paths: {
      type: Array as PropType<string[]>,
      default: () => []
    },
    changeFiles: {
      type: Function as PropType<(files: ImageFiles) => void>,
      required: true
    }
  },
  async setup(props) {
    const inputImages = new Array(5);

    function setInputImage(index: number) {
      return (el: Ref) => {
        inputImages[index] = el;
      };
    }

    const files = ref<NullableImageFiles>(
      props.paths.concat(new Array(5).fill(null)).slice(0, 5)
    );

    const getImagePath = (file: string | File | null) =>
      typeof file === "string" ? file : null;

    function toDisableInputFile(index: number) {
      if (index === 0) return false;
      return !files.value[index - 1];
    }

    function changeFile(index: number) {
      return (file: File | null) => {
        const newFiles = files.value.concat();
        newFiles[index] = file;

        files.value = newFiles;
        props.changeFiles(newFiles.filter(Boolean) as ImageFiles);
      };
    }

    function deleteFile(index: number) {
      if (files.value[index]) {
        changeFile(index)(null);
      }
      if (inputImages[index]) {
        inputImages[index].onInputDelete();
      }
    }

    return {
      setInputImage,
      files,
      getImagePath,
      toDisableInputFile,
      changeFile,
      deleteFile
    };
  }
});
</script>

<style scoped>
.image-delete {
  @apply absolute top-4 right-4;
  @apply w-6 h-6 rounded-xl;
  @apply text-24px leading-4 text-center font-medium;
  @apply text-gray-200 bg-gray-600 cursor-pointer;
}
</style>
