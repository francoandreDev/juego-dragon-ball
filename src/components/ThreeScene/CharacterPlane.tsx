import * as THREE from "three"

import { IFighter } from "../../interfaces/IFighter";
import { ITransformation } from "../../interfaces/ITransformation";
import { useLoader } from "@react-three/fiber";

export function CharacterPlane({character}: {character: IFighter | ITransformation}) {
    const texture = useLoader(THREE.TextureLoader, character?.image);

    if (!character) return <p>No character selected</p>;

    return (
        <mesh position={[0, -0.5, 0]}>
            <planeGeometry args={[2, 3]} />
            <meshBasicMaterial
                map={texture as THREE.Texture}
                transparent={true}
            />
        </mesh>
    );
}