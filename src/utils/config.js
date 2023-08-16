import axios from "axios";
const BASE_URL = "https://clean-wonder-395819.uc.r.appspot.com";

export const baseAxios = axios.create({
  baseURL: BASE_URL,
});
