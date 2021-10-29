<template>
  <div class="flex flex-col justify-center">
    <span class="font-corp text-3xl">{{ locationName }}</span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { offices } from "@/config";

export default defineComponent({
  name: "LocationLabel",
  props: {
    location: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const locationName = computed(() => {
      const location = offices.find(
        element => element.value === props.location
      );
      return location ? location.label : "on a third place";
    });
    return { locationName };
  }
});
</script>
