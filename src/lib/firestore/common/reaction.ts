import firebase from "firebase";
import { Reaction, Reactions } from "@/interfaces/firestore";

export const addReaction = async (
  collectionReference: firebase.firestore.CollectionReference<Reactions>,
  documentId: string,
  reactionId: string,
  userId: string
) => {
  const documentReference = collectionReference.doc(documentId);
  const snapshot = await documentReference.get();
  const document = snapshot.data();

  if (!document) return;

  const { reactions } = document;
  const userReferencePath = `users/${userId}`;

  let data: Reaction[];

  if (reactions) {
    data = [...reactions];

    const index = data.findIndex(reaction => reaction.id === reactionId);

    if (index === -1) {
      data.push({ id: reactionId, users: [userReferencePath] });
    } else if (!data[index].users.includes(userReferencePath)) {
      data[index].users.push(userReferencePath);
    }
  } else {
    data = [{ id: reactionId, users: [userReferencePath] }];
  }

  try {
    await documentReference.update("reactions", data);
  } catch (e) {
    console.error(e);
  }
};

export const removeReaction = async (
  collectionReference: firebase.firestore.CollectionReference<Reactions>,
  documentId: string,
  reactionId: string,
  userId: string
) => {
  const documentReference = collectionReference.doc(documentId);
  const snapshot = await documentReference.get();
  const document = snapshot.data();

  if (!document) return;

  const { reactions } = document;
  const userReferencePath = `users/${userId}`;

  if (!reactions) return;

  let data = [...reactions];
  const index = data.findIndex(reaction => reaction.id === reactionId);
  if (index === -1) return;

  const { users } = data[index];

  if (!users.includes(userReferencePath)) return;

  if (users.length > 1) {
    data[index].users = users.filter(user => user !== userReferencePath);
  } else {
    data = data.filter(reaction => reaction.id !== reactionId);
  }

  try {
    await documentReference.update("reactions", data);
  } catch (e) {
    console.error(e);
  }
};
