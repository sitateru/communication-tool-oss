<template>
  <input
    :id="id"
    :type="type"
    :name="name"
    :placeholder="placeholder"
    :value="value"
    :pattern="pattern"
    :required="required"
    class="w-full font-input black box-border border border-gray rounded-4px font h-50px pl-16px placeholder-lightest"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "InputField",
  props: {
    id: {
      type: String,
      value: ""
    },
    type: {
      type: String,
      value: "text"
    },
    pattern: {
      type: String,
      value: ""
    },
    placeholder: {
      type: String,
      value: ""
    },
    value: {
      type: String,
      value: ""
    },
    name: {
      type: String,
      value: ""
    },
    required: {
      type: Boolean,
      value: false
    }
  }
});
</script>
