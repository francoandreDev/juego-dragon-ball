import * as THREE from "three";

import { Dispatch, SetStateAction, useState } from "react";

import { EnergyBall } from "./EnergyBall";
import { Meteor } from "./Meteor";
import { useFrame } from "@react-three/fiber";

interface MeteorData {
    position: THREE.Vector3;
    speed: number;
    id: string;
    direction: number;
}

interface EnergyBallData {
    id: string;
    start: THREE.Vector3;
    target: THREE.Vector3;
}

type GameSceneProp = {
    setScore: Dispatch<SetStateAction<number>>;
    energyBalls: EnergyBallData[];
    setEnergyBalls: Dispatch<SetStateAction<EnergyBallData[]>>;
    setIsGaming: Dispatch<SetStateAction<boolean>>;
    saveHistory: () => void;
};

const greyBrownTones = [
    "#7D7461", // Marrón grisáceo claro
    "#A89F91", // Gris cálido
    "#5C5542", // Marrón oscuro con toque gris
    "#8C8275", // Gris neutro cálido
    "#736A60", // Gris con matiz marrón
    "#9E8F80", // Beige grisáceo
    "#4F4A3F", // Gris oscuro con marrón
    "#6E665B", // Marrón medio apagado
    "#B3A89E", // Gris claro cálido
    "#857970", // Marrón apagado claro
    "#60594F", // Gris marrón intermedio
    "#988E81", // Gris marrón claro
    "#7A7166", // Marrón con tinte gris
    "#CCC2B8", // Beige claro con matiz gris
    "#564D42", // Marrón oscuro cálido
];

function GameScene({
    setScore,
    energyBalls,
    setEnergyBalls,
    setIsGaming,
    saveHistory,
}: GameSceneProp) {
    const speedBall = 0.2;
    const [meteors, setMeteors] = useState<MeteorData[]>(() =>
        Array.from({ length: 5 }, (_, i) => ({
            id: `meteor-${i}`,
            position: new THREE.Vector3(
                Math.random() * 10 - 5,
                Math.random() * 5 + 2,
                0
            ),
            speed: Math.random() * 0.02 + 0.01, // modificar la velocidad
            direction: Math.random() < 0.5 ? 1 : -1, // Derecha o izquierda
        }))
    );

    const handleMeteorHit = (meteorId: string, energyBallId: string) => {
        handleMeteorRespawn(meteorId);
        setScore((prev) => prev + 10);
        setEnergyBalls((prev) =>
            prev.filter((ball) => ball.id !== energyBallId)
        );
    };

    const handleEnergyBallEnd = (id: string) => {
        setEnergyBalls((prev) => prev.filter((ball) => ball.id !== id));
    };

    const handleMeteorRespawn = (meteorId: string) => {
        setMeteors((prev) =>
            prev.map((meteor) =>
                meteor.id === meteorId
                    ? {
                          ...meteor,
                          position: new THREE.Vector3(
                              Math.random() * 10 - 5, // Reposicionar X aleatoriamente
                              5, // Colocar en la parte superior
                              0
                          ),
                      }
                    : meteor
            )
        );
    };

    useFrame(() => {
        // Actualizar la posición de los meteoros
        setMeteors((prev) =>
            prev.map((meteor) => {
                const newPosition = meteor.position.clone();

                // Movimiento descendente
                newPosition.y -= meteor.speed + Math.random() / 50;

                // Movimiento curvo en el eje X
                const curveFactor = Math.sin(newPosition.y * 0.5) * 0.5; // Ajusta el multiplicador para controlar la amplitud
                newPosition.x += (meteor.direction * curveFactor) / 20; // `direction` será 1 o -1

                // Reiniciar meteoro si sale de la pantalla
                if (
                    newPosition.y < -5 ||
                    newPosition.x < -8 ||
                    newPosition.x > 8
                ) {
                    handleMeteorRespawn(meteor.id);
                }

                return { ...meteor, position: newPosition };
            })
        );

        // Verificar colisiones entre bolas de energía y meteoros
        energyBalls.forEach((ball) => {
            const direction = new THREE.Vector3()
                .subVectors(ball.target, ball.start)
                .normalize();
            ball.start.add(direction.multiplyScalar(speedBall));

            meteors.forEach((meteor) => {
                const distance = meteor.position.distanceTo(ball.start);
                if (distance < 0.5) {
                    handleMeteorHit(meteor.id, ball.id);
                }
            });

            // Chequear si la bola llegó a su destino
            if (ball.start.distanceTo(ball.target) < 0.1) {
                handleEnergyBallEnd(ball.id);
            }
        });
    });

    function getMeteorColor(n: number): string {
        return greyBrownTones[n % greyBrownTones.length];
    }

    function gameOver() {
        saveHistory();
        setIsGaming(false);
    }

    return (
        <>
            {/* Dibujar meteoros */}
            {meteors.map((meteor, index) => (
                <Meteor
                    key={meteor.id}
                    color={getMeteorColor(index)}
                    position={meteor.position}
                    speed={meteor.speed}
                    onHit={gameOver}
                />
            ))}

            {/* Dibujar bolas de energía */}
            {energyBalls.map((ball) => (
                <EnergyBall
                    key={ball.id}
                    start={ball.start.clone()}
                    target={ball.target.clone()}
                    onHit={(position) => {
                        return position;
                    }}
                    onEnd={() => handleEnergyBallEnd(ball.id)}
                />
            ))}
        </>
    );
}

export default GameScene;
