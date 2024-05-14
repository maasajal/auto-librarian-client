import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
  // baseURL: "https://auto-librarian.vercel.app",
  withCredential: true,
});

const useAxiosSecure = () => {
  return axiosSecure;
};
export default useAxiosSecure;
