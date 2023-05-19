import { editData, getData, postData } from "@/api/apiService";
import { defineStore } from "pinia";

export const useGenreStore = defineStore({
  id: "genre",

  state: () => ({}),

  getters: {},

  actions: {
    async fetchAll() {
      const response = await getData("genre/all");
      return response;
    },
  },
});
