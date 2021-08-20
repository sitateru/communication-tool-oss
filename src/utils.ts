/**
 * HTML-safe な文字列に変換
 * @param html HTML タグを含む文字列
 * @returns エスケープ済みの文字列
 */
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
  const urlPattern = /(\bhttps?:\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi;
  return text.replace(urlPattern, template);
};

/**
 * URL や HTML タグを含む文字列をリンク付きの HTML-safe な文字列に変換
 * @param text URL や HTML タグを含む文字列
 * @returns URL 部分は <a> タグに置換され、それ以外の HTML タグはエスケープ済みの文字列
 */
export const safeHtmlWithLink = (text: string, klass?: string) =>
  autolink(escapeHtml(text), klass);
