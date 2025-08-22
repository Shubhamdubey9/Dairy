import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/api", // backend URL
  withCredentials: true, // send cookies
});

export default instance;
