/**
 * HTML-safe な文字列に変換
 * @param html HTML タグを含む文字列
 * @returns エスケープ済みの文字列
 */
import { URL_PATTERN } from "@/consts/regex";

export const escapeHtml = (text: string) => {
  const textNode = document.createTextNode(text);
  const p = document.createElement("p");
  p.appendChild(textNode);
  return p.innerHTML;
};

/**
 * 文字列の URL 部分を <a> タグに変換
 * @param text 生の URL を含む文字列
 * @returns URL 部分が <a> タグに置換された文字列
 */
export const autolink = (text: string, klass?: string) => {
  const template = klass
    ? `<a href='$1' target='_blank' class='${klass}'>$1</a>`
    : "<a href='$1' target='_blank'>$1</a>";
  return text.replace(URL_PATTERN, template);
};

/**
 * URL や HTML タグを含む文字列をリンク付きの HTML-safe な文字列に変換
 * @param text URL や HTML タグを含む文字列
 * @returns URL 部分は <a> タグに置換され、それ以外の HTML タグはエスケープ済みの文字列
 */
export const safeHtmlWithLink = (text: string, klass?: string) =>
  autolink(escapeHtml(text), klass);

/**
 * Array.prototype.sortの比較式で使用する関数
 * @param first
 * @param second
 * @param property
 * @param direction
 */
export const sortBy = <T>(
  first: T,
  second: T,
  property: keyof T,
  direction: "asc" | "desc" = "asc"
) => {
  if (direction === "asc") {
    if (first[property] < second[property]) return -1;
    if (first[property] > second[property]) return 1;
    return 0;
  }

  if (first[property] < second[property]) return 1;
  if (first[property] > second[property]) return -1;
  return 0;
};

/**
 * 文字列からURLを取得
 * @param text URLが含まれるかもしれない文字列
 */
export const getUrls = (text: string) => text.match(URL_PATTERN);
