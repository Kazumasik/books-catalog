import { editData, getData, postData, deleteData } from "@/api/apiService";
import { defineStore } from "pinia";
import { useRoute } from "vue-router";
export const useBookStore = defineStore({
  id: "book",

  state: () => ({}),

  getters: {},

  actions: {
    async fetchBooks(page, genres) {
      let url = `book?page=${page}`;

      if (genres && Array.isArray(genres)) {
        const genreParams = genres.map((genre) => `genre=${genre}`);
        url += `&${genreParams.join("&")}`;
      } else if (genres) {
        url += `&genre=${genres}`;
      }

      const response = await getData(url);
      return response;
    },
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
    async searchBook(title) {
      const response = await getData(`book/search?title=${title}`);
      return response;
    },
    async createComment(bookId, payload) {
      const response = await postData(`book/${bookId}/comment`, payload);
      return response;
    },
    async deleteComment(commentId) {
      const response = await deleteData(`book/comment/${commentId}`);
    },
    async editComment(commentId, payload) {
      const editedComment = {
        content: payload,
      };
      const response = await editData(
        `book/comment/${commentId}`,
        editedComment
      );
    },
    async fetchAllComments(bookId) {
      const response = await getData(`book/${bookId}/comment`);
      return response;
    },
  },
});
