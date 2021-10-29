import firebase from "firebase";
import { Office } from "@/config";

export type FrequencyOfAttendanceInterval = "week" | "month" | "year";

export interface User {
  id: string;
  email: string;
  coverImage?: string;
  avatar?: string;
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
  imageNote?: string[];
  tags?: string[];
  comments?: firebase.firestore.DocumentReference<ProfileMessages>[];
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
}

export type UserForm = Omit<User, "id">;

export interface Reaction {
  id: string;
  users: string[];
}

export interface Reactions {
  reactions?: Reaction[];
}

export interface ProfileMessages extends Reactions {
  id?: string;
  text: string;
  sender: firebase.firestore.DocumentReference<User>;
  user: firebase.firestore.DocumentReference<User>;
  createdAt: string;
  updatedAt: string;
}
