<template>
  <div class="">
    <div class="max-w-1000px mx-auto mb-2px">
      <input-label :input-id="id" class="mr-32px">カバー画像</input-label>
      <a href="#" @click.prevent="onClick" class="mr-32px underline text-blue"
        >変更する</a
      >
      <a href="#" @click.prevent="deleteImage" class="underline text-blue"
        >削除する</a
      >
    </div>
    <input-image
      ref="inputImage"
      :id="id"
      :path="path"
      :change="change"
      class="w-f h-276px"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import InputLabel from "@/components/Form/Field/InputLabel.vue";
import InputImage from "@/components/Form/Field/InputImage.vue";

export default defineComponent({
  name: "FieldCoverImage",
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
    const id = "cover-image";
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
