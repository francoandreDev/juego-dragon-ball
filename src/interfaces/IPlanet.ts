import { IMetaDataDB } from "./IMetaDataDB.ts";
import { IWorld } from "./IWorld.ts";

export interface IPlanet extends IMetaDataDB {
    items: IWorld;
}
