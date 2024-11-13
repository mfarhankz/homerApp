// src/services/api.js
import axios from 'axios'
import Cookies from 'js-cookie'

const API_BASE_URL = import.meta.env.VITE_Homer_API_Base_Url

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add request interceptor to include auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Auth related API calls
export const authAPI = {
  login: async (userName, password) => {
    const response = await apiClient.post('/Account/signin', {
      userName,
      password,
    })
    return response.data
  },

  logout: async () => {
    const response = await apiClient.post('/Account/signout')
    return response.data
  },

  refreshToken: async () => {
    const response = await apiClient.post('/Account/refresh-token')
    return response.data
  },
}

// Base data related API calls
export const baseDataAPI = {
  fetchCityData: async () => {
    try {
      const response = await apiClient.get('/Listing/GetCities')
      if (response.data) {
        return {
          success: true,
          data: response.data,
        }
      }

      return {
        success: false,
        error: response.data.message || 'Failed to fetch city data',
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || 'An error occurred while fetching city data',
      }
    }
  },

  fetchRegionsByCity: async (city) => {
    try {
      const response = await apiClient.get(
        '/Listing/GetRegionsByCity?city=' + city,
      )

      if (response.data) {
        return {
          success: true,
          data: response.data,
        }
      }

      return {
        success: false,
        error: response.data.message || 'Failed to fetch regions by city data',
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.message ||
          'An error occurred while fetching  regions by city data',
      }
    }
  },

  fetchPropertyTypeData: async () => {
    try {
      const response = await apiClient.get('/Listing/GetPropertyTypeData')
      if (response.data) {
        return {
          success: true,
          data: response.data,
        }
      }

      return {
        success: false,
        error: response.data.message || 'Failed to fetch PropertType data',
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.message || 'An error occurred while fetching PropertType data',
      }
    }
  },
}

// Report related API calls (for future use)
export const reportAPI = {
  // Add report related API calls here
}
