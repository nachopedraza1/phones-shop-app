export interface Order {
    id: number;
    userId: number;
    total: string;
    city: string;
    country: string;
    zip: string;
    isPaid: number;
    products: OrderProduct[];
}
export interface OrderProduct {
    name: string;
    image: string;
    quantity: number;
    productId: number;
}