import "../../styles/game.css";

import * as THREE from "three";

import { KeyboardEvent, useEffect, useRef, useState } from "react";

import { Canvas } from "@react-three/fiber";
import { CharacterPlane } from "./CharacterPlane";
import GameScene from "./GameScene";
import { Howl } from "howler";
import { IFighter } from "../../interfaces/IFighter";
import { ITransformation } from "../../interfaces/exports.ts";
import { Sphere } from "./Sphere";
import { useGlobalState } from "../../hooks/useGlobalState.tsx";
import { useLocation } from "react-router";

interface EnergyBallData {
    id: string;
    start: THREE.Vector3;
    target: THREE.Vector3;
}

const ThreeScene = () => {
    const location = useLocation();
    const { character, planet } = location.state || {};
    const [score, setScore] = useState<number>(0);
    const [energyBalls, setEnergyBalls] = useState<EnergyBallData[]>([]);
    const containerRef = useRef<HTMLDivElement>(null); // Ref para el contenedor
    const [currentTransformation, setCurrentTransformation] =
        useState<number>(-1);
    const [transformation, setTransformation] =
        useState<ITransformation | null>(null);
    const [isGaming, setIsGaming] = useState<boolean>(true);
    const { history, setHistory } = useGlobalState();

    useEffect(() => {
        // Forzar el foco al contenedor al montar el componente
        containerRef.current?.focus();
    }, []);

    if (!character || !planet) return <p>No character selected</p>;

    const handleCanvasClick = (event: React.PointerEvent<HTMLDivElement>) => {
        const { clientX, clientY } = event;
        const { innerWidth, innerHeight } = window;

        const start = new THREE.Vector3(0, 0, 0); // Posición inicial
        const distanceX = 25;
        const target = new THREE.Vector3(
            (clientX / innerWidth) * distanceX - distanceX / 2,
            -((clientY + window.scrollY) / innerHeight) * 15 + 12.5,
            0 // Coordenada Z fija
        );

        // Crear una nueva bola de energía
        setEnergyBalls((prev) => [
            ...prev,
            { id: crypto.randomUUID(), start, target },
        ]);
    };

    function handleCanvasKeyDown(event: KeyboardEvent<HTMLDivElement>): void {
        const fighter: IFighter = character as IFighter;
        const tecla = event.key.toLocaleLowerCase();
        console.log(fighter);
        if (tecla === "t") {
            if (
                fighter.transformations.length > 0 &&
                fighter.transformations[currentTransformation + 1]
            ) {
                new Howl({
                    src: ["/assets/audios/transformation.mp3"],
                    autoplay: true,
                    loop: false,
                    volume: 0.3,
                });
                setTransformation(
                    fighter.transformations[currentTransformation + 1]
                );
                setCurrentTransformation((prev) => prev + 1);
            } else if (!fighter.transformations[currentTransformation + 1]) {
                setCurrentTransformation(-1);
                setTransformation(null);
            } else {
                alert("no puedes transformarte");
            }
        }
    }

    function saveHistory() {
        const name: string =
            transformation !== null ? transformation.name : character.name;
        const value: number = score;

        setHistory((prev: Record<string, number>): Record<string, number> => {
            if (name in prev) {
                if (prev[name] < value) {
                    return { ...prev, [name]: value };
                } else {
                    return { ...prev };
                }
            } else {
                return { ...prev, [name]: value };
            }
        });
    }

    function handlePlayAgain(): void {
        setScore(0)
        setIsGaming(true);
    }

    return (
        <div className="game">
            <h1 className="title">
                Playing as{" "}
                {transformation === null ? character.name : transformation.name}{" "}
                on planet {planet.name}
            </h1>
            <div className="score">
                <span>Score: {score}</span>
            </div>
            {isGaming ? (
                <Canvas
                    style={{ width: "100%", height: "100vh" }}
                    onClick={handleCanvasClick}
                    onKeyDown={handleCanvasKeyDown}
                    tabIndex={0}
                >
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[5, 5, 5]} intensity={1} />
                    <CharacterPlane
                        character={
                            transformation === null ? character : transformation
                        }
                    />
                    <Sphere />
                    <GameScene
                        setIsGaming={setIsGaming}
                        saveHistory={saveHistory}
                        setScore={setScore}
                        energyBalls={energyBalls}
                        setEnergyBalls={setEnergyBalls}
                    />
                </Canvas>
            ) : (
                <>
                    <article>
                        <h2 className="subtitle">HISTORY</h2>
                        <ol>
                            {Object.entries(history).map(
                                ([nameHistory, valueHistory]) => {
                                    return (
                                        <li key={nameHistory}>
                                            {nameHistory}: {valueHistory}
                                        </li>
                                    );
                                }
                            )}
                        </ol>
                    </article>

                    <button onClick={() => handlePlayAgain()}>
                        Play Again
                    </button>
                </>
            )}
        </div>
    );
};

export default ThreeScene;
