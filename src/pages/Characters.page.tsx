import { Characters } from "../components/Characters/Characters.tsx";
import { Error } from "../components/Errors/Error.tsx";
import { IFighter } from "../interfaces/exports.ts";
import { Loading } from "../components/Loadings/Loading.tsx";
import { Nav } from "../components/Nav/Nav.tsx";
import { SpaceBackground } from "../components/SpaceBackground/SpaceBackground.tsx";
import { URL_ENDPOINTS_DBS } from "../constants/dbs.ts";
import { useEffect } from "react";
import useFetchPaginated from "../hooks/useFetchPaginated.tsx";

export function CharactersPage() {
    const {
        data: characters,
        isLoading,
        error,
        loadNextPage,
        hasMore,
    } = useFetchPaginated<IFighter>(URL_ENDPOINTS_DBS.characters);

    // Detectar el scroll al final de la página
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >=
                    document.body.offsetHeight - 50 &&
                hasMore
            ) {
                loadNextPage();
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loadNextPage, hasMore]);

    if (error) return <Error error={error} />;

    return (
        <div className="wrapper">
            <Nav />
            <SpaceBackground planets={25}/>
            <Characters data={characters} />
            {isLoading && <Loading name="Characters" />}
            {!hasMore && (
                <p className="end-message">No more characters to load.</p>
            )}
        </div>
    );
}
