import "../../styles/planets.css";

import { IWorld } from "../../interfaces/exports.ts";
import { NotFound } from "../NotFounds/NotFound.tsx";
import { Planet } from "./Planet.tsx";

export function Planets({ data }: { data: IWorld[] | null }) {
    return (
        <section className="planets-container">
            <h2 className="planets-title">Dragon Ball Planets</h2>
            {data ? (
                <ul className="planets-list">
                    {data.map((world) => (
                        <li className="planets-list-item" key={world.id}>
                            <Planet world={world} />
                        </li>
                    ))}
                </ul>
            ) : (
                <NotFound name="planets" />
            )}
        </section>
    );
}
