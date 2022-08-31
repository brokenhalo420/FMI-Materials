export enum GroupType {
    Mathematics,
    Informatics,
    Biology,
}

export const groupsAsString = Object.keys(GroupType).filter((v) => !isNaN(Number(v)));