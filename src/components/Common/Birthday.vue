<template>
  <div class="content">
    <balloon v-for="image of images" :key="image.id" :src="image.src" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Balloon from "./Balloon.vue";
import { range, randomPick } from "@/lib/util";

interface Image {
  id: number;
  src: string;
}

export default defineComponent({
  name: "Birthday",
  components: { Balloon },
  setup() {
    const images: Array<Image> = range(1, 30).map(i => {
      return {
        id: i,
        src: require("@/assets/image/balloons/" +
          randomPick([
            "red.png",
            "blue.png",
            "green.png",
            "lime.png",
            "orange.png",
            "pink.png",
            "purple.png",
            "skyblue.png",
            "yellow.png"
          ]))
      };
    });

    return { images };
  }
});
</script>

<style scoped>
.content {
  display: flex;
  overflow: hidden;
}
</style>
