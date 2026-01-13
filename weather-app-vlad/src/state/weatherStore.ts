import { create } from 'zustand'

export type WeatherState = {
    favorites: string[]
    currentCity: string
    unit: 'C' | 'F' | 'K'
    setCurrentCity: (city: string) => void
    addToFavorites: (city: string) => void
    removeFromFavorites: (city: string) => void
    toggleUnit: () => void
}

export const useWeatherStore = create<WeatherState>((set) => ({
    favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
    currentCity: localStorage.getItem('currentCity') || '',
    unit: 'C',

    setCurrentCity: (city) => {
        localStorage.setItem('currentCity', city)
        set({ currentCity: city })
    },

    addToFavorites: (city) => {
        set((state) => {
            const updated = state.favorites.includes(city)
                ? state.favorites
                : [...state.favorites, city]
            localStorage.setItem('favorites', JSON.stringify(updated))
            return { favorites: updated }
        })
    },

    removeFromFavorites: (city) => {
        set((state) => {
            const updated = state.favorites.filter((c) => c !== city)
            localStorage.setItem('favorites', JSON.stringify(updated))
            return { favorites: updated }
        })
    },

    toggleUnit: () => {
        set((state) => {
            const newUnit = state.unit === 'C' ? 'F' : state.unit === 'F' ? 'K' : 'C'
            return { unit: newUnit }
        })
    }
}))
