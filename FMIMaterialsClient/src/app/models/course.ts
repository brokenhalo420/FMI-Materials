import { MaterialType } from './../enums/material-type';
import { GroupType } from './../enums/group-type';
export interface Course {
    name:string;
    groups:GroupType;
    type:MaterialType;
}