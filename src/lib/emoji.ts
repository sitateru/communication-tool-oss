import data from "emoji-mart-vue-fast/data/all.json";

export interface EmojiData {
  colons: string;
  emoticons: string[];
  id: string;
  name: string;
  native: string;
  short_name: string;
  short_names: string[];
  skin: null;
  unified: string;
  _data: unknown;
  _sanitized: unknown;
  _skins: null;
}

interface Emojis {
  [id: string]:
    | {
        added_in: string;
        emoticons?: unknown;
        has_img_apple: boolean;
        has_img_facebook: boolean;
        has_img_google: boolean;
        has_img_twitter: boolean;
        keywords: string[];
        name: string;
        non_qualified?: unknown;
        search: string;
        sheet_x: number;
        sheet_y: number;
        short_names: string[];
        text: string;
        unified: string;
      }
    | undefined;
}

export const getEmoji = (id: string) => {
  const emojis: Emojis = data.emojis as any;
  const emoji = emojis[id];

  if (!emoji) return "";

  const hex = parseInt(emoji.unified, 16);
  if (!hex) return "";

  return String.fromCodePoint(hex);
};
