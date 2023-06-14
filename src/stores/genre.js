import { editData, getData, postData, deleteData } from "@/api/apiService";
import { defineStore } from "pinia";

export const useGenreStore = defineStore({
  id: "genre",

  state: () => ({
    genres: [],
    categories: [],
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
    async deleteItem(item) {
      if (item.type === "genre") {
        await deleteData(`genre/${item._id}`);
      } else if (item.type === "category") {
        await deleteData(`category/${item._id}`);
      }
      this.fetchAll();
    },
    async createItem(item) {
      const payload = {
        name: item.name,
      };
      if (item.type === "genre") {
        await postData(`genre/create`, payload);
      } else if (item.type === "category") {
        await postData(`category/create`, payload);
      }
      this.fetchAll();
    },
    async editItem(item) {
      const payload = {
        name: item.name,
      };
      if (item.type === "genre") {
        await editData(`genre/${item._id}`, payload);
      } else if (item.type === "category") {
        await editData(`category/${item._id}`, payload);
      }
      this.fetchAll();
    },
  },
});
