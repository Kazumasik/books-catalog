import { editData, getData, postData } from "@/api/apiService";
import { defineStore } from "pinia";

export const useBookStore = defineStore({
  id: "book",

  state: () => ({}),

  getters: {},

  actions: {
    async createBook(payload) {
      const response = await postData("book/create", payload);
      return response
    },
    async findById(bookId) {
      const response = await getData("book/" + bookId);
      return response
    },
  },
});
