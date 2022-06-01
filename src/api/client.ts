import axios from "axios";

export const  client = axios.create({
  baseURL: 'https://www.googleapis.com/books/v1/volumes',
});