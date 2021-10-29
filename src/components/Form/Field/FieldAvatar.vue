<template>
  <div class="inline-flex flex-col">
    <input-image
      ref="inputImage"
      :id="id"
      :path="path"
      :change="change"
      class="w-120px h-120px rounded-full items-center"
    />
    <input-label :input-id="id" class="w-120px mt-2 text-center"
      >顔写真</input-label
    >
    <a
      href="#"
      @click.prevent="onClick"
      class="w-120px mt-2 text-center underline text-blue"
      >変更する</a
    >
    <a
      href="#"
      @click.prevent="deleteImage"
      class="w-120px mt-2 text-center underline text-blue"
      >削除する</a
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import InputLabel from "@/components/Form/Field/InputLabel.vue";
import InputImage from "@/components/Form/Field/InputImage.vue";

export default defineComponent({
  name: "FieldAvatar",
  components: {
    InputLabel,
    InputImage
  },
  props: {
    path: {
      type: String,
      default: null
    },
    change: {
      type: Function as PropType<(file: File | null) => void>,
      required: true
    }
  },
  async setup(props) {
    const id = "avatar";

    const inputImage = ref<InstanceType<typeof InputImage>>();

    function onClick() {
      if (inputImage.value) {
        inputImage.value.$el.click();
      }
    }

    function deleteImage() {
      if (inputImage.value) {
        inputImage.value.onInputDelete();
        props.change(null);
      }
    }

    return {
      id,
      inputImage,
      onClick,
      deleteImage
    };
  }
});
</script>
