import { ProductInstallments } from "./Response";

export interface ICartProduct {
    meli_id: string,
    name: string,
    price: string,
    thumbnail: string;
    installments: ProductInstallments;
}