import { Home } from "../components/Home/Home.tsx";
import { SpaceBackground } from "../components/SpaceBackground/SpaceBackground.tsx";

export function HomePage() {
    return (
        <div className="wrapper">
            <SpaceBackground planets={25} />
            <Home />
        </div>
    );
}
