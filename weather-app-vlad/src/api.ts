const API_KEY = '74fa8bc1bcd11818148fedb3fc66dfc8'

/**
 * Get current weather by city name
 */
export async function getWeather(city: string) {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}&lang=en`
    )
    if (!response.ok) {
        throw new Error('Failed to fetch current weather')
    }
    return response.json()
}

/**
 * Get 5-day / 3-hour forecast by city name
 */
export async function getWeeklyForecast(city: string) {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}&lang=en`
    )
    if (!response.ok) {
        throw new Error('Failed to fetch forecast')
    }
    return response.json()
}
