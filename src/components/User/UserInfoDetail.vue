<template>
  <div>
    <article-with-title
      class="my-12"
      title="所属"
      :body="user.department"
      large
    />
    <article-with-title
      class="my-12"
      title="職種"
      :body="user.occupation"
      large
    />
    <article-with-title class="my-12" title="担当業務" :body="user.work" />
    <article-with-title class="my-12" title="スキル" :body="user.skill" />
    <article-with-title
      class="my-12"
      title="好きなアパレルブランド"
      :body="user.brands"
    />
    <div v-if="user.birthplace || user.address" class="my-8 flex">
      <article-with-title
        class="w-1/2"
        title="出身地"
        :body="user.birthplace"
      />
      <article-with-title class="w-1/2" title="居住地" :body="user.address" />
    </div>
    <article-with-title
      class="my-12"
      title="学生時代に学んでいたこと"
      :body="user.major"
    />
    <div v-if="user.favoriteFood || user.dislikedFood" class="my-12 flex">
      <article-with-title
        class="w-1/2"
        title="好きな食べ物"
        :body="user.favoriteFood"
      />
      <article-with-title
        class="w-1/2"
        title="嫌いな食べ物"
        :body="user.dislikedFood"
      />
    </div>
    <article-with-title class="my-12" title="お酒" :body="alcohol" />
    <article-with-title class="my-12" title="趣味" :body="user.hobbies" />
    <article-with-title class="my-12" title="特技" :body="user.specialSkills" />
    <article-with-title class="mt-12" title="自由記述欄" :body="user.note" />
    <div v-if="user.imageNote?.length" class="px-3 my-3">
      <async-images
        class="flex flex-wrap cursor-pointer"
        :paths="user.imageNote"
        previewable
      >
      </async-images>
    </div>
    <div v-if="user.tags?.length" class="px-3 my-3 flex flex-wrap">
      <text-tag v-for="tag in user.tags" :key="tag" :text="tag" class="m-1" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import ArticleWithTitle from "@/components/User/ArticleWithTitle.vue";
import TextTag from "@/components/User/TextTag.vue";
import { User } from "@/interfaces";
import AsyncImages from "@/components/Common/AsyncImages.vue";

export default defineComponent({
  name: "UserInfoDetail",
  components: {
    AsyncImages,
    ArticleWithTitle,
    TextTag
  },
  props: {
    user: {
      type: Object as PropType<User>,
      required: true
    }
  },
  setup(props) {
    const alcohol = computed(() => {
      const user = props.user;
      const comment = user.alcoholComment || "";
      switch (user.alcohol) {
        case true:
          return `飲める ${comment}`;
        case false:
          return `飲めない ${comment}`;
        default:
          return comment;
      }
    });

    return {
      alcohol
    };
  }
});
</script>
