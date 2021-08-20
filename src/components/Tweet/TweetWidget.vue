<template>
  <div
    class="bg-gray-100 absolute w-full h-screen top-0 overflow-scroll pt-20 md:pt-32 pb-12 px-5 md:px-10"
  >
    <div>
      <tweet-editor :user-id="myData.id" class="pt-10" />
      <tweet-timeline :tweets="sortedTweets" :user-id="myData.id" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  reactive,
  onUnmounted,
  computed,
  onMounted
} from "vue";
import { useRoute } from "vue-router";
import { TweetsKey, UsersKey } from "@/injectionKeys";
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
    const limit = 100;

    const tweetsRef = inject(TweetsKey);
    const usersRef = inject(UsersKey);
    const route = useRoute();

    const state: State = reactive({
      tweets: {}
    });

    const tweetsDisplayable = computed(
      () => Object.keys(state.tweets).length > 0
    );
    const sortedTweets = computed(() =>
      Object.values(state.tweets).sort((first, second) => {
        if (first.updatedAt > second.updatedAt) return -1;
        if (first.updatedAt < second.updatedAt) return 1;
        return 0;
      })
    );

    let unsubscribe: (() => void) | undefined;

    onMounted(async () => {
      if (!tweetsRef) return;

      // リファクタリング対象
      const query = await (async () => {
        if (route.params.id) {
          const pageUser = usersRef?.doc(route.params.id as string);
          return tweetsRef
            .where("replyTo", "==", null)
            .where("sender", "==", pageUser)
            .orderBy("updatedAt", "desc")
            .limit(limit);
        } else {
          return tweetsRef
            .where("replyTo", "==", null)
            .orderBy("updatedAt", "desc")
            .limit(limit);
        }
      })();

      unsubscribe = query.onSnapshot(snapshot => {
        snapshot.forEach(doc => {
          state.tweets[doc.id] = { id: doc.id, ...doc.data() };
        });
      });
    });

    onUnmounted(() => {
      if (unsubscribe) unsubscribe();
    });

    const myData = await findMe();
    if (!myData) {
      await router.replace({ name: "Top" });
      return;
    }

    return { myData, state, tweetsDisplayable, sortedTweets };
  }
});
</script>

<style lang="scss"></style>
