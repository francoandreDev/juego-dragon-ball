import { IWorld } from "../../interfaces/exports.ts";
import { Link } from "react-router";

export function Planet({ world }: { world: IWorld }) {
    return (
        <Link to={`/planets/${world.id}`} className="planet-card">
            <h3 className="planet-name">{world.name}</h3>
            <img className="planet-image" src={world.image} alt={world.name} />
            <p className="planet-description">{world.description}</p>
        </Link>
    );
}
