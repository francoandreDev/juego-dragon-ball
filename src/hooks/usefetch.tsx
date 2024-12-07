import { useEffect, useState } from "react";

import { FetchError } from "../Errors/FetchError.ts";
import { IFetchState } from "../interfaces/IFetchState.ts";

function useFetch<T>(url: string): IFetchState<T> {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<FetchError | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new FetchError(
                        "Failed to fetch data",
                        response.status
                    );
                }

                const result: T = await response.json();
                setData(result);
            } catch (error) {
                if (error instanceof FetchError) setError(error);
                else if (error instanceof Error)
                    setError(new FetchError(error.message));
                else setError(new FetchError("An unknown error occurred"));
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [url]);

    return { data, isLoading, error };
}

export default useFetch;
