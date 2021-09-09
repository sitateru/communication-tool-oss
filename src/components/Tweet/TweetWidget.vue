<template>
  <div
    class="bg-gray-100 absolute w-full top-0 pt-20 md:pt-32 pb-20 px-5 md:px-10"
  >
    <div class="h-full">
      <tweet-editor :user-id="myUserId" class="pt-10" />
      <tweet-timeline :my-user-id="myUserId" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Tweet } from "@/interfaces/tweets";
import router from "@/router";
import TweetTimeline from "@/components/Tweet/TweetTimeline.vue";
import TweetEditor from "@/components/Tweet/TweetEditor.vue";
import { findMe } from "@/lib/firestore/users";

interface State {
  tweets: { [id: string]: Tweet };
}

export default defineComponent({
  components: {
    TweetTimeline,
    TweetEditor
  },
  name: "TweetWidget",
  async setup() {
    const myData = await findMe();
    if (!myData) {
      await router.replace({ name: "Top" });
      return { myUserId: "" };
    }

    return { myUserId: myData.id };
  }
});
</script>

<style lang="scss"></style>
