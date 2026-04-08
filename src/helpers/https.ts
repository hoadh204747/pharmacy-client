import axios from 'axios'
import router from '@/router'
import { message } from 'ant-design-vue'

const IP = 'localhost'
const PORT = '8000'

export const BASE_URL = `http://${IP}:${PORT}/api`

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers!['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    message.error('Request error: ' + error.message)
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data.message) {
      message.success(response.data.message)
    }
    return Promise.resolve(response)
  },
  (error) => {
    switch (error.response?.status) {
      case 401:
        message.error('Unauthorized! Please log in again.')
        router.push({ name: 'Login' })
        break
      case 403:
        message.error('Forbidden! You do not have permission to access this resource.')
        break
      case 404:
        message.error('Not Found! The requested resource could not be found.')
        break
      case 500:
        message.error('Internal Server Error! Please try again later.')
        break
      default:
        message.error('Error: ' + (error.response?.data?.message || error.message))
    }
  },
)

export default axiosInstance
