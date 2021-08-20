<template>
  <carousel
    v-if="urls.length"
    :current-slide="current"
    wrap-around
    class="w-4/5 h-4/5"
  >
    <slide v-for="url in urls" :key="url" class="hoge">
      <img :src="url" class="h-full object-cover" />
    </slide>

    <template #addons>
      <navigation />
      <pagination />
    </template>
  </carousel>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

export default defineComponent({
  name: "ImageCarousel",
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation
  },
  props: {
    urls: {
      type: Array as PropType<string[]>,
      required: true
    },
    current: {
      type: Number,
      default: 0
    }
  }
});
</script>

<style>
.carousel__viewport {
  @apply h-full;
}

.carousel__track {
  @apply h-full;
}

.carousel__prev,
.carousel__next {
  @apply bg-black h-16 w-16 text-4xl;
}

.carousel__prev:focus,
.carousel__next:focus {
  @apply outline-none;
}

.carousel__pagination-button {
  @apply bg-gray-300;
}

.carousel__pagination-button--active {
  @apply bg-black;
}
</style>
