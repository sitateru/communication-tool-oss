<template>
  <div class="flex flex-col w-480px">
    <input-label
      element-id="alcohol"
      class="flex justify-start items-center flex-grow"
      >お酒</input-label
    >
    <div class="flex justify-between">
      <select
        id="alcohol"
        class="w-80px h-50px box-border border border-gray rounded-4px pl-16px"
        @input="inputAlcohol"
      >
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :selected="option.selected"
        >
          {{ option.text }}
        </option>
      </select>
      <input-field
        :id="alcoholCommentId"
        :name="alcoholCommentId"
        :value="alcoholComment"
        @input="inputAlcoholComment"
        class="w-383px"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import InputLabel from "@/components/Form/Field/InputLabel.vue";
import InputField from "@/components/Form/Field/InputField.vue";

export default defineComponent({
  name: "FieldAlcohol",
  components: { InputField, InputLabel },
  props: {
    alcohol: {
      type: Boolean,
      default: null
    },
    inputAlcohol: Function as PropType<(e: Event) => void>,
    alcoholComment: String,
    inputAlcoholComment: Function as PropType<(e: Event) => void>
  },
  setup(props) {
    const alcoholId = "alcohol";
    const alcoholCommentId = "alcoholComment";
    const options = computed(() => [
      { text: "-", value: "", selected: props.alcohol === null },
      { text: "🙆‍♀️", value: true, selected: props.alcohol === true },
      { text: "🙅‍♂️", value: false, selected: props.alcohol === false }
    ]);

    return {
      alcoholId,
      alcoholCommentId,
      options
    };
  }
});
</script>
