<template>
  <!-- TODO: /home が実装され次第、リダイレクト先を /home に戻す -->
  <user-form redirect="/users" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UserForm from "@/components/Form/UserForm.vue";

export default defineComponent({
  name: "Register",
  components: {
    UserForm
  }
});
</script>
