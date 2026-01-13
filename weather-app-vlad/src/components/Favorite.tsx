import { useEffect, useState } from 'react'
import { getWeather, getWeeklyForecast } from '../api'
import { useTemperatureUnit } from '../context/TemperatureUnitContext'
import { toFahrenheit, toKelvin } from '../temperature'
import { useWeatherStore } from '../state/weatherStore'

function Favorite() {
    const { unit } = useTemperatureUnit()
    const { favorites, removeFromFavorites } = useWeatherStore()
    const [data, setData] = useState<any[]>([])

    const showTemp = (t: number) => {
        if (unit === 'F') return toFahrenheit(t)
        if (unit === 'K') return toKelvin(t)
        return t
    }

    useEffect(() => {
        const loadData = async () => {
            const results = []
            for (const city of favorites) {
                try {
                    const weather = await getWeather(city)
                    const forecast = await getWeeklyForecast(city)
                    results.push({
                        city,
                        weather,
                        forecast: forecast.list
                            .filter((_: any, i: number) => i % 8 === 0)
                            .slice(0, 5),
                    })
                } catch (err) {
                    console.error(`Error loading data for ${city}`, err)
                }
            }
            setData(results)
        }

        loadData()
    }, [favorites])

    return (
        <div className="favorite">
            <h2>Favorite Cities</h2>
            {data.length === 0 && <p>No favorites added yet.</p>}
            {data.map(({ city, weather, forecast }) => (
                <div key={city} className="favorite-block">
                    <div className="favorite-header">
                        <h3>{city}</h3>
                        <button onClick={() => removeFromFavorites(city)}>Remove</button>
                    </div>

                    <div className="favorite-current">
                        <p><strong>Temperature:</strong> {showTemp(weather.main.temp)} °{unit}</p>
                        <p><strong>Feels like:</strong> {showTemp(weather.main.feels_like)} °{unit}</p>
                        <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
                        <p><strong>Pressure:</strong> {weather.main.pressure} hPa</p>
                        <p><strong>Cloudiness:</strong> {weather.clouds.all}%</p>
                    </div>

                    <h4 style={{ marginTop: '1rem' }}>5-Day Forecast</h4>
                    <div className="forecast-cards">
                        {forecast.map((d: any, i: number) => (
                            <div key={i} className="forecast-card">
                                <img
                                    src={`https://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png`}
                                    alt={d.weather[0].description}
                                />
                                <p><strong>{new Date(d.dt * 1000).toLocaleDateString()}</strong></p>
                                <p>{showTemp(d.main.temp)} °{unit}</p>
                                <p>Feels: {showTemp(d.main.feels_like)} °{unit}</p>
                                <p>Humidity: {d.main.humidity}%</p>
                                <p>Clouds: {d.clouds.all}%</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Favorite
