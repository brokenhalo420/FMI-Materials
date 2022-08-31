export enum UserType {
    Admin,
    User
}

export const userTypesAsString = Object.keys(UserType).filter((v) => !isNaN(Number(v)));