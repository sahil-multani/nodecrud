import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURl: "http://localhost:5000/",
});

axiosInstance.interceptors.request.use((config) => {
  // console.log(config);
  // var token = JSON.parse(localStorage.getItem("token"));
  let token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    // config.headers['NeoAuthKey'] = token
    config.headers["token"] = `${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status == 401) {
      // if (localStorage.getItem("AUserToken")) {
      try {
        delete localStorage["token"];
        delete localStorage["isLoggedIn"];
      } catch (error) {
        // toast.error(error)
      }

      toast.error("Session expired.");
      // }
      // localStorage.clear();
    }
    return error.response;
  }
);
export default axiosInstance;
