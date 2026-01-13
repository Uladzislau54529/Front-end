import { toFahrenheit, toKelvin } from '../temperature'


function ForecastCard({ day, unit }: { day: any; unit: string }) {
    const showTemp = (t: number) => {
        if (unit === 'F') return toFahrenheit(t)
        if (unit === 'K') return toKelvin(t)
        return t
    }

    const date = new Date(day.dt * 1000).toLocaleDateString()

    return (
        <div className="forecast-card">
            <h4>{date}</h4>
            <p>Temp: {showTemp(day.main.temp)}°{unit}</p>
            <p>Feels like: {showTemp(day.main.feels_like)}°{unit}</p>
            <p>Clouds: {day.clouds.all}%</p>
            <p>Humidity: {day.main.humidity}%</p>
            <p>Pressure: {day.main.pressure} hPa</p>
        </div>
    )
}

export default ForecastCard
