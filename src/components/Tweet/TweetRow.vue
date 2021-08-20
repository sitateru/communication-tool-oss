<template>
  <li class="py-6 border-b border-color-gray-500">
    <div class="flex">
      <router-link :to="`/users/${state.sender?.id}`">
        <async-image
          v-if="state.sender?.avatar"
          :imagePath="state.sender?.avatar"
          class="inline-block w-12 h-12 text-xs rounded-full"
        />
      </router-link>
      <div class="ml-2 flex flex-col flex-grow justify-center">
        <div class="relative">
          <router-link :to="`/users/${state.sender?.id}`">
            <span class="text-sm"
              >{{ state.sender?.lastNameJP }}
              {{ state.sender?.firstNameJP }}</span
            >
          </router-link>
          <span class="ml-2 text-xs text-gray-500">{{ updatedAt }}</span>
          <tweet-kit @select-reaction="selectReaction" />
        </div>
        <div class="mt-2 text-sm whitespace-pre-line">
          <p
            v-html="safeHtmlWithLink(tweet.content, 'text-blue underline')"
          ></p>
          <reaction-buttons
            :reactions="state.reactions"
            @add="addReaction"
            @remove="removeReaction"
          />
        </div>
        <div v-if="!tweet.replyTo">
          <ul>
            <tweet-row
              v-for="tweet in state.replayTweets"
              :key="tweet.id"
              :tweet="tweet"
              :user-id="userId"
              :my-user-id="myUserId"
            />
          </ul>
        </div>
        <div class="mt-3" v-if="!tweet.replyTo">
          <tweet-editor :user-id="userId" :reply-to="tweet" />
        </div>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import {
  computed,
  inject,
  reactive,
  defineComponent,
  onUnmounted,
  onMounted,
  PropType,
  watch
} from "vue";
import { User } from "@/interfaces";
import { TweetsKey } from "@/injectionKeys";
import AsyncImage from "@/components/Common/AsyncImage.vue";
import TweetEditor from "@/components/Tweet/TweetEditor.vue";
import { safeHtmlWithLink } from "@/utils";
import dayjs from "dayjs";
import TweetKit from "@/components/Tweet/TweetKit.vue";
import { addTweetReaction, removeTweetReaction } from "@/lib/firestore/tweets";
import { createReactionButtonsProps, ReactionButtonProps } from "@/lib/comment";
import ReactionButtons from "@/components/Common/ReactionButtons.vue";
import { Tweet } from "@/interfaces/tweets";
import { findUser } from "@/lib/firestore/users";

interface State {
  replayTweets: Tweet[];
  sender: User | null;
  reactions: ReactionButtonProps[];
}

export default defineComponent({
  components: {
    ReactionButtons,
    TweetKit,
    AsyncImage,
    TweetEditor
  },
  name: "TweetRow",
  props: {
    tweet: {
      type: Object as PropType<Tweet>,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
    myUserId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    let unsubscribe: (() => void) | undefined;

    const state: State = reactive({
      replayTweets: [],
      sender: null,
      reactions: []
    });

    const tweetsRef = inject(TweetsKey);

    onMounted(async () => {
      if (!tweetsRef) return;

      const tweetRef = await tweetsRef.doc(props.tweet.id);
      const query = tweetsRef
        .where("replyTo", "==", tweetRef)
        .orderBy("updatedAt", "asc");

      unsubscribe = query.onSnapshot(snapshot => {
        const tweets: Tweet[] = [];
        snapshot.forEach(doc => {
          tweets.push({ id: doc.id, ...doc.data() });
        });
        state.replayTweets = tweets;
      });
    });

    onUnmounted(() => {
      if (unsubscribe) unsubscribe();
    });

    watch(
      () => props.tweet.sender,
      async () => {
        state.sender = await findUser(props.tweet.sender.id);
      },
      {
        immediate: true
      }
    );
    watch(
      () => props.tweet.reactions,
      async () => {
        state.reactions = await createReactionButtonsProps(
          props.myUserId,
          props.tweet.reactions
        );
      },
      {
        immediate: true
      }
    );

    const updatedAt = computed(() =>
      dayjs(props.tweet.updatedAt).format("YYYY年M月D日")
    );

    const selectReaction = (id: string) => {
      const isReacted = !!props.tweet.reactions?.find(
        reaction => reaction.id === id
      );
      const tweetId = props.tweet.id;

      if (!tweetId) return;

      if (isReacted) {
        removeTweetReaction(tweetId, id, props.myUserId);
      } else {
        addTweetReaction(tweetId, id, props.myUserId);
      }
    };

    const addReaction = (id: string) => {
      const tweetId = props.tweet.id;
      if (!tweetId) return;
      addTweetReaction(tweetId, id, props.myUserId);
    };

    const removeReaction = (id: string) => {
      const tweetId = props.tweet.id;
      if (!tweetId) return;
      removeTweetReaction(tweetId, id, props.myUserId);
    };

    return {
      state,
      updatedAt,
      safeHtmlWithLink,
      selectReaction,
      addReaction,
      removeReaction
    };
  }
});
</script>
