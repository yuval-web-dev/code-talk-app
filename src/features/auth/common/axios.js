import axios from "axios";

export const authAPI = axios.create({
  baseURL: "http://localhost:8080/auth/",
  timeout: 5000,
});
