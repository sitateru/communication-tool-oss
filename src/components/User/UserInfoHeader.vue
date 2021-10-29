<template>
  <div class="px-3 flex">
    <async-image
      :imagePath="user.avatar"
      class="inline-block w-24 h-24 mr-6 rounded-full"
      previewable
    />
    <div class="flex flex-col">
      <span class="text-4xl">{{ user.lastNameJP }} {{ user.firstNameJP }}</span>
      <span class="text-xl font-corp capitalize"
        >{{ user.firstName }} {{ user.lastName }}</span
      >
      <span class="mb-2 text-gray-500">{{ user.email }}</span>
      <div class="flex text-sm">
        <template v-if="user.joiningDay">
          <div class="flex items-center relative tooltip-container">
            <span class="mr-2 text-gray-500 material-icons text-base"
              >business</span
            >
            <span class="mr-6 text-gray-500">{{ user.joiningDay }}</span>
            <span class="tooltip">入社日</span>
          </div>
        </template>
        <template v-if="haveFrequencyOfAttendance">
          <div class="flex items-center relative tooltip-container">
            <span class="mr-2 text-gray-500 material-icons text-base"
              >directions_walk</span
            >
            <span class="mr-6 text-gray-500">{{ frequencyOfAttendance }}</span>
            <span class="tooltip">出社頻度</span>
          </div>
        </template>
        <template v-if="user.birthday">
          <div class="flex items-center relative tooltip-container">
            <span class="mr-2 text-gray-500 material-icons text-base"
              >cake</span
            >
            <span v-if="user.birthday" class="mr-6 text-gray-500">{{
              user.birthday
            }}</span>
            <span class="tooltip">誕生日</span>
          </div>
        </template>
        <template v-if="user.height">
          <div class="flex items-center relative tooltip-container">
            <span class="mr-2 text-gray-500  material-icons text-base"
              >height</span
            >
            <span v-if="user.height" class="mr-2 text-gray-500">{{
              user.height
            }}</span>
            <span class="mr-2 text-gray-500">cm</span>
            <span class="tooltip">身長</span>
          </div>
        </template>
      </div>
    </div>
    <location-label :location="user.location" class="h-24 ml-auto" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import LocationLabel from "@/components/User/LocationLabel.vue";
import AsyncImage from "@/components/Common/AsyncImage.vue";
import { User } from "@/interfaces";

export default defineComponent({
  name: "UserInfoHeader",
  components: { LocationLabel, AsyncImage },
  props: {
    user: {
      type: Object as PropType<User>,
      required: true
    }
  },
  setup(props) {
    const haveFrequencyOfAttendance = computed(
      () =>
        props.user.frequencyOfAttendanceInterval &&
        props.user.frequencyOfAttendanceValue !== undefined
    );

    const frequencyOfAttendance = computed(() => {
      if (props.user.frequencyOfAttendanceInterval) {
        const interval = {
          week: "週",
          month: "月",
          year: "年"
        };
        return `${interval[props.user.frequencyOfAttendanceInterval]}に${
          props.user.frequencyOfAttendanceValue
        }日くらい`;
      }

      return null;
    });

    return { haveFrequencyOfAttendance, frequencyOfAttendance };
  }
});
</script>

<style scoped>
.tooltip-container .tooltip {
  @apply invisible;
}
.tooltip-container:hover .tooltip {
  @apply visible;
}

.tooltip {
  @apply absolute;
  @apply top-full;
  @apply text-white bg-gray-500;
  @apply p-1;
  @apply rounded;
}
</style>
