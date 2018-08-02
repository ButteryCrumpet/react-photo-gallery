
export interface CategoryImageMap { [key: string]: ImageInfo[] } 

export interface ImageInfo {
    src: string
    thumbnail: string
    id: number
    date: string
    title: string
    description: string
}

declare const IG_DATA: CategoryImageMap;

export const getEmbeddedImages = (): CategoryImageMap => {
    return IG_DATA ? IG_DATA : {}
}
