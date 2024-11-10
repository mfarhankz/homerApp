// hooks/useCityData.js
import { useState, useEffect } from 'react'
import { baseDataAPI } from '../services/api'

const CITY_DATA_KEY = 'homer_city_data'

// Add a function to save city data that can be called from anywhere
export const saveCityData = (cityData) => {
  if (cityData && cityData.length > 0) {
    localStorage.setItem(CITY_DATA_KEY, JSON.stringify(cityData))
  }
}

export const useCityData = () => {
  const [cityData, setCityData] = useState(() => {
    const savedData = localStorage.getItem(CITY_DATA_KEY)
    return savedData ? JSON.parse(savedData) : []
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchCityData = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await baseDataAPI.fetchCityData()
      if (result.success) {
        setCityData(result.data)
        saveCityData(result.data)
        return true
      } else {
        setError(result.error)
        return false
      }
    } catch (err) {
      setError(err.message)
      return false
    } finally {
      setLoading(false)
    }
  }

  return {
    cityData,
    loading,
    error,
    refreshCityData: fetchCityData,
  }
}
