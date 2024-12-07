import "../../styles/itemDetail.css";

import { IFighter, IWorld } from "../../interfaces/exports.ts";
import { useEffect, useState } from "react";

import { Error as E } from "../../components/Errors/Error.tsx";
import { Loading } from "../../components/Loadings/Loading.tsx";
import { URL_ENDPOINTS_DBS } from "../../constants/dbs.ts";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

export function CharacterDetail() {
    const { id } = useParams<{ id: string }>();
    const [character, setCharacter] = useState<IFighter | null>(null);
    const [planet, setPlanet] = useState<IWorld | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate(); // Hook para navegar programáticamente

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(
                    `${URL_ENDPOINTS_DBS.characters}/${id}`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch character details");
                }
                const data: IFighter = await response.json();
                setCharacter(data);
                fetchPlanet()
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error");
            } finally {
                setIsLoading(false);
            }
        };

        const fetchPlanet = async () => {
            try {
                setIsLoading(true);
                const planetId = character?.originPlanet.id || 1
                const response = await fetch(`${URL_ENDPOINTS_DBS.planets}/${planetId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch planet details");
                }
                const data: IWorld = await response.json();
                setPlanet(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error");
            } finally {
                setIsLoading(false);
            }
        };

        fetchCharacter();
    }, [id, character?.originPlanet.id]);

    if (isLoading) return <Loading name="Character Details" />;
    if (error) return <E error={{ message: error }} />;
    if (!character) return <p>Character not found.</p>;

    function startGame(character: IFighter, planet: IWorld) {
        // quiero pasar el character de forma global
        navigate("/game/player/" + character.id, {
            state: { character, planet },
        });
    }

    return (
        <div className="character item-detail-container">
            <div className="character item-detail-content">
                <button
                    className="close-btn"
                    onClick={() => navigate("/characters")}
                >
                    &#x2715; {/* Icono de "X" */}
                </button>
                <img
                    className={`character item-image`}
                    src={character.image}
                    alt={character.name}
                />
                <div className="character item-info">
                    <h1 className="character item-name">
                        {character.name} [{character.affiliation}]
                    </h1>
                    <h2>
                        <strong>Race:</strong> {character.race}
                    </h2>
                    <h3>
                        <strong>Power Level:</strong> {character.ki} /{" "}
                        {character.maxKi}
                    </h3>
                    <p>
                        <strong>Description:</strong> {character.description}
                    </p>
                    <button
                        className="button"
                        onClick={() => startGame(character, planet as IWorld)}
                    >
                        Start game with {character.name}
                    </button>
                </div>
            </div>
        </div>
    );
}
