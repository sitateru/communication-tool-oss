<template>
  <div class="flex flex-col">
    <input-label :input-id="id" class="block text-left mb-2"
      >学生時代に学んでいたこと</input-label
    >
    <input-field
      :id="id"
      :name="id"
      :value="value"
      @input="input"
      class="w-480px"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import InputLabel from "@/components/Form/Field/InputLabel.vue";
import InputField from "@/components/Form/Field/InputField.vue";

export default defineComponent({
  name: "FieldMajor",
  components: {
    InputLabel,
    InputField
  },
  props: {
    value: String,
    input: Function as PropType<(e: Event) => void>
  },
  setup() {
    const id = "major";

    return {
      id
    };
  }
});
</script>
