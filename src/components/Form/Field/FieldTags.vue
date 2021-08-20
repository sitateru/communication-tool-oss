<template>
  <div>
    <input-label :input-id="id" class="mb-2"
      >タグ（,で区切ってください）</input-label
    >
    <div
      @click="onClickContainer"
      class="flex flex-wrap items-baseline h-100px black box-border border border-gray rounded-4px font h-100px p-16px"
    >
      <tag-label v-for="(tag, index) in tags" :key="index" :tag="tag" /><input
        ref="inputRef"
        :id="id"
        :value="text"
        @input="onInput"
        @click.stop
        @keydown="onKeydown"
        @blur="onBlur"
        class="flex-grow focus:outline-none text-12px"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import InputLabel from "@/components/Form/Field/InputLabel.vue";
import TagLabel from "@/components/Form/Field/TagLabel.vue";

export default defineComponent({
  name: "FieldTags",
  components: { TagLabel, InputLabel },
  props: {
    values: {
      type: Array as PropType<string[]>,
      default: () => []
    },
    change: {
      type: Function as PropType<(tags: string[]) => void>,
      required: true
    }
  },
  setup(props) {
    const id = "tags";
    const tags = ref<string[]>(props.values);
    const text = ref<string>("");
    const inputRef = ref<HTMLInputElement | null>(null);

    function onInput(e: Event) {
      if (e.target instanceof HTMLInputElement) {
        if (/^[^,]+,$/.test(e.target.value)) {
          const tag = e.target.value.replace(",", "");
          const newTags: string[] = Array.from(new Set([...tags.value, tag]));

          tags.value = newTags;
          text.value = "";

          props.change(newTags);
          return;
        }

        text.value = e.target.value;
      }
    }

    function onClickContainer() {
      if (inputRef.value) {
        inputRef.value.focus();
      }
    }

    function onKeydown(e: KeyboardEvent) {
      if (e.key === "Backspace" && !text.value && tags.value.length) {
        tags.value.pop();
        props.change(tags.value);
      }
    }

    function onBlur() {
      if (text.value) {
        tags.value.push(text.value);

        text.value = "";
        props.change(tags.value);
      }
    }

    return {
      onClickContainer,
      id,
      tags,
      inputRef,
      text,
      onInput,
      onKeydown,
      onBlur
    };
  }
});
</script>
