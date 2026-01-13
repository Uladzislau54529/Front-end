import { createContext, useContext, useState, type ReactNode } from 'react'

export type Unit = 'C' | 'F' | 'K'

interface TemperatureContextProps {
    unit: Unit
    toggleUnit: () => void
}

const TemperatureContext = createContext<TemperatureContextProps | undefined>(undefined)

export const TemperatureUnitProvider = ({ children }: { children: ReactNode }) => {
    const [unit, setUnit] = useState<Unit>('C')

    const toggleUnit = () => {
        setUnit((prev) => (prev === 'C' ? 'F' : prev === 'F' ? 'K' : 'C'))
    }

    return (
        <TemperatureContext.Provider value={{ unit, toggleUnit }}>
            {children}
        </TemperatureContext.Provider>
    )
}

export const useTemperatureUnit = (): TemperatureContextProps => {
    const context = useContext(TemperatureContext)
    if (!context) {
        throw new Error('useTemperatureUnit must be used inside TemperatureUnitProvider')
    }
    return context
}
