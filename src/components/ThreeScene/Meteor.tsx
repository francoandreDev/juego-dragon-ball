import * as THREE from "three";

import { useFrame, useLoader } from "@react-three/fiber";

import { useRef } from "react";

type MeteorProps = {
    color: string;
    position: THREE.Vector3;
    speed: number;
    onHit?: () => void;
};


export const Meteor: React.FC<MeteorProps> = ({ color, position, speed, onHit }) => {
    const displacementMap = useLoader(THREE.TextureLoader, "/assets/textures/noise.jpg");

    const ref = useRef<THREE.Mesh>(null);

    // Mover el meteorito hacia el planeta en cada frame
    useFrame(() => {
        if (ref.current) {
            // Desplazar el meteorito hacia el centro (0,0,0)
            const direction = new THREE.Vector3(0, 0, 0)
                .sub(ref.current.position)
                .normalize();
            ref.current.position.add(direction.multiplyScalar(speed));

            // Si el meteorito llega al planeta, dispara el evento onHit
            if (ref.current.position.y < -0.4 && ref.current.position.x > -1 && ref.current.position.x < 1) {
                onHit?.();
            }
        }
    });

    return (
        <mesh ref={ref} position={position}>
            <sphereGeometry args={[0.3, 64, 64]} />
            <meshStandardMaterial
                color={color}
                roughness={0.9}
                metalness={0.1}
                displacementMap={displacementMap}
                displacementScale={0.05} // Ajustar intensidad de la deformación
            />
        </mesh>
    );
};
