import axios from "axios";
import router from "../router";

const apiService = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

apiService.interceptors.request.use((config) => {
  if (localStorage.getItem("token")) {
    config.headers = {
      Authorization: `Bearer uTl74bwA60QfGHGFokwPsRAkBg4PlltGGevxLnKqSVNQ`,
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
      const userStore = useUserStore();
      switch (error.response.status) {
        case 404:
          router.replace("/404");
          break;
        case 498:
          userStore.logout();
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
    const response = await apiService.put(url, payload);
    return response.data;
  } catch (e) {
    return Promise.reject(e);
  }
};

const getFile = async (url, name) => {
  try {
    const response = await apiService.get(url, {
      responseType: "blob",
    });

    const disposition = response.headers["content-disposition"];
    let fileName = name; // Имя файла по умолчанию

    const downloadLink = document.createElement("a");
    const contentType = response.headers["content-type"];
    const blob = new Blob([response.data], { type: contentType });
    const objectUrl = URL.createObjectURL(blob);

    downloadLink.href = objectUrl;
    downloadLink.download = fileName;
    downloadLink.click();

    URL.revokeObjectURL(objectUrl);

    return true;
  } catch (e) {
    return Promise.reject(e);
  }
};

export { getData, postData, deleteData, editData, getFile, apiService };
