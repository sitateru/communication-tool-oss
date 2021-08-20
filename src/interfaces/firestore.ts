import firebase from "firebase";
import { Office } from "@/config";

export type FrequencyOfAttendanceInterval = "week" | "month" | "year";

export interface UserDocument {
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
  comments?: firebase.firestore.DocumentReference<ProfileMessagesDocument>[];
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
}

export interface Reaction {
  id: string;
  users: string[];
}

export interface Reactions {
  reactions?: Reaction[];
}

export interface ProfileMessagesDocument extends Reactions {
  text: string;
  sender: firebase.firestore.DocumentReference<UserDocument>;
  user: firebase.firestore.DocumentReference<UserDocument>;
  createdAt: string;
  updatedAt: string;
}

export interface TweetDocument extends Reactions {
  content: string;
  sender: firebase.firestore.DocumentReference<UserDocument>;
  user: firebase.firestore.DocumentReference<UserDocument>;
  replyTo: firebase.firestore.DocumentReference<TweetDocument> | null;
  createdAt: string;
  updatedAt: string;
}
