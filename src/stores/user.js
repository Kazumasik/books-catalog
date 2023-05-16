import { editData, getData, postData } from "@/api/apiService";
import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",

  state: () => ({
    token: localStorage.getItem("token"),
    user: {},
  }),

  getters: {
    getToken: (state) => state.token,
  },

  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem("token", token);
    },
    async login(payload) {
      const response = await postData("auth/login", payload);
      this.setToken(response.token);
    },
    async register(payload) {
      const response = await postData("auth/register", payload);
      this.setToken(response.token);
    },
    async logout() {
      this.token = null;
      localStorage.clear();
    },
  },
});
