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
    async fetchNewBooks() {
      return await getData("book/new/");
    },
    async fetchNewBooks() {
      return await getData("book/new/");
    },
  },
});
