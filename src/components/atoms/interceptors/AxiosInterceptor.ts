import axios from "axios";
import { useUserSelector } from "../../../redux/redux-hooks/hooks";
import { useSelector } from "react-redux";
import userState from "../types/redux/redux-types";

let store
export const injectStore = _store => {
  store = _store
}

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_URL, // Replace with your API base URL
});

// Request interceptor
axiosClient.interceptors.request.use(
  (request) => {
    const accessToken=store.getState().token;
    if (accessToken) {
      if (request.headers)
        request.headers.Authorization = `Bearer ${accessToken}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle response errors here

    return Promise.reject(error);
  }
);

export default axiosClient;
