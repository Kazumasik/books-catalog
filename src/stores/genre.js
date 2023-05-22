import { editData, getData, postData } from "@/api/apiService";
import { defineStore } from "pinia";

export const useGenreStore = defineStore({
  id: "genre",

  state: () => ({
    genres:[]
  }),

  getters: {
    getGenres: (state) => state.genres,
  },

  actions: {
    async fetchAll() {
      this.genres = await getData("genre/all");
    },
  },
});
