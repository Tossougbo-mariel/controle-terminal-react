import { useState } from 'react'
import './App.css'

interface WeatherInfo {
  temp: number
  humidity: number
  condition: 'sunny' | 'cloudy' | 'rainy' | 'snowy'
}

const weatherData: Record<string, WeatherInfo> = {
  Cotonou: { temp: 31, humidity: 78, condition: 'sunny' },
  Paris: { temp: 14, humidity: 62, condition: 'cloudy' },
  Tokyo: { temp: 22, humidity: 55, condition: 'rainy' },
  Montreal: { temp: -3, humidity: 80, condition: 'snowy' },
}

const cities = Object.keys(weatherData)

const conditionIcons: Record<WeatherInfo['condition'], string> = {
  sunny: 'bi-sun-fill',
  cloudy: 'bi-cloud-fill',
  rainy: 'bi-cloud-rain-fill',
  snowy: 'bi-snow',
}

const conditionLabels: Record<WeatherInfo['condition'], string> = {
  sunny: 'Ensoleillé',
  cloudy: 'Nuageux',
  rainy: 'Pluvieux',
  snowy: 'Neigeux',
}

function App() {
  const [selectedCity, setSelectedCity] = useState(cities[0])
  const [isLoading, setIsLoading] = useState(false)

  const currentWeather = weatherData[selectedCity]
  const iconClass = conditionIcons[currentWeather.condition]

  const handleRefresh = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
  }

  return (
    <div className="weather-dashboard">
      <div className="dashboard-container">
        <h1 className="title">
          <i className="bi bi-globe2" aria-hidden="true" />
          Dashboard Météo
        </h1>

        <div className="controls">
          <label htmlFor="city-select" className="label">
            Sélectionnez une ville :
          </label>
          <select
            id="city-select"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="city-select"
            disabled={isLoading}
          >
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {isLoading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Chargement des données...</p>
          </div>
        ) : (
          <div className="weather-card">
            <div className="weather-icon">
              <i className={`bi ${iconClass}`} aria-hidden="true" />
            </div>
            <div className="weather-info">
              <h2 className="city-name">{selectedCity}</h2>
              <div className="weather-details">
                <div className="detail-item">
                  <span className="detail-label">
                    <i className="bi bi-thermometer-half" aria-hidden="true" />
                    Température
                  </span>
                  <span className="value">{currentWeather.temp} °C</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">
                    <i className="bi bi-droplet-fill" aria-hidden="true" />
                    Humidité
                  </span>
                  <span className="value">{currentWeather.humidity} %</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">
                    <i className={`bi ${iconClass}`} aria-hidden="true" />
                    Condition
                  </span>
                  <span className="value">
                    {conditionLabels[currentWeather.condition]}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <button
          type="button"
          className="refresh-button"
          onClick={handleRefresh}
          disabled={isLoading}
        >
          <i
            className={`bi ${isLoading ? 'bi-arrow-repeat spin-icon' : 'bi-arrow-clockwise'}`}
            aria-hidden="true"
          />
          {isLoading ? 'Chargement...' : 'Actualiser'}
        </button>
      </div>
    </div>
  )
}

export default App
