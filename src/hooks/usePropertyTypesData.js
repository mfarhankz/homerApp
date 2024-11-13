// hooks/useCityData.js
import { useState, useEffect } from 'react'
import { baseDataAPI } from '../services/api'

const PROPERTY_TYPE_DATA_KEY = 'homer_property_types'

// Add a function to save city data that can be called from anywhere
export const savePropertyTypeData = (propertyTypeData) => {
  if (propertyTypeData && propertyTypeData.length > 0) {
    localStorage.setItem(
      PROPERTY_TYPE_DATA_KEY,
      JSON.stringify(propertyTypeData),
    )
  }
}

export const usePropertyTypeData = () => {
  const [propertyTypeData, setPropertyTypeData] = useState(() => {
    const savedData = localStorage.getItem(PROPERTY_TYPE_DATA_KEY)
    return savedData ? JSON.parse(savedData) : []
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchPropertyTypeData = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await baseDataAPI.fetchPropertyTypeData()
      if (result.success) {
        setPropertyTypeData(result.data)
        savePropertyTypeData(result.data)
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
    propertyTypeData,
    loading,
    error,
    refreshPropertyTypeData: fetchPropertyTypeData,
  }
}
