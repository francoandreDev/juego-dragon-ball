import { PlanetDetail } from "../components/Planets/PlanetDetail.tsx";
import { SpaceBackground } from "../components/SpaceBackground/SpaceBackground.tsx";

export function PlanetsDetailPage() {
    return (
        <div className="wrapper">
            <SpaceBackground planets={25} />
            <PlanetDetail />
        </div>
    );
}