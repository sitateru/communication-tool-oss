<template>
  <div>
    <template v-if="state.user">
      <birthday v-if="isBirthday" />
      <div class="mx-auto text-left pt-12">
        <div class="w-full h-72 bg-gray-300">
          <async-image
            :imagePath="state.user.coverImage"
            :defaultImageUrl="defaultCoverImageUrl"
            class="w-full h-72"
            previewable
          />
        </div>
        <section class="p-3">
          <div class="max-w-screen-lg mx-auto">
            <div class="px-3 text-right">
              <router-link
                v-if="isMyself"
                :to="`/users/${state.user.id}/edit`"
                class="text-blue underline"
                >プロフィールを編集</router-link
              >
            </div>
            <user-info-header :user="state.user" class="my-3" />
            <user-info-detail :user="state.user" class="my-3" />
          </div>
        </section>
        <section class="bg-gray-100 p-3">
          <div class="max-w-screen-lg mx-auto">
            <comment-list
              v-if="commentsDisplayable"
              :comments="state.comments"
              class="my-3"
            />
            <comment-composer :user-id="state.user.id" class="my-6" />
          </div>
        </section>
      </div>
    </template>
    <template v-else-if="state.userDoc">
      <p>ユーザーが見つかりません。</p>
      <router-link to="/users">ユーザー一覧</router-link>
    </template>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  reactive,
  onUnmounted,
  computed,
  watch
} from "vue";
import { ProfileMessages, User } from "@/interfaces";
import AsyncImage from "@/components/Common/AsyncImage.vue";
import UserInfoHeader from "@/components/User/UserInfoHeader.vue";
import UserInfoDetail from "@/components/User/UserInfoDetail.vue";
import CommentList from "@/components/Comment/CommentList.vue";
import CommentComposer from "@/components/Comment/CommentComposer.vue";
import Birthday from "@/components/Common/Birthday.vue";
import { UsersKey, ProfileMessagesKey } from "@/injectionKeys";
import { useRoute, RouteParams } from "vue-router";
import { getCurrentUser } from "@/firebase";
import { UserDocument } from "@/interfaces/firestore";
import { defaultCoverImage } from "@/config";
import firebase from "firebase";
import dayjs from "dayjs";

interface State {
  comments: ProfileMessages[];
  userDoc?: firebase.firestore.DocumentSnapshot;
  user?: User;
}

export default defineComponent({
  name: "UserInfo",
  components: {
    AsyncImage,
    UserInfoHeader,
    UserInfoDetail,
    CommentList,
    CommentComposer,
    Birthday
  },
  async setup() {
    const route = useRoute();
    const profileMessageRef = inject(ProfileMessagesKey);
    const usersRef = inject(UsersKey);

    const defaultCoverImageUrl = defaultCoverImage;

    const state = reactive<State>({
      comments: []
    });

    let unsubscribe: () => void;

    // TODO: リファクタリング
    const fetchUser = (id: string) => {
      const docRef = usersRef?.doc(id);
      if (!docRef) return undefined;

      return new Promise<firebase.firestore.DocumentSnapshot<UserDocument>>(
        resolve => {
          docRef.get().then(function(doc) {
            resolve(doc);
          });
        }
      );
    };

    const routeUpdated = async (newParams: RouteParams) => {
      if (unsubscribe) unsubscribe();

      state.userDoc = await fetchUser(newParams.id as string);
      if (state.userDoc?.exists) {
        // eslint-disable-next-line
        // @ts-ignore
        state.user = { id: state.userDoc.id, ...state.userDoc.data() };

        if (!profileMessageRef) return;
        const query = profileMessageRef.where("user", "==", state.userDoc.ref);
        unsubscribe = query.onSnapshot(snapshot => {
          const comments: ProfileMessages[] = [];
          snapshot.forEach(doc => {
            comments.push({ id: doc.id, ...doc.data() });
          });
          comments.sort((a, b) => {
            if (a.createdAt < b.createdAt) {
              return -1;
            } else {
              return 1;
            }
          });
          state.comments = comments;
        });
      }

      // ユーザ詳細からの遷移時はスクロール値がそのままなので初期化
      window.scroll(0, 0);
    };

    const commentsDisplayable = computed(() => {
      if (state.comments.length > 0) return true;
      return false;
    });

    // 自分自身のときのみ編集画面へのリンクを表示する
    const isMyself = computed(() => {
      const currentUser = getCurrentUser();
      return state.user?.updatedBy === currentUser?.email;
    });

    const isBirthday = computed(() => {
      return dayjs().format("MM/DD") === state.user?.birthday;
    });

    watch(() => route.params, routeUpdated, { immediate: true });

    onUnmounted(() => {
      if (unsubscribe) unsubscribe();
    });

    return {
      defaultCoverImageUrl,
      state,
      isMyself,
      commentsDisplayable,
      isBirthday
    };
  }
});
</script>
