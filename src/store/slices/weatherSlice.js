import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async () => {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=49.8383&longitude=24.0232&hourly=temperature_2m,wind_speed_10m&forecast_days=1`
    )
    const data = await response.json()
    const temperatureData = data.hourly.temperature_2m
    const windspeedData = data.hourly.wind_speed_10m

    if (temperatureData.length === 0 || windspeedData.length === 0) {
      throw new Error('No weather data available')
    }

    const lastIndex = temperatureData.length - 1

    return {
      temperature: temperatureData[lastIndex],
      windspeed: windspeedData[lastIndex]
    }
  }
)

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    data: null,
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchWeather.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default weatherSlice.reducer
