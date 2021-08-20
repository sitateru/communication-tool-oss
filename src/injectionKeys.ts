import firebase from "firebase";
import { ProfileMessages } from "@/interfaces";
import { InjectionKey } from "vue";
import { TweetDocument, UserDocument } from "@/interfaces/firestore";

export const UsersKey: InjectionKey<firebase.firestore.CollectionReference<
  UserDocument
>> = Symbol("users");

export const ProfileMessagesKey: InjectionKey<firebase.firestore.CollectionReference<
  ProfileMessages
>> = Symbol("profileMessages");

export const TweetsKey: InjectionKey<firebase.firestore.CollectionReference<
  TweetDocument
>> = Symbol("tweets");
