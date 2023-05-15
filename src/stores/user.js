import { editData, getData, postData } from '@/api/apiService'
import { defineStore } from 'pinia'
import router from '../router'

export const useUserStore = defineStore({
  id: 'user',

  state: () => ({
    token: localStorage.getItem('token'),
    user: {},
    tokenValid: false,
  }),

  getters: {
  },

  actions: {
    setToken(token) {
      this.token = token
      localStorage.setItem('token', token)
    },
    async login(payload) {
      const response = await postData('auth/login', payload)
      this.setToken(response.token)
      router.replace('/')
    },
    async register(payload) {
      const response = await postData('auth/register', payload)
      this.setToken(response.token)
      router.replace('/')
    },
  },
})
