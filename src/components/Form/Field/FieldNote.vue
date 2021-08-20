<template>
  <div class="flex flex-col">
    <input-label :input-id="id" class="block text-left mb-2"
      >自由記述欄</input-label
    >
    <textarea
      :id="id"
      :name="id"
      :value="value"
      @input="input"
      class="w-full font-input black box-border border border-gray rounded-4px font h-100px p-16px placeholder-lightest"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import InputLabel from "@/components/Form/Field/InputLabel.vue";

export default defineComponent({
  name: "FieldNote",
  components: {
    InputLabel
  },
  props: {
    value: String,
    input: Function as PropType<(e: Event) => void>
  },
  setup() {
    const id = "note";

    return {
      id
    };
  }
});
</script>
