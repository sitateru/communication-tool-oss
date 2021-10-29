<template>
  <div v-if="state.title" class="mt-24px flex gap-3">
    <div class="w-3px h-fll bg-quote rounded-full"></div>
    <div class="max-w-429px">
      <div class="text-blue">
        <a
          :href="url"
          target="_blank"
          class="font-semibold text-blue text-14px"
          >{{ state.title }}</a
        >
      </div>
      <div class="text-12px mt-8px">
        {{ state.description }}
      </div>
      <div v-if="state.isShowImage" class="mt-12px">
        <img
          width="300"
          class="object-cover"
          :src="state.image"
          @error="onError"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import { GET_OGP_FUNCTIONS_URL } from "@/config";
import { isString } from "lodash";

interface State {
  title?: string;
  description?: string;
  image?: string;
  isShowImage: boolean;
}

export default defineComponent({
  name: "OgpViewLisItem",
  props: {
    url: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const state = reactive<State>({
      isShowImage: false
    });

    onMounted(async () => {
      const url = `${GET_OGP_FUNCTIONS_URL}?url=${props.url}`;
      try {
        const result = await fetch(url, {
          method: "get",
          mode: "cors",
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        });

        const data = (await result.json()) as {
          ogp?: {
            title?: string;
            type?: string;
            description?: string;
            image?: string | { url?: string; secure_url?: string };
          };
        };

        const { ogp } = data;
        if (!ogp) return;

        const { title, description, image } = ogp;

        if (title && isString(title)) {
          state.title = title;
        }

        if (description && isString(description)) {
          state.description = description;
        }

        if (image) {
          if (isString(image)) {
            state.image = image;
            state.isShowImage = true;
          } else {
            if (image.url) {
              state.image = image.url;
              state.isShowImage = true;
            }

            if (image.secure_url) {
              state.image = image.secure_url;
              state.isShowImage = true;
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
    });

    const onError = () => (state.isShowImage = false);

    return {
      state,
      onError
    };
  }
});
</script>
