export enum MaterialType {
    Video,
    Audio,
    Pdf,
    Word,
    Excel,
    Powerpoint
}

export const materialTypesAsString = Object.keys(MaterialType).filter((item) => {
    return isNaN(Number(item));
});