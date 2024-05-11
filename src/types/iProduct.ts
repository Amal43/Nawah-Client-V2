
export interface IProduct {
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
    quantity: number;
    status: string;
    farmerId?: string;
    rates?: number;
    _id:string;
    amount?:number;
}