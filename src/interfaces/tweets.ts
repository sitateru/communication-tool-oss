import { TweetDocument } from "@/interfaces/firestore";

export interface Tweet extends TweetDocument {
  id: string;
}
