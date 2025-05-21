import axios from 'axios'

const API_URL = 'https://jsonplaceholder.typicode.com'

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default {
  async getUsers() {
    try {
      const response = await apiClient.get('/users')
      return response.data
    } catch (error) {
      console.error('Error fetching users:', error)
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          'Failed to fetch users'
      )
    }
  },

  async getUserById(id) {
    if (!id) throw new Error('User ID is required')
    try {
      const response = await apiClient.get(`/users/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error fetching user with id ${id}:`, error)
      if (error.response && error.response.status === 404) {
        throw new Error('User not found')
      }
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          `Failed to fetch user ${id}`
      )
    }
  },
}
