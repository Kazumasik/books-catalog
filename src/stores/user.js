import { editData, getData, postData, deleteData } from "@/api/apiService";
import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",

  state: () => ({
    token: localStorage.getItem("token"),
    user: null,
    statuses: [
      {
        id: 0,
        name: "Марафон",
        color: "success",
      },
      {
        id: 1,
        name: "Онгоинг",
        color: "indigo-accent-2",
      },
      {
        id: 2,
        name: "Хватит",
        color: "primary",
      },
      {
        id: 3,
        name: "Отпуск",
        color: "error",
      },
    ],
    roles: [
      {
        id: 0,
        name: "Куратор",
        color: "error",
      },
      {
        id: 1,
        name: "Равочник",
        color: "blue-lighten-1",
      },
      {
        id: 2,
        name: "Клинер",
        color: "success",
      },
      {
        id: 3,
        name: "Переводчик",
        color: "purple-lighten-1",
      },
      {
        id: 4,
        name: "Тайпер",
        color: "primary",
      },
      {
        id: 5,
        name: "Бета",
        color: "indigo-accent-2",
      },
    ],
  }),

  getters: {
    isAuth: (state) => (state.token ? true : false),
    getStatusById: (state) => (id) => {
      return state.statuses.find((status) => status.id === id) || null;
    },
    getRolesById: (state) => (roles) => {
      return roles.map((role) => {
        const roleId = role.role;
        const matchingRole = state.roles.find((r) => r.id === roleId);
        return {
          ...role,
          name: matchingRole.name,
          color: matchingRole.color,
        };
      });
    },
    getWorkersColor: (state) => (workers) => {
      return workers.map((worker) => {
        const role = state.roles.find((role) => role.id === worker.role);
        return {
          ...worker,
          color: role.color,
        };
      });
    },
  },

  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem("token", token);
    },
    async login(payload) {
      const response = await postData("/auth/login", payload);
      this.setToken(response.content.token);
      this.user = response.content;
    },
    async register(payload) {
      const response = await postData("/auth/register", payload);
      this.setToken(response.content.token);
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.clear();
    },
    async current() {
      const response = await getData("/users/current");
      this.user = response.content;
    },
    async findById(userId) {
      const response = await getData("/users/" + userId);
      return response;
    },
    async getStatuses() {
      return await getData("/statuses");
    },
    async changeStatus(statusId) {
      const payload = {
        status: statusId,
      };
      return await editData(`/users/status`, payload);
    },
    async changePassword(newPass) {
      const payload = {
        password: newPass,
      };
      await postData("/auth/change-password/", payload);
    },
  },
});
