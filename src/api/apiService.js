import axios from "axios";
import router from "../router";
const apiService = axios.create({
  baseURL: "http://localhost:5000/",
});

apiService.interceptors.request.use((config) => {
  if (localStorage.getItem("token")) {
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
  }
  return config;
});

apiService.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    {
      switch (error.response.status) {
        case 404:
          router.replace("/404");
          break;
        case 401:
          localStorage.clear();
          router.replace("/");
          break;
        default:
          break;
      }
    }
    return Promise.reject(error);
  }
);

const getData = async (url) => {
  try {
    const response = await apiService.get(url);
    return response.data;
  } catch (e) {
    return Promise.reject(e);
  }
};

const postData = async (url, payload) => {
  try {
    const response = await apiService.post(url, payload);
    return response.data;
  } catch (e) {
    return Promise.reject(e);
  }
  // try {
  //   const response = await apiService.post(url, payload);
  //   return response.data;
  // } catch (e) {
  //   return Promise.reject(e);
  // }
};
const deleteData = async (url) => {
  try {
    const response = await apiService.delete(url);
    return response.data;
  } catch (e) {
    return Promise.reject(e);
  }
};
const editData = async (url, payload) => {
  try {
    const response = await apiService.put(url, { ...payload });
    return response.data;
  } catch (e) {
    return Promise.reject(e);
  }
};

export { getData, postData, deleteData, editData, apiService };
