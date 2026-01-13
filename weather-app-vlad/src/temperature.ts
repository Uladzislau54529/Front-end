export const toFahrenheit = (celsius: number): number =>
    Math.round((celsius * 9) / 5 + 32)

export const toKelvin = (celsius: number): number =>
    Math.round(celsius + 273.15)
