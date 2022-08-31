import { GroupType } from './../enums/group-type';
import { MaterialType } from './../enums/material-type';
export interface Material {
    name:string;
    filePath:string;
    materialType:MaterialType;
    group:GroupType;
}