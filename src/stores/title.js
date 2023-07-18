import { editData, getData, postData, deleteData } from "@/api/apiService";
import { defineStore } from "pinia";

export const useTitleStore = defineStore({
  id: "title",

  state: () => ({}),

  getters: {
    isAuth: (state) => (state.token ? true : false),
  },

  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem("token", token);
    },
  },
});
