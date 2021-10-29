import firebase from "firebase/app";

export const firebaseConfig = {
  apiKey: "yourApiKey",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  databaseURL: "https://your-project-id.firebaseio.com",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:1234567890abcdef123456",
  measurementId: ""
};

export const signInOptions = [
  {
    provider: firebase.auth?.GoogleAuthProvider.PROVIDER_ID
  }
];

export const title = "app title";

export const appLogo = {
  default: "https://dummyimage.com/135x36/222/fff.jpg&text=Logo",
  large: "https://dummyimage.com/484x139/fff/222.jpg&text=LargeLogo"
};

export type Office = "kumamoto" | "tokyo" | "other";

export const offices = [
  {
    value: "kumamoto",
    text: "熊本",
    selected: true,
    label: "in Kumamoto office"
  },
  { value: "tokyo", text: "東京", selected: false, label: "in Tokyo office" },
  {
    value: "other",
    text: "その他",
    selected: false,
    label: "on a third place"
  }
];

export const copyright = `&copy;2014-${new Date()
  .getFullYear()
  .toString()} sitateru Inc.`;

export const defaultCoverImage = "https://dummyimage.com/1080x256/222/fff.jpg";
