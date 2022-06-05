import axios from "axios";
// ベースURL作成
export const  client = axios.create({
  baseURL: 'https://www.googleapis.com/books/v1/volumes',
});
// ISBNによるBOOK情報の取得
export const searchBook = (isbn: number) => {
  return client.get(`?q=isbn:${isbn}`);
};