<template>
  <form class="mt-1" @submit.prevent="submit">
    <textarea
      :value="state.text"
      @input="inputText"
      required
      class="w-full p-16px border-gray border resize-none"
      rows="5"
    ></textarea>
    <div class="mt-3 justify-center flex">
      <div class="flex justify-center -mx-3">
        <div class="px-3">
          <secondary-button
            @click="onCanceled"
            :width="120"
            :height="40"
            :fontSize="14"
            >キャンセル</secondary-button
          >
        </div>
        <div class="px-3">
          <primary-button
            @click="submit"
            :width="120"
            :height="40"
            :fontSize="14"
            >更新</primary-button
          >
        </div>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from "vue";
import { ProfileMessages } from "@/interfaces";
import { profileMessages } from "@/lib/firestore/users";
import PrimaryButton from "@/components/Common/PrimaryButton.vue";
import SecondaryButton from "@/components/Common/SecondaryButton.vue";

interface State {
  text: string;
}

export default defineComponent({
  name: "CommentEditForm",
  components: { PrimaryButton, SecondaryButton },
  props: {
    onCanceled: {
      type: Function,
      required: true
    },
    onSaved: {
      type: Function,
      required: true
    },
    comment: {
      type: Object as PropType<ProfileMessages>,
      required: true
    }
  },
  async setup(prop) {
    const state = reactive<State>({
      text: prop.comment.text
    });

    const inputText = (e: InputEvent) => {
      if (e.target instanceof HTMLTextAreaElement) {
        state.text = e.target.value;
      }
    };

    const submit = async () => {
      const date = new Date().toISOString();
      const newComment = {
        ...prop.comment,
        text: state.text,
        updatedAt: date
      };

      try {
        await profileMessages.doc(prop.comment.id).set(newComment);
        prop.onSaved(newComment);
      } catch (e) {
        console.error(e);
      }
    };

    return {
      state,
      inputText,
      submit
    };
  }
});
</script>
