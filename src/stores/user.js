import { editData, getData, postData, deleteData } from "@/api/apiService";
import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",

  state: () => ({
    token: localStorage.getItem("token"),
    user: null,
  }),

  getters: {
    isAuth: (state) => (state.token ? true : false),
  },

  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem("token", token);
    },
    async login(payload) {
      const response = await postData("/auth/login", payload);
      this.setToken(response.content.token);
      this.user = response.content;
    },
    async register(payload) {
      const response = await postData("/auth/register", payload);
      this.setToken(response.content.token);
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.clear();
    },
    async current() {
      const response = await getData("/users/current");
      this.user = response.content;
    },
    async findById(userId) {
      const response = await getData("/users/" + userId);
      return response;
    },
  },
});
