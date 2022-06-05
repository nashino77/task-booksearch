// 全角半角変換
export const toHalfWidth = (str: string) => {
  const halfStr = str.replace(/[０-９]/g, (s) => {
    return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
  });
  return halfStr;
};
// isbn数値のバリデーション
export const validateCheck = (n: string) => {
  return ![0, 10, 13].includes(n.length) || (/[^0-9０-９]+/).test(n)};