<template>
  <div class="flex w-459px">
    <input-label
      input-id="lastNameId"
      required
      class="flex justify-start items-center flex-grow"
      >名前(ローマ字)</input-label
    >
    <input-field
      id="lastNameId"
      name="lastNameId"
      placeholder="Yamada"
      :value="lastName"
      @input="inputLastName"
      required
      class="w-150px mr-2"
    />
    <input-field
      id="firstNameId"
      name="firstNameId"
      placeholder="Taro"
      :value="firstName"
      @input="inputFirstName"
      required
      class="w-150px"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import InputLabel from "@/components/Form/Field/InputLabel.vue";
import InputField from "@/components/Form/Field/InputField.vue";

export default defineComponent({
  name: "FieldName",
  components: {
    InputLabel,
    InputField
  },
  props: {
    lastName: String,
    firstName: String,
    inputLastName: Function as PropType<(e: Event) => void>,
    inputFirstName: Function as PropType<(e: Event) => void>
  },
  setup() {
    const lastNameId = "lastName";
    const firstNameId = "firstName";

    return {
      lastNameId,
      firstNameId
    };
  }
});
</script>
