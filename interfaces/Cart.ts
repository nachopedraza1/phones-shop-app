import { ProductInstallments } from "./Response";

export interface ShippingAddress {
    name: string;
    country: string;
    city: string;
    zip: number;
    address: string;
    phone: string;
}

export interface ICartProduct {
    id: number
    meli_id: string;
    name: string;
    price: number;
    thumbnail: string;
    installments: ProductInstallments;
    totalStock: number;
    quantity: number;
}

export interface CartOrder {
    userId: number;
    total: number;
    city: string;
    country: string;
    zip: number;
    isPaid?: boolean;
    products: ICartProduct[];
}
