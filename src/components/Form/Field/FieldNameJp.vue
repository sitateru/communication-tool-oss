<template>
  <div class="flex w-459px">
    <input-label
      input-id="lastNameJpId"
      required
      class="flex justify-start items-center flex-grow"
      >名前(漢字)</input-label
    >
    <input-field
      id="lastNameJpId"
      name="lastNameJpId"
      placeholder="山田"
      :value="lastName"
      @input="inputLastName"
      required
      class="w-150px mr-2"
    />
    <input-field
      id="firstNameJpId"
      name="firstNameJpId"
      placeholder="太郎"
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
  name: "FieldNameJp",
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
    const lastNameJpId = "lastNameJP";
    const firstNameJpId = "firstNameJP";

    return {
      lastNameJpId,
      firstNameJpId
    };
  }
});
</script>
