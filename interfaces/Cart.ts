import { ProductInstallments } from "./Response";

export interface ICartProduct {
    meli_id: string,
    name: string,
    price: number,
    thumbnail: string;
    installments: ProductInstallments;
    totalStock: number;
    quantity: number;
}