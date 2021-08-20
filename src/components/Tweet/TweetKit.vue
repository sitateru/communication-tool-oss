<template>
  <ul class="absolute flex w-auto right-0 top-0 h-full">
    <li class="relative flex justify-center">
      <base-button
        @click="onClickReactionButton"
        button-class="text-xl text-blue leading-5 material-icons-outlined"
        tooltip-text="リアクション"
        tooltip-top-class="w-24 text-center mt-1"
      >
        mood
      </base-button>
    </li>
  </ul>
  <teleport to="#modals">
    <div
      v-if="state.showEmoji"
      class="fixed top-0 left-0 z-10 h-screen w-screen"
      @click.stop="closeModal"
    >
      <Picker
        :data="emojiIndex"
        set="apple"
        @select="onSelectEmoji"
        class="absolute right-0 top-0 z-50"
        :style="state.emojiPickerStyle"
        title=""
        @click.stop="
          () => {
            /* 親要素でclickイベントが発火するので伝播防止 */
          }
        "
      />
    </div>
  </teleport>
</template>

<script lang="ts">
import data from "emoji-mart-vue-fast/data/all.json";
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { Picker, EmojiIndex } from "emoji-mart-vue-fast/src"; // NOTE: 型がない
import "emoji-mart-vue-fast/css/emoji-mart.css";
import { defineComponent, reactive } from "vue";
import { EmojiData } from "@/lib/emoji";
import BaseButton from "@/components/Common/BaseButton.vue";

const emojiIndex = new EmojiIndex(data);

export default defineComponent({
  name: "TweetKit",
  components: { BaseButton, Picker },
  emits: {
    selectReaction() {
      return true;
    }
  },
  setup(_, { emit }) {
    const state = reactive({
      showEmoji: false,
      emojiPickerStyle: { top: "0px", left: "0px" }
    });

    function onClickReactionButton(e: MouseEvent) {
      if (!(e.target instanceof HTMLButtonElement)) return;

      const width = 338;
      const height = 420;
      const { innerHeight } = window;
      const rect = e.target.getBoundingClientRect();
      const rectX = Math.floor(rect.left);
      const rectY = Math.floor(rect.top);

      if (rectY + height < innerHeight) {
        state.emojiPickerStyle.top = `${rectY}px`;
      } else {
        // 下の表示が隠れてしまうため、差分 + パディング分上を指定する
        const diff = innerHeight - (rectY + height);
        state.emojiPickerStyle.top = `${rectY + (diff - 16)}px`;
      }

      state.emojiPickerStyle.left = `${rectX - width}px`;
      state.showEmoji = true;
    }

    function closeModal() {
      state.showEmoji = false;
    }

    function onSelectEmoji(value: EmojiData) {
      emit("selectReaction", value.id);
      state.showEmoji = false;
    }

    return {
      state,
      emojiIndex,
      onClickReactionButton,
      closeModal,
      onSelectEmoji
    };
  }
});
</script>
