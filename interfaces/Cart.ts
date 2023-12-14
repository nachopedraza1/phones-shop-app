import { ProductInstallments } from "./Response";


export interface Data {
    name: string,
    country: string,
    city: string,
    zip: string,
    address: string,
    phone: string,
}

export interface ICartProduct {
    meli_id: string,
    name: string,
    price: number,
    thumbnail: string;
    installments: ProductInstallments;
    totalStock: number;
    quantity: number;
}