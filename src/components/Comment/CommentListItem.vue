<template>
  <li class="py-6 border-b border-color-gray-500">
    <div class="flex items-start">
      <router-link :to="`/users/${state.sender?.id}`" class="cursor-pointer">
        <async-image
          :imagePath="state.sender?.avatar"
          class="inline-block w-12 h-12 text-xs rounded-full"
        />
      </router-link>
      <div class="ml-2 flex flex-col justify-center w-full relative">
        <comment-kit
          v-if="!state.isEditing"
          :is-editable="isEditable"
          @click-edit="startEditing"
          @select-reaction="selectReaction"
        />
        <div class="flex justify-between">
          <span class="text-sm"
            >{{ state.sender?.lastNameJP }}
            {{ state.sender?.firstNameJP }}</span
          >
        </div>
        <div>
          <span class="text-xs text-gray-500">{{ createdAt }}</span>
          <span v-if="isEdited" class="text-xs text-gray-500">(編集済み)</span>
        </div>
        <div v-if="!state.isEditing">
          <p
            v-for="(safeHTML, index) in paragraphs"
            :key="index"
            class="mt-2 text-sm whitespace-pre-line"
            v-html="safeHTML"
          ></p>
        </div>
        <div v-else>
          <comment-edit-form
            :onCanceled="endEditing"
            :onSaved="onSaved"
            :comment="state.comment"
          />
        </div>
        <reaction-buttons
          v-if="!state.isEditing"
          :reactions="state.reactions"
          @add="addReaction"
          @remove="removeReaction"
        />
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, reactive, watch } from "vue";
import CommentEditForm from "@/components/Comment/CommentEditForm.vue";
import AsyncImage from "@/components/Common/AsyncImage.vue";
import CommentKit from "@/components/Comment/CommentKit.vue";
import { ProfileMessages, User } from "@/interfaces";
import { getCurrentUser } from "@/firebase";
import { safeHtmlWithLink } from "@/utils";
import dayjs from "dayjs";
import { createReactionButtonsProps, ReactionButtonProps } from "@/lib/comment";
import {
  addProfileMessageReaction,
  removeProfileMessageReaction
} from "@/lib/firestore/profileMessages";
import ReactionButtons from "@/components/Common/ReactionButtons.vue";
import { findUser } from "@/lib/firestore/users";

interface State {
  isEditing: boolean;
  comment: ProfileMessages;
  sender: User | null;
  reactions: ReactionButtonProps[];
}

export default defineComponent({
  name: "CommentListItem",
  components: {
    ReactionButtons,
    AsyncImage,
    CommentEditForm,
    CommentKit
  },
  props: {
    comment: {
      type: Object as PropType<ProfileMessages>,
      required: true
    },
    myUserId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const state = reactive<State>({
      isEditing: false,
      comment: props.comment,
      sender: null,
      reactions: []
    });

    watch(
      () => props.comment.sender,
      async () => {
        state.sender = await findUser(props.comment.sender.id);
      },
      {
        immediate: true
      }
    );
    watch(
      () => props.comment.reactions,
      async () => {
        state.reactions = await createReactionButtonsProps(
          props.myUserId,
          props.comment.reactions
        );
      },
      {
        immediate: true
      }
    );

    const paragraphs = computed(() =>
      props.comment.text
        .split("\n\n")
        .map(text => safeHtmlWithLink(text, "text-blue underline"))
    );

    const currentUser = getCurrentUser();

    const isMyself = computed(
      () => state.sender?.updatedBy === currentUser?.email
    );

    const isEditable = computed(() => isMyself.value && !state.isEditing);

    const isEdited = computed(
      () => state.comment.createdAt !== state.comment.updatedAt
    );

    const startEditing = () => {
      state.isEditing = true;
    };

    const endEditing = () => {
      state.isEditing = false;
    };

    const onSaved = (comment: ProfileMessages) => {
      state.isEditing = false;
      state.comment = comment;
    };

    const createdAt = computed(() =>
      dayjs(props.comment.createdAt).format("YYYY年M月D日")
    );

    const selectReaction = (id: string) => {
      const isReacted = !!props.comment.reactions?.find(
        reaction => reaction.id === id
      );
      const postMessageId = props.comment.id;

      if (!postMessageId) return;

      if (isReacted) {
        removeProfileMessageReaction(postMessageId, id, props.myUserId);
      } else {
        addProfileMessageReaction(postMessageId, id, props.myUserId);
      }
    };

    const addReaction = (id: string) => {
      const postMessageId = props.comment.id;
      if (!postMessageId) return;
      addProfileMessageReaction(postMessageId, id, props.myUserId);
    };

    const removeReaction = (id: string) => {
      const postMessageId = props.comment.id;
      if (!postMessageId) return;
      removeProfileMessageReaction(postMessageId, id, props.myUserId);
    };

    return {
      paragraphs,
      createdAt,
      isMyself,
      state,
      startEditing,
      endEditing,
      isEditable,
      isEdited,
      onSaved,
      selectReaction,
      addReaction,
      removeReaction
    };
  }
});
</script>
