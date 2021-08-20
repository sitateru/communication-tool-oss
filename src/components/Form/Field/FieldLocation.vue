<template>
  <div class="flex w-274px">
    <input-label
      element-id="location"
      required
      class="flex justify-start items-center flex-grow"
      >オフィス</input-label
    >
    <select
      id="location"
      class="w-123px h-50px box-border border border-gray rounded-4px pl-16px"
      :value="value"
      @input="input"
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
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import InputLabel from "@/components/Form/Field/InputLabel.vue";
import { offices } from "@/config";

export default defineComponent({
  name: "FieldLocation",
  components: { InputLabel },
  props: {
    value: {
      type: String,
      value: "kumamoto"
    },
    input: Function as PropType<(e: Event) => void>
  },
  setup() {
    const options = offices.length
      ? offices
      : [
          {
            value: "default",
            text: "未設定",
            selected: true,
            label: "Somewhere"
          }
        ];

    return {
      options
    };
  }
});
</script>
