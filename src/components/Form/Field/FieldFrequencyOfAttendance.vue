<template>
  <div class="flex flex-col">
    <input-label :input-id="id" class="block text-left mb-2"
      >出社頻度</input-label
    >
    <div class="flex">
      <select
        :id="id"
        class="font h-50px box-border border border-gray rounded-4px pl-16px"
        :value="interval"
        @change.stop="inputInterval"
      >
        <option
          v-for="interval in intervals"
          :key="interval.value"
          :value="interval.value"
          >{{ interval.label }}</option
        >
      </select>
      <span class="flex justify-start items-center mx-2">に</span>
      <select
        class="font h-50px box-border border border-gray rounded-4px pl-16px disabled:bg-gray-300"
        :value="value"
        @change.stop="inputValue"
        :disabled="state.disabled"
      >
        <option v-for="value in values" :key="value.value" :value="value.value">
          {{ value.label }}
        </option>
      </select>
      <span class="flex justify-start items-center ml-2">日くらい</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, watch } from "vue";
import InputLabel from "@/components/Form/Field/InputLabel.vue";
import { FrequencyOfAttendanceInterval } from "@/interfaces";

export default defineComponent({
  name: "FieldFrequencyOfAttendance",
  components: { InputLabel },
  props: {
    interval: String as PropType<FrequencyOfAttendanceInterval>,
    value: Number,
    inputInterval: Function as PropType<(e: HTMLSelectElement) => void>,
    inputValue: Function as PropType<(e: HTMLSelectElement) => void>
  },
  setup(props) {
    const state = reactive({ disabled: false });

    watch(
      () => props.interval,
      interval => {
        if (interval) {
          state.disabled = false;
        } else {
          state.disabled = true;
        }
      },
      { immediate: true }
    );

    const id = "frequency-of-attendance-interval";
    const intervals = [
      { label: "-", value: "" },
      { label: "週", value: "week" },
      { label: "月", value: "month" },
      { label: "年", value: "year" }
    ];
    const values = [{ label: "-", value: "" }].concat(
      new Array(26).fill(null).map((_, index) => ({
        label: `${index}`,
        value: `${index}`
      }))
    );

    return {
      state,
      id,
      intervals,
      values
    };
  }
});
</script>
