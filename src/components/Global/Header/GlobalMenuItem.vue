<template>
  <li class="mx-4 md:mx-8 text-lg font-corp">
    <span v-if="active" class="text-white border-b-2">
      {{ label }}
    </span>
    <router-link v-else :to="linkTo" class="text-gray-light hover:border-b-2">
      {{ label }}
    </router-link>
  </li>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "GlobalMenuItem",
  props: {
    label: {
      type: String,
      required: true
    },
    linkTo: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const active = computed(() => {
      return useRoute().path === props.linkTo;
    });
    return { active };
  }
});
</script>
