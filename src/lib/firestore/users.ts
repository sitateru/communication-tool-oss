import firebase from "firebase";
import { User } from "@/interfaces";
import { getCurrentUser } from "@/firebase";
import { ProfileMessagesDocument, UserDocument } from "@/interfaces/firestore";

const db = firebase.firestore();

export const users = db.collection(
  "users"
) as firebase.firestore.CollectionReference<UserDocument>;

export const profileMessages = db.collection(
  "profileMessages"
) as firebase.firestore.CollectionReference<ProfileMessagesDocument>;

export const convertUser = (id: string, userDocument: UserDocument) => {
  return {
    ...userDocument,
    id
  } as User;
};

export const fetchUsers = () => {
  const usersList: User[] = [];
  return users.get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
      usersList.push(convertUser(doc.id, doc.data()));
    });
    return usersList;
  });
};

export const findUser = async (id: string) => {
  const snapshot = await users.doc(id).get();
  const data = snapshot.data();

  if (!data) {
    return null;
  }

  return convertUser(id, data);
};

export const findUserName = async (id: string) => {
  const userDocument = await findUser(id);
  if (!userDocument) return null;
  const { firstNameJP, lastNameJP } = userDocument;
  return `${lastNameJP} ${firstNameJP}`;
};

export const findUserByEmail = async (email?: string | null) => {
  if (!email) return null;
  const snapshot = await users.where("updatedBy", "==", email).get();
  const [doc] = snapshot.docs;
  return doc && ({ id: doc.id, ...doc.data() } as User);
};

export const findMe = () => findUserByEmail(getCurrentUser()?.email);
