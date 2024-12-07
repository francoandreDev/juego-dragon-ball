import { IFighter } from "../../interfaces/exports.ts";
import { Link } from "react-router";

export function Character({ fighter }: { fighter: IFighter }) {
    return (
        <Link to={`/characters/${fighter.id}`} className="character-card">
            <h3 className="character-name">{fighter.name}</h3>
            <img
                className="character-image"
                src={fighter.image}
                alt={fighter.name}
            />
            <p className="character-description">{fighter.description}</p>
        </Link>
    );
}
