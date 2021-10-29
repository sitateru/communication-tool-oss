<template>
  <div class="pt-56px">
    <h1
      class="text-24px font-bold border-b-4 border-black max-w-1000px mx-auto"
    >
      マイデータ入力
    </h1>
    <div class="my-40px max-w-1000px mx-auto">
      <p class="my-6">
        ★のついた項目は必須入力項目となります。
      </p>
      <p class="my-6">
        ※「顔写真」は必ず自分の顔が認識できる画像にしてください。
        <br />（なるべくバストアップ写真で顔が見える画像を使っていただけると嬉しいです。）
      </p>
    </div>
    <form class="" @submit.prevent="submit">
      <field-cover-image
        :path="getImagePath(state.coverImage)"
        :change="changeCoverImage"
        class="mb-24px"
      />
      <div class="grid gap-x-32px gap-y-16px max-w-1000px mx-auto">
        <field-avatar
          :path="getImagePath(state.avatar)"
          :change="changeAvatar"
          class="row-start-1 row-end-4 col-start-1 col-end-2"
        />
        <field-name-jp
          :lastName="state.lastNameJP"
          :firstName="state.firstNameJP"
          :inputLastName="inputLastNameJP"
          :inputFirstName="inputFirstNameJP"
          class="row-start-1 row-end-2 col-start-2 col-end-5"
        />
        <field-name
          :lastName="state.lastName"
          :firstName="state.firstName"
          :inputLastName="inputLastName"
          :inputFirstName="inputFirstName"
          class="row-start-2 row-end-3 col-start-2 col-end-5"
        />
        <field-location
          :value="state.location"
          :input="inputLocation"
          class="row-start-3 row-end-4 col-start-2 col-end-3"
        />
        <field-birthday
          :value="state.birthday"
          @change="changeBirthday"
          class="row-start-3 row-end-4 col-start-3 col-end-4"
        />
        <field-height
          :value="state.height"
          :input="inputHeight"
          class="row-start-3 row-end-4 col-start-2 col-start-4 col-end-5"
        />
        <field-joining-day
          :value="state.joiningDay"
          :change="changeJoiningDay"
          class="row-start-4 row-end-5 col-start-1 col-end-2"
        />
        <field-frequency-of-attendance
          :interval="state.frequencyOfAttendanceInterval"
          :value="state.frequencyOfAttendanceValue"
          :input-interval="inputFrequencyOfAttendanceInterval"
          :input-value="inputFrequencyOfAttendanceValue"
          class="row-start-4 row-end-5 col-start-2 col-end-3"
        />
        <field-department
          :value="state.department"
          :input="inputDepartment"
          class="row-start-5 row-end-6 col-start-1 col-end-5"
        />
        <field-occupation
          :value="state.occupation"
          :input="inputOccupation"
          class="row-start-6 row-end-7 col-start-1 col-end-5"
        />
        <field-work
          :value="state.work"
          :input="inputWork"
          class="row-start-7 row-end-8 col-start-1 col-end-5"
        />
        <field-skill
          :value="state.skill"
          :input="inputSkill"
          class="row-start-8 row-end-9 col-start-1 col-end-5"
        />
        <field-brands
          :value="state.brands"
          :input="inputBrands"
          class="row-start-9 row-end-10 col-start-1 col-end-5"
        />
        <field-birthplace
          :value="state.birthplace"
          :input="inputBirthplace"
          class="row-start-10 row-end-11 col-start-1 col-end-5"
        />
        <field-address
          :value="state.address"
          :input="inputAddress"
          class="row-start-11 row-end-12 col-start-1 col-end-5"
        />
        <field-major
          :value="state.major"
          :input="inputMajor"
          class="row-start-12 row-end-13 col-start-1 col-end-5"
        />
        <field-favorite-food
          :value="state.favoriteFood"
          :input="inputFavoriteFood"
          class="row-start-13 row-end-14 col-start-1 col-end-5"
        />
        <field-disliked-food
          :value="state.dislikedFood"
          :input="inputDislikedFood"
          class="row-start-14 row-end-15 col-start-1 col-end-5"
        />
        <field-alcohol
          :alcohol="state.alcohol"
          :alcohol-comment="state.alcoholComment"
          :input-alcohol="inputAlcohol"
          :input-alcohol-comment="inputAlcoholComment"
          class="row-start-15 row-end-16 col-start-1 col-end-5"
        />
        <field-hobbies
          :value="state.hobbies"
          :input="inputHobbies"
          class="row-start-16 row-end-17 col-start-1 col-end-5"
        />
        <field-special-skills
          :value="state.specialSkills"
          :input="inputSpecialSkills"
          class="row-start-17 row-end-18 col-start-1 col-end-5"
        />
        <field-note
          :value="state.note"
          :input="inputNote"
          class="row-start-18 row-end-19 col-start-1 col-end-5"
        />
        <field-image-note
          :paths="state.imageNote"
          :change-files="changeImageNote"
          class="col-start-1 col-end-5"
        />
        <field-tags
          :values="state.tags"
          :change="changeTags"
          class="col-start-1 col-end-5"
        />
        <div
          class="mt-40px mb-80px grid place-content-center col-start-1 col-end-5"
        >
          <primary-button :disabled="state.submitting">{{
            submitLabel
          }}</primary-button>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, PropType, reactive } from "vue";
import FieldAvatar from "@/components/Form/Field/FieldAvatar.vue";
import FieldNameJp from "@/components/Form/Field/FieldNameJp.vue";
import FieldName from "@/components/Form/Field/FieldName.vue";
import FieldLocation from "@/components/Form/Field/FieldLocation.vue";
import FieldBirthday from "@/components/Form/Field/FieldBirthday.vue";
import FieldHeight from "@/components/Form/Field/FieldHeight.vue";
import FieldDepartment from "@/components/Form/Field/FieldDepartment.vue";
import FieldOccupation from "@/components/Form/Field/FieldOccupation.vue";
import FieldWork from "@/components/Form/Field/FieldWork.vue";
import FieldSkill from "@/components/Form/Field/FieldSkill.vue";
import FieldBrands from "@/components/Form/Field/FieldBrands.vue";
import FieldJoiningDay from "@/components/Form/Field/FieldJoiningDay.vue";
import FieldBirthplace from "@/components/Form/Field/FieldBirthplace.vue";
import FieldAddress from "@/components/Form/Field/FieldAddress.vue";
import FieldMajor from "@/components/Form/Field/FieldMajor.vue";
import FieldFavoriteFood from "@/components/Form/Field/FieldFavoriteFood.vue";
import FieldDislikedFood from "@/components/Form/Field/FieldDislikedFood.vue";
import FieldAlcohol from "@/components/Form/Field/FieldAlcohol.vue";
import FieldHobbies from "@/components/Form/Field/FieldHobbies.vue";
import FieldSpecialSkills from "@/components/Form/Field/FieldSpecialSkills.vue";
import FieldNote from "@/components/Form/Field/FieldNote.vue";
import PrimaryButton from "@/components/Common/PrimaryButton.vue";
import {
  getCurrentUser,
  uploadFile,
  uploadFiles,
  deleteFile
} from "@/firebase";
import { UsersKey } from "@/injectionKeys";
import { FrequencyOfAttendanceInterval, User, UserForm } from "@/interfaces";
import { Office } from "@/config";
import router from "@/router";
import FieldCoverImage from "@/components/Form/Field/FieldCoverImage.vue";
import FieldImageNote, {
  ImageFiles
} from "@/components/Form/Field/FieldImageNote.vue";
import FieldTags from "@/components/Form/Field/FieldTags.vue";
import FieldFrequencyOfAttendance from "@/components/Form/Field/FieldFrequencyOfAttendance.vue";

interface State {
  coverImage?: File | string | null;
  avatar?: File | string | null;
  lastNameJP: string;
  firstNameJP: string;
  lastName: string;
  firstName: string;
  location: Office;
  birthday?: string;
  height?: number;
  joiningDay?: string;
  frequencyOfAttendanceInterval?: FrequencyOfAttendanceInterval;
  frequencyOfAttendanceValue?: number;
  department: string;
  occupation?: string;
  work?: string;
  skill?: string;
  brands?: string;
  birthplace?: string;
  address?: string;
  major?: string;
  favoriteFood?: string;
  dislikedFood?: string;
  alcohol?: boolean;
  alcoholComment?: string;
  hobbies?: string;
  specialSkills?: string;
  note?: string;
  imageNote?: ImageFiles;
  tags?: string[];
  submitting: boolean;
}

export default defineComponent({
  name: "UserForm",
  props: {
    user: {
      type: Object as PropType<User>
    },
    redirect: {
      type: String,
      required: true
    }
  },
  components: {
    FieldFrequencyOfAttendance,
    FieldTags,
    FieldImageNote,
    FieldCoverImage,
    FieldAvatar,
    PrimaryButton,
    FieldNote,
    FieldSpecialSkills,
    FieldHobbies,
    FieldAlcohol,
    FieldDislikedFood,
    FieldFavoriteFood,
    FieldMajor,
    FieldAddress,
    FieldBirthplace,
    FieldJoiningDay,
    FieldSkill,
    FieldWork,
    FieldBrands,
    FieldOccupation,
    FieldDepartment,
    FieldHeight,
    FieldBirthday,
    FieldLocation,
    FieldNameJp,
    FieldName
  },
  setup(props) {
    const usersRef = inject(UsersKey);

    const state = reactive<State>({
      coverImage: props.user?.coverImage,
      avatar: props.user?.avatar,
      lastNameJP: props.user?.lastNameJP || "",
      firstNameJP: props.user?.firstNameJP || "",
      lastName: props.user?.lastName || "",
      firstName: props.user?.firstName || "",
      location: props.user?.location || "kumamoto",
      birthday: props.user?.birthday,
      height: props.user?.height,
      joiningDay: props.user?.joiningDay,
      frequencyOfAttendanceInterval: props.user?.frequencyOfAttendanceInterval,
      frequencyOfAttendanceValue: props.user?.frequencyOfAttendanceValue,
      department: props.user?.department || "",
      occupation: props.user?.occupation || "",
      work: props.user?.work || "",
      skill: props.user?.skill || "",
      brands: props.user?.brands || "",
      birthplace: props.user?.birthplace,
      address: props.user?.address,
      major: props.user?.major,
      favoriteFood: props.user?.favoriteFood,
      dislikedFood: props.user?.dislikedFood,
      alcohol: props.user?.alcohol,
      alcoholComment: props.user?.alcoholComment,
      hobbies: props.user?.hobbies,
      specialSkills: props.user?.specialSkills,
      note: props.user?.note,
      imageNote: props.user?.imageNote,
      tags: props.user?.tags,
      submitting: false
    });

    function changeCoverImage(file: File | null) {
      state.coverImage = file;
    }

    function changeAvatar(file: File | null) {
      state.avatar = file;
    }

    function inputLastNameJP(e: InputEvent) {
      if (e.target instanceof HTMLInputElement) {
        state.lastNameJP = e.target.value;
      }
    }

    function inputFirstNameJP(e: InputEvent) {
      if (e.target instanceof HTMLInputElement) {
        state.firstNameJP = e.target.value;
      }
    }

    function inputLastName(e: InputEvent) {
      if (e.target instanceof HTMLInputElement) {
        state.lastName = e.target.value;
      }
    }

    function inputFirstName(e: InputEvent) {
      if (e.target instanceof HTMLInputElement) {
        state.firstName = e.target.value;
      }
    }

    function inputLocation(e: Event) {
      if (e.target instanceof HTMLSelectElement) {
        state.location = e.target.value as Office;
      }
    }

    function changeBirthday(value: string) {
      state.birthday = value;
    }

    function inputHeight(e: InputEvent) {
      if (e.target instanceof HTMLInputElement) {
        state.height = Number.parseInt(e.target.value, 10);
      }
    }

    function changeJoiningDay(e: Event) {
      if (e.target instanceof HTMLInputElement) {
        state.joiningDay = e.target.value;
      }
    }

    function inputFrequencyOfAttendanceInterval(e: InputEvent) {
      function isFrequencyOfAttendanceInterval(
        value: string
      ): value is FrequencyOfAttendanceInterval {
        if (!value) return false;
        return ["week", "month", "year"].includes(value);
      }

      if (e.target instanceof HTMLSelectElement) {
        const { value } = e.target;
        if (isFrequencyOfAttendanceInterval(value)) {
          state.frequencyOfAttendanceInterval = value;
        } else {
          delete state.frequencyOfAttendanceInterval;
        }
      }
    }

    function inputFrequencyOfAttendanceValue(e: InputEvent) {
      if (e.target instanceof HTMLSelectElement) {
        if (e.target.value) {
          state.frequencyOfAttendanceValue = parseInt(e.target.value);
        } else {
          delete state.frequencyOfAttendanceValue;
        }
      }
    }

    function inputDepartment(e: InputEvent) {
      if (e.target instanceof HTMLInputElement) {
        state.department = e.target.value;
      }
    }

    function inputOccupation(e: InputEvent) {
      if (e.target instanceof HTMLInputElement) {
        state.occupation = e.target.value;
      }
    }

    function inputWork(e: InputEvent) {
      if (e.target instanceof HTMLInputElement) {
        state.work = e.target.value;
      }
    }

    function inputSkill(e: InputEvent) {
      if (e.target instanceof HTMLInputElement) {
        state.skill = e.target.value;
      }
    }

    function inputBrands(e: InputEvent) {
      if (e.target instanceof HTMLInputElement) {
        state.brands = e.target.value;
      }
    }

    function inputBirthplace(e: InputEvent) {
      if (e.target instanceof HTMLInputElement) {
        state.birthplace = e.target.value;
      }
    }

    function inputAddress(e: InputEvent) {
      if (e.target instanceof HTMLInputElement) {
        state.address = e.target.value;
      }
    }

    function inputMajor(e: InputEvent) {
      if (e.target instanceof HTMLInputElement) {
        state.major = e.target.value;
      }
    }

    function inputFavoriteFood(e: InputEvent) {
      if (e.target instanceof HTMLInputElement) {
        state.favoriteFood = e.target.value;
      }
    }

    function inputDislikedFood(e: InputEvent) {
      if (e.target instanceof HTMLInputElement) {
        state.dislikedFood = e.target.value;
      }
    }

    function inputAlcohol(e: InputEvent) {
      if (e.target instanceof HTMLSelectElement) {
        if (e.target.value === "true") {
          state.alcohol = true;
          return;
        }

        if (e.target.value === "false") {
          state.alcohol = false;
          return;
        }

        delete state.alcohol;
      }
    }

    function inputAlcoholComment(e: InputEvent) {
      if (e.target instanceof HTMLInputElement) {
        state.alcoholComment = e.target.value;
      }
    }

    function inputHobbies(e: InputEvent) {
      if (e.target instanceof HTMLInputElement) {
        state.hobbies = e.target.value;
      }
    }

    function inputSpecialSkills(e: InputEvent) {
      if (e.target instanceof HTMLInputElement) {
        state.specialSkills = e.target.value;
      }
    }

    function inputNote(e: InputEvent) {
      if (e.target instanceof HTMLTextAreaElement) {
        state.note = e.target.value;
      }
    }

    function changeImageNote(files: ImageFiles) {
      state.imageNote = files;
    }

    function changeTags(tags: string[]) {
      state.tags = tags;
    }

    function getImagePath(value: File | string | null) {
      return typeof value === "string" ? value : null;
    }

    async function submit() {
      state.submitting = true;

      const currentUser = getCurrentUser();
      if (!usersRef || !currentUser) {
        return;
      }

      const date = new Date().toISOString();

      const updatedBy = currentUser.email;
      if (!updatedBy) {
        return;
      }

      const email = currentUser.email;
      if (!email) {
        return;
      }

      const userForm: UserForm = {
        email,
        lastNameJP: state.lastNameJP,
        firstNameJP: state.firstNameJP,
        lastName: state.lastName,
        firstName: state.firstName,
        location: state.location,
        department: state.department,
        createdAt: date,
        updatedAt: date,
        updatedBy
      };

      if (state.coverImage) {
        const coverImage = await uploadFile(state.coverImage, "coverImage");
        if (coverImage) userForm.coverImage = coverImage;
      }
      if (
        props.user?.coverImage &&
        props.user.coverImage !== userForm.coverImage
      ) {
        await deleteFile(props.user.coverImage);
      }

      if (state.avatar) {
        const avatar = await uploadFile(state.avatar, "avatar");
        if (avatar) userForm.avatar = avatar;
      }
      if (props.user?.avatar && props.user.avatar !== userForm.avatar) {
        await deleteFile(props.user.avatar);
      }

      if (state.birthday) userForm.birthday = state.birthday;
      if (state.height) userForm.height = state.height;
      if (state.joiningDay) userForm.joiningDay = state.joiningDay;
      if (
        state.frequencyOfAttendanceInterval &&
        state.frequencyOfAttendanceValue !== undefined
      ) {
        userForm.frequencyOfAttendanceInterval =
          state.frequencyOfAttendanceInterval;
        userForm.frequencyOfAttendanceValue = state.frequencyOfAttendanceValue;
      }
      if (state.occupation) userForm.occupation = state.occupation;
      if (state.work) userForm.work = state.work;
      if (state.skill) userForm.skill = state.skill;
      if (state.brands) userForm.brands = state.brands;
      if (state.birthplace) userForm.birthplace = state.birthplace;
      if (state.address) userForm.address = state.address;
      if (state.major) userForm.major = state.major;
      if (state.favoriteFood) userForm.favoriteFood = state.favoriteFood;
      if (state.dislikedFood) userForm.dislikedFood = state.dislikedFood;
      if (state.alcohol !== undefined) userForm.alcohol = state.alcohol;
      if (state.alcoholComment) userForm.alcoholComment = state.alcoholComment;
      if (state.hobbies) userForm.hobbies = state.hobbies;
      if (state.specialSkills) userForm.specialSkills = state.specialSkills;
      if (state.note) userForm.note = state.note;

      if (state.imageNote) {
        const imageNote = await uploadFiles(state.imageNote, "imageNote");
        if (imageNote) userForm.imageNote = imageNote;
      }
      if (props.user?.imageNote && userForm.imageNote) {
        const imageNote = userForm.imageNote; // 型エラー対応
        await Promise.all(
          props.user.imageNote.map(async (image, index) => {
            if (image !== imageNote[index]) await deleteFile(image);
          })
        );
      }

      if (state.tags) userForm.tags = state.tags;

      try {
        if (props.user?.id) {
          await usersRef.doc(props.user.id).set(userForm);
        } else {
          await usersRef.add(userForm);
        }

        await router.push(props.redirect);
      } catch (e) {
        state.submitting = false;
        console.error(e);
      }
    }

    const submitLabel = computed(() => {
      if (props.user) {
        return state.submitting ? "保存中..." : "保存";
      } else {
        return state.submitting ? "登録中..." : "登録";
      }
    });

    return {
      state,
      changeCoverImage,
      changeAvatar,
      inputLastNameJP,
      inputFirstNameJP,
      inputLastName,
      inputFirstName,
      inputLocation,
      changeBirthday,
      inputHeight,
      changeJoiningDay,
      inputFrequencyOfAttendanceInterval,
      inputFrequencyOfAttendanceValue,
      inputDepartment,
      inputOccupation,
      inputWork,
      inputSkill,
      inputBrands,
      inputBirthplace,
      inputAddress,
      inputMajor,
      inputFavoriteFood,
      inputDislikedFood,
      inputAlcohol,
      inputAlcoholComment,
      inputHobbies,
      inputSpecialSkills,
      inputNote,
      changeImageNote,
      changeTags,
      getImagePath,
      submit,
      submitLabel
    };
  }
});
</script>
