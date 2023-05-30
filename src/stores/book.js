import {
  editData,
  getData,
  postData,
  deleteData,
  getFile,
} from "@/api/apiService";
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
      console.log(payload);
      const formData = new FormData();
      formData.append("title", payload.title);
      formData.append("origTitle", payload.origTitle);
      formData.append("description", payload.description);
      formData.append("genres", JSON.stringify(payload.genres));
      formData.append("image", payload.image[0]);
      formData.append("content", payload.content[0]);
      return await postData("book/create", formData);
    },
    async updateBook(bookId, payload) {
      console.log(payload);
      const formData = new FormData();
      formData.append("title", payload.title);
      formData.append("origTitle", payload.origTitle);
      formData.append("description", payload.description);
      formData.append("genres", JSON.stringify(payload.genres));
      if (payload.image) {
        formData.append("image", payload.image[0]);
      }
      if (payload.content) {
        formData.append("content", payload.content[0]);
      }
      await editData(`book/${bookId}`, formData);
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
    async addRating(bookId, rating) {
      const payload = {
        rating,
      };
      const response = await postData(`book/${bookId}/rating`, payload);
      return response;
    },
    async downloadBook(bookId, bookName) {
      await getFile(`book/${bookId}/download`, bookName);
    },
    async getBookContent(bookId, page) {
      let url = `book/${bookId}/content`
      if(page){
        url+=`?page=${page}`
      }
      return await getData(url);
    },
  },
});
