<template>
  <label :for="inputId" class="font black inline-block"
    >{{ labelPrefixText }}<slot
  /></label>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "InputLabel",
  props: {
    inputId: {
      type: String,
      value: ""
    },
    required: {
      type: Boolean,
      value: false
    }
  },
  setup(props) {
    const labelPrefixText = computed(() => (props.required ? "★" : null));
    return {
      labelPrefixText
    };
  }
});
</script>
