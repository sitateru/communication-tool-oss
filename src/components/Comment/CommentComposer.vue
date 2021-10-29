<template>
  <div class="px-3">
    <div class="text-sm text-gray-500">コメントを書く</div>
    <textarea
      :value="state.text"
      @input="inputText"
      required
      class="w-full p-16px"
      rows="5"
    ></textarea>
    <div class="text-center">
      <button
        @click="send"
        :disabled="!sendable"
        class="my-3 px-16 md:px-24 py-4 bg-black text-white hover:bg-gray-700"
      >
        コメントを送信
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, reactive, computed } from "vue";
import { profileMessages } from "@/lib/firestore/users";
import { UsersKey } from "@/injectionKeys";
import firebase from "firebase";

interface State {
  text: string;
}

export default defineComponent({
  name: "CommentComposer",
  props: {
    userId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const userCollectionRef = inject(UsersKey);

    const state = reactive<State>({
      text: ""
    });

    const sendable = computed(() => state.text.trim().length > 0);

    const inputText = (e: InputEvent) => {
      if (e.target instanceof HTMLTextAreaElement) {
        state.text = e.target.value;
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

      if (!userRef || !senderRef || state.text.trim().length === 0) return;

      profileMessages
        .add({
          text: state.text,
          sender: senderRef,
          user: userRef,
          createdAt: date,
          updatedAt: date
        })
        .then(docRef => {
          state.text = "";
        })
        .catch(error => {
          console.error("Error adding document: ", error);
        });
    };
    return { send, inputText, state, sendable };
  }
});
</script>
