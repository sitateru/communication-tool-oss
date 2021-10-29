import firebase from "firebase/app";
import "firebase/firebase-firestore";
import * as firebaseui from "firebaseui";
import { firebaseConfig, signInOptions } from "@/config";

firebase.initializeApp(firebaseConfig);

if (process.env.NODE_ENV === "emulator") {
  const db = firebase.firestore();
  db.useEmulator("localhost", 18080);
}

/**
 * Authentication
 */
interface FirebaseUser {
  displayName: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  photoURL: string;
  refreshToken: string;
  uid: string;
}
interface AuthResult {
  user: FirebaseUser;
}

export const getCurrentUser = () => firebase.auth().currentUser;
export const getUserName = () => getCurrentUser()?.email?.split("@")[0];

export const logout = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      location.href = "/";
    })
    .catch(error => {
      console.warn(error.message);
      alert(error.message);
    });
};

export const startAuthUI = async (
  elementId: string,
  singInSuccessCallback: () => void,
  signInFailureCallback: (error: Error) => void
) => {
  await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

  const uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: (authResult: AuthResult) => {
        const { user } = authResult;
        const currentUser = getCurrentUser();
        if (!currentUser) {
          console.warn("ユーザ情報を取得できません");
          return false;
        }

        currentUser
          .updateProfile(user)
          .then(() => {
            singInSuccessCallback();
          })
          .catch(error => {
            signInFailureCallback(error);
          });
        return false;
      }
    },
    signInOptions: signInOptions
  };

  const ui =
    firebaseui.auth.AuthUI.getInstance() ||
    new firebaseui.auth.AuthUI(firebase.auth());

  ui.start(elementId, uiConfig);
};

/**
 * Storage
 */
const getStorageRef = () => firebase.storage().ref();

export const uploadFile = async (file: File | string, subDir: string) => {
  if (typeof file === "string") {
    return file;
  }

  const userName = getUserName();
  if (!userName) {
    return null;
  }

  const { type } = file;
  const blob = file.slice(0, file.size, type);
  const fileName = `images/${userName}/${subDir}/${file.name}`;
  const uploadFile = new File([blob], fileName, { type });

  try {
    await getStorageRef()
      .child(fileName)
      .put(uploadFile);
    return fileName;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const uploadFiles = async (
  files: Array<string | File>,
  subDir: string
) => {
  const userName = getUserName();
  if (!userName) {
    return null;
  }

  const requests = files.map(async (file, index) => {
    if (typeof file === "string") {
      return file;
    }

    const { type } = file;
    const blob = file.slice(0, file.size, type);
    const fileName = `images/${userName}/${subDir}/${index}/${file.name}`;
    const uploadFile = new File([blob], fileName, { type });
    await getStorageRef()
      .child(fileName)
      .put(uploadFile);
    return fileName;
  });

  try {
    const fileNames = await Promise.all(requests);
    return fileNames;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const deleteFile = async (path: string) => {
  try {
    await getStorageRef()
      .child(path)
      .delete();
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getResourceUrl = async (path: string) => {
  if (!path) return null;

  try {
    return (await getStorageRef()
      .child(path)
      .getDownloadURL()) as string;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const firebaseInitialized = firebase;
