import { IFighter } from "./IFighter.ts";
import { IMetaDataDB } from "./IMetaDataDB.ts";

export interface ICharacter extends IMetaDataDB {
    items: IFighter[]
}