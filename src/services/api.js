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

  fetchListingMedia: async (listingKey) => {
    try {
      const response = await apiClient.get(
        '/Listing/GetListingMedia?listingKey=' + listingKey,
      )
      if (response.data) {
        return {
          success: true,
          data: response.data,
        }
      }
      return {
        success: false,
        error: response.data.message || 'Failed to report data',
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || 'An error occurred while fetching report data',
      }
    }
  },
  fetchReportData: async (reportId, abortSignal) => {
    try {
      const response = await apiClient.get(
        '/Listing/LoadReport?reportId=' + reportId,
        {
          signal: abortSignal || null, // Pass additional configurations here
        },
      )
      if (response.data) {
        return {
          success: true,
          data: response.data,
        }
      }
      return {
        success: false,
        error: response.data.message || 'Failed to report data',
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || 'An error occurred while fetching report data',
      }
    }
  },
  generateReportSignatureData: async (reportPayload, abortSignal) => {
    try {
      const response = await apiClient.post(
        '/Listing/GenerateNeighborhoodReportSignature',
        reportPayload, // This is the actual payload
        {
          headers: {
            'Content-Type': 'application/json',
          },
          signal: abortSignal || null, // Pass additional configurations here
        },
      )
      if (response.data) {
        return {
          success: true,
          data: response.data,
        }
      }
      return {
        success: false,
        error: response.data.message || 'Failed to report data',
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || 'An error occurred while fetching report data',
      }
    }
  },
  getReportListingCount: async (payload, abortSignal) => {
    try {
      const response = await apiClient.post(
        '/Listing/GetListingCount',
        payload, // This is the actual payload
        {
          headers: {
            'Content-Type': 'application/json',
          },
          signal: abortSignal || null, // Pass additional configurations here
        },
      )
      if (response.data) {
        return {
          success: true,
          data: response.data,
        }
      }
      return {
        success: false,
        error: response.data.message || 'Failed to report data',
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || 'An error occurred while fetching report data',
      }
    }
  },
  saveReport: async (payLoad, abortSignal) => {
    try {
      const response = await apiClient.post(
        '/Listing/SaveReport',
        payLoad, // This is the actual payload
        {
          headers: {
            'Content-Type': 'application/json',
          },
          signal: abortSignal || null, // Pass additional configurations here
        },
      )
      if (response.data) {
        return {
          success: true,
          data: response.data,
        }
      }
      return {
        success: false,
        error: response.data.message || 'Failed to report data',
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || 'An error occurred while fetching report data',
      }
    }
  },
  getUserReports: async (abortSignal) => {
    try {
      const response = await apiClient.get('/Listing/GetUserSavedReports', {
        signal: abortSignal || null, // Pass additional configurations here
      })
      if (response.data) {
        return {
          success: true,
          data: response.data,
        }
      }
      return {
        success: false,
        error: response.data.message || 'Failed to report data',
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || 'An error occurred while fetching report data',
      }
    }
  },
}

// Report related API calls (for future use)
export const reportAPI = {
  // Add report related API calls here
}
