<template>
  <div class="flex flex-col">
    <input-label :input-id="id" class="block text-left mb-2"
      >スキル</input-label
    >
    <input-field
      :id="id"
      :name="id"
      :value="value"
      @input="input"
      placeholder="記入例）Photoshop,Illustrator,XD（印刷物は×）割と動きのあるプロトタイピングの制作も可能です。"
      class="w-full"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import InputLabel from "@/components/Form/Field/InputLabel.vue";
import InputField from "@/components/Form/Field/InputField.vue";

export default defineComponent({
  name: "FieldSkill",
  components: {
    InputLabel,
    InputField
  },
  props: {
    value: String,
    input: Function as PropType<(e: Event) => void>
  },
  setup() {
    const id = "skill";

    return {
      id
    };
  }
});
</script>
