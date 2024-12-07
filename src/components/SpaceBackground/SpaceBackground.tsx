import "../../styles/spaceBackground.css";

import { useEffect, useRef } from "react";

// Configuración general
const NUM_STARS = 100; // Número de estrellas
const NUM_PLANETS = 25; // Número de planetas
const ORBIT_A_RANGE = { min: 200, max: 350 }; // Semi-eje mayor (eje X)
const ORBIT_B_RANGE = { min: 100, max: 200 }; // Semi-eje menor (eje Y)
const ORBIT_SPEED_RANGE = { min: 0.005, max: 0.02 }; // Velocidades de órbita
const Z_DEPTH = 40; // Profundidad en el eje Z
let scaleVariation = 0// Variación de tamaño

export function SpaceBackground({planets = NUM_PLANETS}: {planets: number}) {
    const planetsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const animatePlanets = () => {
            planetsRef.current.forEach((planet) => {
                scaleVariation = 10 * Math.random()
                if (planet) {
                    // Generar semi-ejes aleatorios dentro del rango definido
                    const a = ORBIT_A_RANGE.min + Math.random() * (ORBIT_A_RANGE.max - ORBIT_A_RANGE.min);
                    const b = ORBIT_B_RANGE.min + Math.random() * (ORBIT_B_RANGE.max - ORBIT_B_RANGE.min);
                    const orbitSpeed = ORBIT_SPEED_RANGE.min + Math.random() * (ORBIT_SPEED_RANGE.max - ORBIT_SPEED_RANGE.min);

                    let t = 0; // Ángulo inicial

                    const planetAnim = () => {
                        t += orbitSpeed;
                        if (t > 2 * Math.PI) t = 0; // Resetear el ciclo de la órbita

                        // Calcular posiciones elípticas para la órbita
                        const x = a * Math.cos(t);
                        const y = b * Math.sin(t);
                        const z = Math.sin(t) * Z_DEPTH; // Profundidad

                        // Calcular escala proporcional a la posición Z
                        const scaleFactor = 1 + (z / 100) * scaleVariation;

                        // Aplicar transformaciones
                        planet.style.transform = `translate3d(${x}px, ${y}px, ${z}px) scale(${scaleFactor})`;

                        requestAnimationFrame(planetAnim);
                    };
                    planetAnim();
                }
            });
        };

        animatePlanets();
    }, []);

    return (
        <div className="space-container">
            {/* Estrellas */}
            <div className="stars">
                {Array.from({ length: NUM_STARS }).map((_, i) => (
                    <div
                        key={i}
                        className="star"
                        style={getRandomStarStyles()}
                    ></div>
                ))}
            </div>

            {/* Planetas */}
            {Array.from({ length: planets }).map((_, i) => (
                <div
                    ref={(el) => (planetsRef.current[i] = el)}
                    key={i}
                    className="planet"
                    style={getRandomPlanetStyles()}
                ></div>
            ))}
        </div>
    );
}

// Estilos aleatorios para estrellas
function getRandomStarStyles() {
    return {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDuration: `${3 + Math.random() * 5}s`, // Variación de duración del parpadeo
        animationDelay: `${Math.random() * 2}s`,
    };
}

// Estilos aleatorios para planetas
function getRandomPlanetStyles() {
    const size = Math.random() * 15; // Tamaño inicial aleatorio

    // Posición inicial aleatoria dentro y fuera de la pantalla
    const xPosition = Math.random() * 200 - 225 * Math.random();
    const yPosition = Math.random() * 200 - 35 * Math.random();

    return {
        width: `${size}px`,
        height: `${size}px`,
        left: `${50 + xPosition}%`,
        top: `${50 + yPosition}%`,
        boxShadow: `0 0 ${size}px`
    };
}
