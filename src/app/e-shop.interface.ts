export interface EShop {
    name: string;
    oldPrice: number;
    newPrice: number;
    item: number;
    rating: number;
    selected: boolean;
    sizes: Sizes[];
    description: string;
}

export interface Sizes {
    size: string;
    selected: boolean;
}