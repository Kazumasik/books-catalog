import { editData, getData, postData } from "@/api/apiService";
import { defineStore } from "pinia";

export const useGenreStore = defineStore({
  id: "genre",

  state: () => ({
    genres:[],
    categories:[],
  }),

  getters: {
    getGenres: (state) => state.genres,
    getCategories: (state) => state.categories,
  },

  actions: {
    async fetchAll() {
      this.genres = await getData("genre/all");
      this.categories = await getData("category/all");
    },
  },
});
