import { editData, getData, postData, deleteData } from "@/api/apiService";
import { defineStore } from "pinia";

export const useBookStore = defineStore({
  id: "book",

  state: () => ({}),

  getters: {},

  actions: {
    async createBook(payload) {
      const response = await postData("book/create", payload);
      return response;
    },
    async updateBook(bookId, payload) {
      await editData(`book/${bookId}`, payload);
    },
    async deleteBook(bookId) {
      await deleteData(`book/${bookId}`);
    },
    async findById(bookId) {
      const response = await getData("book/" + bookId);
      return response;
    },
    async createComment(bookId, payload) {
      const response = await postData(`book/${bookId}/comment`, payload);
      return response;
    },
    async fetchAllComments(bookId) {
      const response = await getData(`book/${bookId}/comment`);
      return response;
    },
  },
});
