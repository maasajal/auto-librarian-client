import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://auto-librarian.vercel.app",
  withCredential: true,
});

const useAxiosSecure = () => {
  return axiosSecure;
};
export default useAxiosSecure;
