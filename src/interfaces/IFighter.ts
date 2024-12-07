import { ITransformation } from "./ITransformation";

export interface IFighter {
    id: number;
    name: string;
    ki: string;
    maxKi: string;
    race: string;
    image: string;
    gender: string;
    description: string;
    affiliation: string;
    deletedAt: null | unknown;
    originPlanet: {
        id: number;
        name: string;
        isDestroyed: boolean;
        description: string;
        image: string;
        deletedAt: null | unknown;
    };
    transformations: ITransformation[];
}
