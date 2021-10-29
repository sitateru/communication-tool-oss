import firebase from "firebase";
import { firebaseInitialized } from "@/firebase";
import { TweetDocument, UserDocument } from "@/interfaces/firestore";
import { addReaction, removeReaction } from "@/lib/firestore/common/reaction";
import { LIMIT } from "@/lib/firestore/common/constants";
import { Tweet } from "@/interfaces/tweets";
import dayjs from "dayjs";

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

const getTweets = async (query: firebase.firestore.Query<TweetDocument>) => {
  const snapshots = await query.get();
  const { docs } = snapshots;

  const tweets = docs.map(
    tweetDocument =>
      ({ ...tweetDocument.data(), id: tweetDocument.id } as Tweet)
  );
  const lastDocumentSnapshot = docs.length > 0 ? docs[docs.length - 1] : null;

  return {
    tweets,
    lastDocumentSnapshot
  };
};

/**
 * 最新のツイートを取得
 *   replyツイートは含まない
 */
export const getLatestTweets = async (date: string) => {
  const query = tweets
    .where("replyTo", "==", null)
    .orderBy("updatedAt", "desc")
    .startAt(date)
    .limit(LIMIT);

  return await getTweets(query);
};

export const getOlderTweets = async (
  tweetRef: firebase.firestore.DocumentSnapshot<TweetDocument>
) => {
  console.log("getOlderTweets!!!!!");
  const query = tweets
    .where("replyTo", "==", null)
    .orderBy("updatedAt", "desc")
    .startAfter(tweetRef)
    .limit(LIMIT);

  return await getTweets(query);
};

/**
 * 指定した時刻以前の指定したユーザのツイートを取得
 *   replyツイートは含まない
 */
export const getUserTweets = async (
  tweetRef: firebase.firestore.DocumentSnapshot<TweetDocument>,
  userRef: firebase.firestore.DocumentSnapshot<UserDocument>
) => {
  const query = tweets
    .where("replyTo", "==", null)
    .where("sender", "==", userRef)
    .orderBy("updatedAt", "desc")
    .startAt(tweetRef)
    .limit(LIMIT);

  return await getTweets(query);
};

export const listenTweets = (
  now: string,
  callback: (tweets: Tweet[]) => void
) => {
  const query = tweets
    .where("replyTo", "==", null)
    .orderBy("updatedAt", "asc")
    .startAfter(now);
  return query.onSnapshot(snapshot => {
    const tweets: Tweet[] = [];
    snapshot.docs.forEach(doc => {
      tweets.push({ ...doc.data(), id: doc.id });
    });

    callback(tweets);
  });
};
