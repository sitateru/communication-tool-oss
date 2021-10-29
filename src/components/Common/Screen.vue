<template>
  <div :class="cursorClass" @click="show">
    <slot />
    <div
      v-if="state.canShow"
      class="fixed flex justify-center items-center h-screen w-screen top-0 left-0 z-50 cursor-auto"
    >
      <div
        class="absolute h-screen w-screen top-0 left-0 bg-black opacity-75"
        @click.stop="hide"
      ></div>
      <button
        class="absolute rounded top-12 right-12 w-12 h-12 bg-white text-3xl focus:outline-none"
        @click.stop="hide"
      >
        ×
      </button>
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from "vue";

interface State {
  canShow: boolean;
}

export default defineComponent({
  name: "screen",
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const state = reactive<State>({ canShow: false });
    const cursorClass = computed(() =>
      props.disabled ? null : ["cursor-pointer"]
    );

    function show() {
      if (props.disabled) return;
      state.canShow = true;
    }

    function hide() {
      state.canShow = false;
    }

    return { state, cursorClass, show, hide };
  }
});
</script>
