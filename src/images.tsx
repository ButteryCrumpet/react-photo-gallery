
export interface CategoryImageMap { [key: string]: Image[] } 

export interface Image {
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


export default getEmbeddedImages