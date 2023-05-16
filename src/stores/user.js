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
    getUser: (state) => state.user,
  },

  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem("token", token);
    },
    async login(payload) {
      const response = await postData("auth/login", payload);
      this.setToken(response.token);
      this.user=response.user
    },
    async register(payload) {
      const response = await postData("auth/register", payload);
      this.setToken(response.token);
    },
    async logout() {
      this.token = null;
      localStorage.clear();
    },
    async current() {
      const response = await getData("user/current");
      this.user=response
    },
    async findById(userId) {
      const response = await getData("user/"+userId);
      return response
    },
  },
});
