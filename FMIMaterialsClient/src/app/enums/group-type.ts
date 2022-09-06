export enum GroupType {
    Mathematics,
    Informatics,
    Biology,
}

export const groupsAsString = Object.keys(GroupType).filter((item) => {
    return isNaN(Number(item));
});