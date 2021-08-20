<template>
  <div class="flex w-292px">
    <input-label
      :input-id="id"
      class="flex justify-start items-center flex-grow"
      >身長</input-label
    >
    <input-field
      :id="id"
      :name="id"
      type="number"
      :value="String(value)"
      @input="input"
      class="w-141px"
    />
    <span class="flex justify-start items-center ml-2">cm</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import InputLabel from "@/components/Form/Field/InputLabel.vue";
import InputField from "@/components/Form/Field/InputField.vue";

export default defineComponent({
  name: "FieldHeight",
  components: {
    InputLabel,
    InputField
  },
  props: {
    value: {
      type: Number,
      default: null
    },
    input: Function as PropType<(e: Event) => void>
  },
  setup() {
    const id = "height";

    return {
      id
    };
  }
});
</script>
