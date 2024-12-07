import "../../styles/home.css"; // Archivo CSS para estilos específicos del Home

import { Link } from "react-router";

export function Home() {
    return (
        <main className="home-container">
            <h1 className="home-title">Welcome to StarExplorer!</h1>
            <p className="home-description">
                Discover fascinating characters and explore mysterious planets
                from our universe.
            </p>
            <div className="home-links">
                <Link to="/characters" className="home-link">
                    Discover Characters
                </Link>
                <Link to="/planets" className="home-link">
                    Explore Planets
                </Link>
            </div>
        </main>
    );
}
