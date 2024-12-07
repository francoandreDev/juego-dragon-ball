import "../../styles/characters.css";

import { Character } from "./Character.tsx";
import { IFighter } from "../../interfaces/exports.ts";
import { NotFound } from "../NotFounds/NotFound.tsx";

export function Characters({ data }: { data: IFighter[] | null }) {
    return (
        <section className="characters-container">
            <h2 className="characters-title">Dragon Ball Characters</h2>
            {data ? (
                <ul className="characters-list">
                    {data.map((fighter) => (
                        <li className="characters-list-item" key={fighter.id}>
                            <Character fighter={fighter} />
                        </li>
                    ))}
                </ul>
            ) : (
                <NotFound name="characters" />
            )}
        </section>
    );
}
