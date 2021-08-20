<template>
  <div class="flex w-276px">
    <input-label
      for="birthday-month"
      class="flex justify-start items-center flex-grow"
      >誕生日</input-label
    >
    <select
      id="birthday-month"
      class="font h-50px box-border border border-gray rounded-4px pl-16px"
      :value="state.month"
      @change.stop="onChangeMonth"
    >
      <option v-for="month in months" :key="month" :value="month">{{
        month
      }}</option>
    </select>
    <span class="flex justify-start items-center mx-2">月</span>
    <select
      class="font h-50px box-border border border-gray rounded-4px pl-16px disabled:bg-gray-300"
      :value="state.day"
      @change.stop="onChangeDay"
      :disabled="idDisabled"
    >
      <option v-for="day in days" :key="day" :value="day">
        {{ day }}
      </option>
    </select>
    <span class="flex justify-start items-center ml-2">日</span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, watch } from "vue";
import InputLabel from "@/components/Form/Field/InputLabel.vue";

export default defineComponent({
  name: "FieldBirthday",
  components: { InputLabel },
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  setup(props, { emit }) {
    const getBirthday = (birthday: string) => {
      if (/^\d{2}\/\d{2}$/.test(birthday)) {
        const [month, day] = birthday.split("/");
        return {
          month: String(Number.parseInt(month, 10)),
          day: String(Number.parseInt(day, 10))
        };
      }
      return { month: "", day: "" };
    };

    const birthday = computed(() => getBirthday(props.value));
    const state = reactive({
      month: birthday.value.month,
      day: birthday.value.day
    });

    watch(state, newState => {
      const { month, day } = newState;
      if (month === "" || day === "") {
        emit("change", "");
      } else {
        emit("change", `${month.padStart(2, "0")}/${day.padStart(2, "0")}`);
      }
    });

    const onChangeMonth = (e: Event) => {
      if (e.target instanceof HTMLSelectElement) {
        state.month = e.target.value;

        if (e.target.value === "") {
          state.day = "";
        }
      }
    };

    const onChangeDay = (e: Event) => {
      if (e.target instanceof HTMLSelectElement) {
        state.day = e.target.value;
      }
    };

    const createNumbers = (num: number) =>
      [""].concat(new Array(num).fill(null).map((_, index) => `${index + 1}`));

    const months = createNumbers(12);

    const days = computed(() => {
      switch (state.month) {
        case "2":
          return createNumbers(29);
        case "4":
        case "6":
        case "9":
        case "11":
          return createNumbers(30);
        default:
          return createNumbers(31);
      }
    });

    const idDisabled = computed(() => state.month === "");

    return {
      state,
      months,
      days,
      onChangeMonth,
      onChangeDay,
      idDisabled
    };
  }
});
</script>
