import "../../styles/itemDetail.css";

import { useEffect, useState } from "react";

import { Error as E } from "../../components/Errors/Error.tsx";
import { IWorld } from "../../interfaces/exports.ts";
import { Loading } from "../../components/Loadings/Loading.tsx";
import { URL_ENDPOINTS_DBS } from "../../constants/dbs.ts";
import { useNavigate } from "react-router"; // Importa useNavigate
import { useParams } from "react-router";

export function PlanetDetail() {
    const { id } = useParams<{ id: string }>();
    const [planet, setPlanet] = useState<IWorld | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate(); // Hook para navegar programáticamente

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(
                    `${URL_ENDPOINTS_DBS.planets}/${id}`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch world details");
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
    }, [id]);

    if (isLoading) return <Loading name="Character Details" />;
    if (error) return <E error={{ message: error }} />;
    if (!planet) return <p>Character not found.</p>;

    return (
        <div className="world item-detail-container">
            <div className="item-detail-content">
                <button
                    className="close-btn world"
                    onClick={() => navigate("/planets")}
                >
                    &#x2715; {/* Icono de "X" */}
                </button>
                <img
                    className="item-image"
                    src={planet.image}
                    alt={planet.name}
                />
                <div className="item-info">
                    <h1 className="item-name">
                        {planet.name}
                    </h1>
                    <p>
                        <strong>Description:</strong> {planet.description}
                    </p>
                </div>
            </div>
        </div>
    );
}
