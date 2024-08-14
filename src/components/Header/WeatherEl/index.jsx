import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWeather } from '../../../store/slices/weatherSlice'
import styles from '../Header.module.sass'

function Weather () {
  const dispatch = useDispatch()
  const weather = useSelector(state => state.weather.data)
  const weatherStatus = useSelector(state => state.weather.status)

  useEffect(() => {
    dispatch(fetchWeather())
  }, [dispatch])

  if (weatherStatus === 'loading') {
    return <div>Loading weather...</div>
  }

  if (weatherStatus === 'failed') {
    return <div>Failed to load weather data</div>
  }

  return (
    <div className={styles.weather}>
      <h2>Current Weather:</h2>
      {weather && (
        <p>
          {weather.temperature}°C, {weather.windspeed} km/h
        </p>
      )}
    </div>
  )
}

export default Weather
