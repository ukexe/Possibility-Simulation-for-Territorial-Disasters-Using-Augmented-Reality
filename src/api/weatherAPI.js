/**
 * Weather API interface for fetching weather data
 */

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';

export const fetchWeatherData = async (latitude, longitude) => {
  try {
    const response = await fetch(`${API_BASE_URL}/weather?lat=${latitude}&lon=${longitude}`);
    if (!response.ok) {
      throw new Error('Weather data fetch failed');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const fetchForecast = async (latitude, longitude, days = 5) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/weather/forecast?lat=${latitude}&lon=${longitude}&days=${days}`
    );
    if (!response.ok) {
      throw new Error('Forecast data fetch failed');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    throw error;
  }
};

export const fetchHistoricalData = async (latitude, longitude, startDate, endDate) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/weather/historical?lat=${latitude}&lon=${longitude}&start=${startDate}&end=${endDate}`
    );
    if (!response.ok) {
      throw new Error('Historical data fetch failed');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching historical data:', error);
    throw error;
  }
}; 