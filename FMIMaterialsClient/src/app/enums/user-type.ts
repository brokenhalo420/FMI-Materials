export enum UserType {
    Admin,
    User
}

export const userTypesAsString = Object.keys(UserType).filter((item) => {
    return isNaN(Number(item));
});