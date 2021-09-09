<template>
  <div class="mt-8px">
    <base-button
      v-for="props in reactions"
      :key="props.id"
      class="mr-1.5 "
      @click="clickReactionButton(props.id, props.isReacted)"
      :button-class="createButtonStyle(props.isReacted)"
      :tooltip-text="createTooltipText(props.otherUserName, props.isReacted)"
      tooltip-top-class="w-48 text-center mt-2"
    >
      {{ props.native }} {{ props.count }}
    </base-button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, watch } from "vue";
import { ReactionButtonProps } from "@/lib/comment";
import BaseButton from "@/components/Common/BaseButton.vue";

export default defineComponent({
  name: "ReactionButtons",
  components: { BaseButton },
  props: {
    reactions: {
      type: Array as PropType<ReactionButtonProps[]>,
      default: () => []
    }
  },
  setup(props, { emit }) {
    const createTooltipText = (otherUserName: string[], isReacted: boolean) => {
      const endText = "がリアクションしました";

      if (!otherUserName.length && isReacted) {
        return `あなた ${endText}`;
      }

      const tooltipText = `${otherUserName
        .map(name => `${name}さん`)
        .join(", ")} ${endText}`;
      if (!isReacted) {
        return tooltipText;
      }

      return `あなた, ${tooltipText}`;
    };

    const createButtonStyle = (isReacted: boolean) => {
      const baseButtonStyle = "px-2 py-0.5 rounded-full text-sm text-white";
      return isReacted
        ? `${baseButtonStyle} bg-blue`
        : `${baseButtonStyle} bg-button`;
    };

    const clickReactionButton = (id: string, isReacted: boolean) => {
      if (isReacted) {
        emit("remove", id);
        return;
      }

      emit("add", id);
    };

    return { createTooltipText, createButtonStyle, clickReactionButton };
  }
});
</script>
