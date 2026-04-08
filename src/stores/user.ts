import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userId: 0,
    username: '',
    email: '',
    phone: '',
    role: '',
    isLogin: false,
  }),
  actions: {
    setUser(user: { id: number; username: string; email: string; phone: string; role: string }) {
      this.userId = user.id
      this.username = user.username
      this.email = user.email
      this.phone = user.phone
      ;(this.role = user.role), (this.isLogin = true)
    },
    logout() {
      this.userId = 0
      this.username = ''
      this.email = ''
      this.phone = ''
      this.role = ''
      this.isLogin = false
    },
  },
  persist: {
    key: 'pharmacy_user',
    storage: window.localStorage,
  },
})
