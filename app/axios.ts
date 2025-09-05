import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export default axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});
