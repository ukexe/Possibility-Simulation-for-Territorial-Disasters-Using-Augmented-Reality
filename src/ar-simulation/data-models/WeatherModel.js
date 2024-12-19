/**
 * Weather data model for handling weather data and simulations
 */

export class WeatherModel {
  constructor(data) {
    this.temperature = data.temperature;
    this.humidity = data.humidity;
    this.windSpeed = data.windSpeed;
    this.windDirection = data.windDirection;
    this.precipitation = data.precipitation;
    this.pressure = data.pressure;
    this.visibility = data.visibility;
    this.cloudCover = data.cloudCover;
    this.timestamp = data.timestamp || new Date();
  }

  static fromAPI(apiData) {
    return new WeatherModel({
      temperature: apiData.temp,
      humidity: apiData.humidity,
      windSpeed: apiData.wind_speed,
      windDirection: apiData.wind_deg,
      precipitation: apiData.precipitation,
      pressure: apiData.pressure,
      visibility: apiData.visibility,
      cloudCover: apiData.clouds,
      timestamp: new Date(apiData.dt * 1000)
    });
  }

  interpolateWith(otherModel, factor) {
    return new WeatherModel({
      temperature: this.lerp(this.temperature, otherModel.temperature, factor),
      humidity: this.lerp(this.humidity, otherModel.humidity, factor),
      windSpeed: this.lerp(this.windSpeed, otherModel.windSpeed, factor),
      windDirection: this.lerpAngle(this.windDirection, otherModel.windDirection, factor),
      precipitation: this.lerp(this.precipitation, otherModel.precipitation, factor),
      pressure: this.lerp(this.pressure, otherModel.pressure, factor),
      visibility: this.lerp(this.visibility, otherModel.visibility, factor),
      cloudCover: this.lerp(this.cloudCover, otherModel.cloudCover, factor)
    });
  }

  lerp(start, end, factor) {
    return start + (end - start) * factor;
  }

  lerpAngle(start, end, factor) {
    const shortestAngle = ((((end - start) % 360) + 540) % 360) - 180;
    return (start + shortestAngle * factor) % 360;
  }

  toSimulationParameters() {
    return {
      particleCount: Math.floor(this.precipitation * 100),
      windForce: this.windSpeed / 10,
      windAngle: this.windDirection,
      visibility: this.visibility / 1000,
      cloudDensity: this.cloudCover / 100,
    };
  }
} 