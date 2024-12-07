import { useCallback, useEffect, useRef, useState } from "react";

import { FetchError } from "../Errors/FetchError.ts";
import { IFetchState } from "../interfaces/IFetchState.ts";

function useFetchPaginated<T>(url: string): IFetchState<T[]> & {
    loadNextPage: () => void;
    hasMore: boolean;
} {
    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState<FetchError | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const currentPageRef = useRef<number>(1);
    const isFetchingRef = useRef<boolean>(false); // Bloqueo para evitar duplicados

    const fetchPage = useCallback(async () => {
        // Evitar duplicados
        if (isFetchingRef.current || !hasMore || isLoading) {
            return;
        }

        isFetchingRef.current = true; // Activar bloqueo
        setIsLoading(true);
        setError(null);

        const pageToFetch = currentPageRef.current;

        try {
            const response = await fetch(`${url}?page=${pageToFetch}&limit=10`);

            if (!response.ok) {
                throw new FetchError("Failed to fetch data", response.status);
            }

            const result: {
                items: T[];
                meta: { currentPage: number; totalPages: number };
            } = await response.json();

            setData((prev) => [...prev, ...result.items]); // Acumular datos
            setHasMore(result.meta.currentPage < result.meta.totalPages);

            if (result.meta.currentPage < result.meta.totalPages) {
                currentPageRef.current += 1; // Incrementar la página
            }
        } catch (error) {
            if (error instanceof FetchError) setError(error);
            else if (error instanceof Error)
                setError(new FetchError(error.message));
            else setError(new FetchError("An unknown error occurred"));
        } finally {
            isFetchingRef.current = false; // Liberar bloqueo
            setIsLoading(false);
        }
    }, [url, hasMore, isLoading]);

    useEffect(() => {
        fetchPage(); // Cargar la primera página al montar
    }, [fetchPage]);

    const loadNextPage = useCallback(() => {
        fetchPage();
    }, [fetchPage]);

    return { data, isLoading, error, loadNextPage, hasMore };
}

export default useFetchPaginated;
