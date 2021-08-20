<template>
  <template v-if="tweetsDisplayable">
    <ul>
      <template v-for="tweet in tweets">
        <tweet-row
          v-if="!tweet.replyTo"
          :key="tweet.id"
          :tweet="tweet"
          :user-id="userId"
          :my-user-id="myUserId"
        />
      </template>
    </ul>
  </template>
  <template v-else>
    Nothing to show yet
  </template>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "vue";
import { Tweet } from "@/interfaces/tweets";
import TweetRow from "@/components/Tweet/TweetRow.vue";
import { findMe } from "@/lib/firestore/users";

export default defineComponent({
  components: {
    TweetRow
  },
  name: "TweetTimeline",
  props: {
    tweets: {
      type: Array as PropType<Tweet[]>,
      required: true
    },
    userId: {
      type: String,
      required: true
    }
  },
  async setup(props) {
    const user = await findMe();

    const tweetsDisplayable = computed(() => {
      return props.tweets.length > 0;
    });

    return { tweetsDisplayable, myUserId: user?.id || "" };
  }
});
</script>

<style lang="scss"></style>
