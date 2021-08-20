import firebase from "firebase";
import { firebaseInitialized } from "@/firebase";
import { TweetDocument } from "@/interfaces/firestore";
import { addReaction, removeReaction } from "@/lib/firestore/common/reaction";

const db = firebaseInitialized.firestore();
export const tweets = db.collection(
  "tweets"
) as firebase.firestore.CollectionReference<TweetDocument>;

export const addTweetReaction = async (
  tweetId: string,
  reactionId: string,
  userId: string
) => {
  await addReaction(tweets, tweetId, reactionId, userId);
};

export const removeTweetReaction = async (
  tweetId: string,
  reactionId: string,
  userId: string
) => {
  await removeReaction(tweets, tweetId, reactionId, userId);
};
