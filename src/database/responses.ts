
export type InsertRes<T> = {
    success: boolean,
    error?: string,
    amount: number
    inserted: T[],
};
