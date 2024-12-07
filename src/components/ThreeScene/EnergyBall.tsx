import * as THREE from "three";

import { useEffect, useRef } from "react";

import gsap from "gsap";

type EnergyBallProps = {
    start: THREE.Vector3; // Posición inicial de la bola de energía
    target: THREE.Vector3; // Destino de la bola de energía
    onHit: (position: THREE.Vector3) => void; // Callback al impactar un meteorito
    onEnd: () => void; // Callback para notificar que la bola desapareció
};

export const EnergyBall: React.FC<EnergyBallProps> = ({ start, target, onHit, onEnd }) => {
    const meshRef = useRef<THREE.Mesh>(null);

    useEffect(() => {
        const mesh = meshRef.current;
        if (!mesh || !mesh.position) return;

        // Usar GSAP para animar la posición desde "start" hacia "target"
        gsap.to(mesh.position, {
            x: target.x,
            y: target.y,
            z: target.z,
            duration: 0.5, // Duración de la animación en segundos
            ease: "power2.out",
            onUpdate: () => {
                // Verificar colisiones mientras la bola se mueve
                const position = mesh.position;
                onHit(new THREE.Vector3(position.x, position.y, position.z));
            },
            onComplete: () => {
                onEnd(); 
            },
        });

        return () => {
            gsap.killTweensOf(mesh?.position); // Limpiar la animación si el componente se desmonta
        };
    }, [start, target, onHit, onEnd]);

    return (
        <mesh ref={meshRef} position={start}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color="yellow" emissive="yellow" emissiveIntensity={0.8} />
        </mesh>
    );
};
