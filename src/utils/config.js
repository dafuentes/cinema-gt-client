import axios from "axios";
const development = true;
const BASE_URL = development
  ? "http://127.0.0.1:3001"
  : "https://clean-wonder-395819.uc.r.appspot.com";

console.log(BASE_URL);
export const baseAxios = axios.create({
  baseURL: BASE_URL,
});
