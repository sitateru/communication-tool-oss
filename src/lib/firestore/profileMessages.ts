import firebase from "firebase";
import { ProfileMessagesDocument } from "@/interfaces/firestore";
import { addReaction, removeReaction } from "@/lib/firestore/common/reaction";

const db = firebase.firestore();

export const profileMessages = db.collection(
  "profileMessages"
) as firebase.firestore.CollectionReference<ProfileMessagesDocument>;

export const addProfileMessageReaction = async (
  profileMessageId: string,
  reactionId: string,
  userId: string
) => {
  await addReaction(profileMessages, profileMessageId, reactionId, userId);
};

export const removeProfileMessageReaction = async (
  profileMessageId: string,
  reactionId: string,
  userId: string
) => {
  await removeReaction(profileMessages, profileMessageId, reactionId, userId);
};
