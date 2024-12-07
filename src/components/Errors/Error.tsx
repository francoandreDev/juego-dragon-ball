import { TypeErrorURLComponent } from "../../types/exports.ts";

export function Error({ error }: TypeErrorURLComponent) {
    return <div>Error: {error.message}</div>;
}
