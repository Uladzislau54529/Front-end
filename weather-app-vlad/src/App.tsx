import { Routes, Route, Link } from 'react-router-dom'
import Weather from './components/Weather'
import Favorite from './components/Favorite'
import { useTemperatureUnit } from './context/TemperatureUnitContext'
// import "./styles/index.css"
import './styles/components.css'


function App() {
    const { unit, toggleUnit } = useTemperatureUnit()

    return (
        <div className="container">
            <h1>☁️ Weather App</h1>

            <button onClick={toggleUnit} style={{ marginBottom: '1rem' }}>
                Switch to {unit === 'C' ? '°F' : unit === 'F' ? 'K' : '°C'}
            </button>

            <nav>
                <Link to="/">Weather</Link>
                <Link to="/favorite">Favorites</Link>
            </nav>

            <Routes>
                <Route path="/" element={<Weather />} />
                <Route path="/favorite" element={<Favorite />} />
            </Routes>
            <div className="snow">
                {Array.from({ length: 50 }).map((_, i) => (
                    <div
                        key={i}
                        className="snowflake"
                        style={{
                            left: `${Math.random() * 100}vw`,
                            animationDuration: `${5 + Math.random() * 5}s`,
                            fontSize: `${Math.random() * 10 + 10}px`,
                            animationDelay: `${Math.random() * 5}s`,
                        }}
                    >
                        ❄
                    </div>
                ))}
            </div>

        </div>
    )
}

export default App

