import { editData, getData, postData, deleteData } from "@/api/apiService";
import { defineStore } from "pinia";

export const useTitleStore = defineStore({
  id: "title",

  state: () => ({}),

  getters: {},

  actions: {
    async findBySlug(slug) {
      return await getData(`/titles/${slug}/`);
    },
    async updateTitle(slug, payload) {
      await editData(`/titles/${slug}/`, payload);
    },
    async createTitle(payload) {
      return await postData(`/titles/`, payload);
    },
  },
});
