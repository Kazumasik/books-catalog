import { editData, getData, postData, deleteData } from "@/api/apiService";
import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",

  state: () => ({
    token: localStorage.getItem("token"),
    user: {},
    userRole: "user"
  }),

  getters: {
    getToken: (state) => state.token,
    getUser: (state) => state.user,
    getUserId: (state) => state.user?.id,
    getUserRole: (state) => state.user?.role,
    isAuth: (state) => state.token ? true : false,
    isAdmin: (state) => state.userRole === "admin" ? true : false,
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
      this.userRole=response.user.role
    },
    async register(payload) {
      const response = await postData("auth/register", payload);
      this.setToken(response.token);
      this.user=response.user
      this.userRole=response.user.role
    },
    logout() {
      this.token = null;
      this.user = null;
      this.userRole = "user";
      localStorage.clear();
    },
    async current() {
      const response = await getData("user/current");
      this.user=response
      this.userRole=response.role
    },
    async findById(userId) {
      const response = await getData("user/"+userId);
      return response
    },
    async changeName(newName) {
      const payload={
        nickname: newName
      }
      const response = await editData("user/", payload);
      return response
    },
    async addBookmark(bookId, bookmarkType) {
      const payload = {
        bookmarkType
      }
      const response = await editData(`book/${bookId}/add-bookmark`, payload);
      return response
    },
    async deleteBookmark(bookId) {
      console.log("Подтверждаю")
      await deleteData(`book/${bookId}/bookmark`);
    },
  },
});
