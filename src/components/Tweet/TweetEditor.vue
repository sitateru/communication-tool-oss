<template>
  <div>
    <textarea
      :value="state.content"
      @input="inputContent"
      required
      :class="classes"
      rows="1"
      :placeholder="replyTo ? '返信してみる？' : 'いま何してる？'"
    ></textarea>
    <div class="flex items-center my-3">
      <div></div>
      <div class="flex-grow"></div>
      <button
        v-if="sendable"
        @click="send"
        class="block py-2 px-5 bg-black text-white text-sm hover:bg-gray-700 rounded-full"
      >
        {{ replyTo ? "返信" : "つぶやきを送信" }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import firebase from "firebase";
import { defineComponent, inject, reactive, computed, PropType } from "vue";
import { tweets } from "@/lib/firestore/tweets";
import { UsersKey, TweetsKey } from "@/injectionKeys";
import { User } from "@/interfaces";
import { Tweet } from "@/interfaces/tweets";
import { TweetDocument, UserDocument } from "@/interfaces/firestore";

interface State {
  content: string;
}

export default defineComponent({
  name: "TweetEditor",
  props: {
    userId: {
      type: String,
      required: true
    },
    replyTo: {
      type: Object as PropType<Tweet>
    }
  },
  setup(props) {
    const userCollectionRef = inject(UsersKey);
    const tweetCollectionRef = inject(TweetsKey);

    const state = reactive<State>({
      content: ""
    });

    const sendable = computed(() => state.content.trim().length > 0);
    const classes = computed(() => {
      const base =
        "px-5 py-5 block w-full rounded border-gray-300 shadow focus:h-40 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50";
      if (state.content.length > 0) {
        return `${base} h-40`;
      } else {
        return `${base}`;
      }
    });

    const inputContent = (e: InputEvent) => {
      if (e.target instanceof HTMLTextAreaElement) {
        state.content = e.target.value;
      }
    };

    const send = async () => {
      const date = new Date().toISOString();

      if (!userCollectionRef) return;

      const userRef = await userCollectionRef.doc(props.userId);

      const currentUser = firebase.auth().currentUser;

      // TODO: Userドキュメントにemailのクエリを追加後に変更
      const query = userCollectionRef.where(
        "updatedBy",
        "==",
        currentUser?.email
      );
      const snapShots = await query.get();
      const senderRef = snapShots.docs[0].ref;

      if (!userRef || !senderRef || state.content.trim().length === 0) return;

      const params: {
        content: string;
        sender: firebase.firestore.DocumentReference<UserDocument>;
        user: firebase.firestore.DocumentReference<UserDocument>;
        createdAt: string;
        updatedAt: string;
        replyTo: firebase.firestore.DocumentReference<TweetDocument> | null;
      } = {
        content: state.content,
        sender: senderRef,
        user: userRef,
        createdAt: date,
        updatedAt: date,
        replyTo: null
      };

      if (props.replyTo) {
        const tweetRef = await tweetCollectionRef?.doc(props.replyTo.id);
        if (tweetRef) {
          params.replyTo = tweetRef;
        }
      }

      await tweets.add(params);
      state.content = "";
    };
    return { send, inputContent, state, sendable, classes };
  }
});
</script>

<style lang="scss"></style>
