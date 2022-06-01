import { client } from "./client";

// ISBNによるBOOK情報の取得
export const searchBook = (isbn: number) => {
  return client.get(`?q=isbn:${isbn}`);
};