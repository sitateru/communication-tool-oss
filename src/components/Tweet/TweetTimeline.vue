<template>
  <template v-if="tweetsDisplayable">
    <div class="pb-20">
      <ul ref="container">
        <template v-for="tweet in state.tweets">
          <tweet-row
            v-if="!tweet.replyTo"
            :key="tweet.id"
            :tweet="tweet"
            :my-user-id="myUserId"
          />
        </template>
      </ul>
      <div v-if="state.isLoading" class="flex justify-center">
        <vue-loaders-line-scale color="#0A84FF" scale="0.7" />
      </div>
    </div>
  </template>
  <template v-else>
    Nothing to show yet
  </template>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  reactive,
  onMounted,
  onUnmounted,
  ref
} from "vue";
import { Tweet } from "@/interfaces/tweets";
import TweetRow from "@/components/Tweet/TweetRow.vue";
import { TweetDocument } from "@/interfaces/firestore";
import {
  getLatestTweets,
  getOlderTweets,
  listenTweets
} from "@/lib/firestore/tweets";
import firebase from "firebase";
import dayjs from "dayjs";
import { sortBy } from "@/utils";

interface State {
  tweets: Tweet[];
  lastTweetRef: firebase.firestore.QueryDocumentSnapshot<TweetDocument> | null;
  unsubscribe: (() => void) | null;
  isLoading: boolean;
}

export default defineComponent({
  components: {
    TweetRow
  },
  name: "TweetTimeline",
  props: {
    myUserId: {
      type: String,
      required: true
    }
  },
  async setup() {
    const now = dayjs().toISOString();
    const state = reactive<State>({
      tweets: [],
      lastTweetRef: null,
      unsubscribe: null,
      isLoading: false
    });
    const container = ref<HTMLElement | null>(null);

    const scroll = () => {
      const element = container.value;
      if (!element) return;

      // 300px手前になったら次のツイートを取得しにいく
      if (element.getBoundingClientRect().bottom - 300 <= window.innerHeight) {
        if (!state.lastTweetRef || state.isLoading) return;

        state.isLoading = true;

        getOlderTweets(state.lastTweetRef).then(
          ({ tweets, lastDocumentSnapshot }) => {
            state.tweets = state.tweets
              .concat(tweets)
              .sort((a, b) => sortBy(a, b, "updatedAt", "desc"));
            state.lastTweetRef = lastDocumentSnapshot;
            state.isLoading = false;
          }
        );
      }
    };

    onMounted(async () => {
      const { tweets, lastDocumentSnapshot } = await getLatestTweets(now);
      state.tweets = tweets.sort((a, b) => sortBy(a, b, "updatedAt", "desc"));
      state.lastTweetRef = lastDocumentSnapshot;

      state.unsubscribe = listenTweets(now, tweets => {
        const newTweets = state.tweets.concat(tweets);
        state.tweets = newTweets.sort((a, b) =>
          sortBy(a, b, "updatedAt", "desc")
        );
      });

      window.addEventListener("scroll", scroll);
    });

    onUnmounted(() => {
      if (state.unsubscribe) state.unsubscribe();
      window.removeEventListener("scroll", scroll);
    });

    const tweetsDisplayable = computed(() => {
      return state.tweets.length > 0;
    });

    return { state, container, tweetsDisplayable };
  }
});
</script>

<style lang="scss"></style>
