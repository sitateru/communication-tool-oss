<template>
  <div class="px-3">
    <div class="text-sm text-gray-500 border-b border-color-gray-500">
      コメント欄
    </div>
    <ul>
      <comment-list-item
        v-for="(comment, index) in comments"
        :key="index"
        :comment="comment"
        :myUserId="myUserId"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import CommentListItem from "@/components/Comment/CommentListItem.vue";
import { ProfileMessages } from "@/interfaces";
import { findMe } from "@/lib/firestore/users";

export default defineComponent({
  name: "CommentList",
  components: { CommentListItem },
  props: {
    comments: {
      type: Array as PropType<ProfileMessages[]>,
      required: true
    }
  },
  async setup() {
    const user = await findMe();

    return { myUserId: user?.id || "" };
  }
});
</script>
