import { defineStore } from 'pinia'
import userService from '@/services/userService'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    currentUser: null,
    isLoadingList: false,
    isLoadingDetail: false,
    errorList: null,
    errorDetail: null,
  }),
  actions: {
    async fetchUsers() {
      this.isLoadingList = true
      this.errorList = null
      this.users = []
      try {
        this.users = await userService.getUsers()
      } catch (error) {
        this.errorList = error.message
      } finally {
        this.isLoadingList = false
      }
    },
    async fetchUserById(id) {
      this.isLoadingDetail = true
      this.errorDetail = null
      this.currentUser = null
      try {
        this.currentUser = await userService.getUserById(id)
      } catch (error) {
        this.errorDetail = error.message
      } finally {
        this.isLoadingDetail = false
      }
    },
    // limpiar el usuario actual al salir de la vista de detalle
    clearCurrentUser() {
      this.currentUser = null
      this.errorDetail = null
    },
  },
})
