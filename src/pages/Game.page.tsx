import { Howl } from "howler";
import { Nav } from "../components/Nav/Nav.tsx";
import { SpaceBackground } from "../components/SpaceBackground/SpaceBackground.tsx";
import ThreeScene from "../components/ThreeScene/ThreeScene.tsx";
import { useEffect } from "react";

export function GamePage() {
    useEffect(() => {
        const sound = new Howl({
            src: ["/assets/audios/game-mix.mp3"],
            autoplay: true,
            loop: true,
            volume: 0.1,
        });

        return () => {
            sound.stop(); // Detener la música cuando se desmonte el componente
        };
    }, []);
    return (
        <div>
            <Nav />
            <SpaceBackground planets={0} />
            <ThreeScene />
        </div>
    );
}
