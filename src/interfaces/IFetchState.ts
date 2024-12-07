export interface IFetchState<T> {
    data: T | null;
    error: Error | null;
    isLoading: boolean;
}
