import { useEffect, useState } from 'react'
import { getWeather, getWeeklyForecast } from '../api'
import { useTemperatureUnit } from '../context/TemperatureUnitContext'
import { toFahrenheit, toKelvin } from '../temperature'
import { useWeatherStore } from '../state/weatherStore'


function Weather() {
    const [city, setCity] = useState('')
    const [weather, setWeather] = useState<any>(null)
    const [forecast, setForecast] = useState<any[]>([])
    const { unit } = useTemperatureUnit()
    const {
        favorites,
        addToFavorites,
        removeFromFavorites,
    } = useWeatherStore()

    const isFavorite = favorites.includes(city)

    const showTemp = (t: number) => {
        if (unit === 'F') return toFahrenheit(t)
        if (unit === 'K') return toKelvin(t)
        return t
    }

    useEffect(() => {
        const lastCity = localStorage.getItem('lastCity')
        if (lastCity) {
            setCity(lastCity)
        }
    }, [])

    useEffect(() => {
        if (!city) return
        localStorage.setItem('lastCity', city)

        getWeather(city)
            .then(setWeather)
            .catch(() => setWeather(null))

        getWeeklyForecast(city)
            .then(data => {
                const days = data.list.filter((_: any, i: number) => i % 8 === 0).slice(0, 5)
                setForecast(days)
            })
            .catch(() => setForecast([]))
    }, [city])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        const input = (e.target as HTMLFormElement).elements.namedItem('city') as HTMLInputElement
        setCity(input.value)
    }

    return (
        <div className="weather-container">
            <h2>Weather Search</h2>

            <form onSubmit={handleSearch} className="weather-search">
                <input name="city" placeholder="Enter city" defaultValue={city} />
                <button type="submit">Search</button>
            </form>

            {weather && (
                <>
                    <div className="weather-current">
                        <h3>{weather.name}</h3>
                        <p><strong>Temperature:</strong> {showTemp(weather.main.temp)} °{unit}</p>
                        <p><strong>Feels like:</strong> {showTemp(weather.main.feels_like)} °{unit}</p>
                        <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
                        <p><strong>Pressure:</strong> {weather.main.pressure} hPa</p>
                        <p><strong>Cloudiness:</strong> {weather.clouds.all}%</p>

                        <button onClick={() =>
                            isFavorite
                                ? removeFromFavorites(city)
                                : addToFavorites(city)
                        }>
                            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                        </button>
                    </div>

                    <h3 className="weather-forecast-title">5-Day Forecast</h3>
                    <div className="weather-forecast">
                        {forecast.map((day, i) => (
                            <div key={i} className="weather-forecast-card">
                                <h4>{new Date(day.dt * 1000).toLocaleDateString()}</h4>
                                <img
                                    src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                                    alt={day.weather[0].description}
                                />
                                <p>{day.weather[0].main}</p>
                                <p>Temp: {showTemp(day.main.temp)} °{unit}</p>
                                <p>Feels like: {showTemp(day.main.feels_like)} °{unit}</p>
                                <p>Humidity: {day.main.humidity}%</p>
                                <p>Clouds: {day.clouds.all}%</p>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default Weather
