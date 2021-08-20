<template>
  <div class="flex flex-col">
    <input-label :input-id="id" class="block text-left mb-2"
      >入社日</input-label
    >
    <input-field
      :id="id"
      type="date"
      :name="id"
      :value="value"
      @change="change"
      class="w-160px"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import InputLabel from "@/components/Form/Field/InputLabel.vue";
import InputField from "@/components/Form/Field/InputField.vue";

export default defineComponent({
  name: "FieldJoiningDay",
  components: {
    InputLabel,
    InputField
  },
  props: {
    value: String,
    change: Function as PropType<(e: Event) => void>
  },
  setup() {
    const id = "joiningDay";

    return {
      id
    };
  }
});
</script>
