import * as THREE from "three"

import { ThreeEvent, useLoader } from "@react-three/fiber";
import { useRef, useState } from "react";

import { useLocation } from "react-router";

export function Sphere() {
    const location = useLocation();
    const { planet } = location.state || {};
    const colorMap = useLoader(THREE.TextureLoader, planet?.image);
    const meshRef = useRef<THREE.Mesh>(null);

    const [isDragging, setIsDragging] = useState(false);
    const [lastMousePosition, setLastMousePosition] = useState<{
        x: number;
        y: number;
    } | null>(null);

    if (!planet) return <p>No planet Selected</p>;

    const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
        setIsDragging(true);
        setLastMousePosition({ x: event.clientX, y: event.clientY });
    };

    const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
        if (!isDragging || !meshRef.current || !lastMousePosition) return;

        const deltaX = event.clientX - lastMousePosition.x;
        const deltaY = event.clientY - lastMousePosition.y;

        meshRef.current.rotation.y += deltaX * 0.01;
        meshRef.current.rotation.x += deltaY * 0.01;

        setLastMousePosition({ x: event.clientX, y: event.clientY });
    };

    const handlePointerUp = () => {
        setIsDragging(false);
        setLastMousePosition(null);
    };

    return (
        <mesh
            ref={meshRef}
            rotation={[0, 0, 0]}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerOut={handlePointerUp}
            position={[0, -4, 0]} // Posición ajustada para colocar la esfera debajo del plano
        >
            <sphereGeometry args={[2, 64, 64]} />
            <meshStandardMaterial map={colorMap as THREE.Texture} />
        </mesh>
    );
}