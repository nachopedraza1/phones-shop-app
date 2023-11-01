
export interface MySqlProduct {
    product_id:                    number;
    product_name:                  string;
    product_price:                 number;
    product_condition:             string;
    product_brand:                 string;
    product_thumbnail:             string;
    product_thumbnail_id:          string;
    product_totalSold:             number;
    product_rating_negative:       number;
    product_rating_neutral:        number;
    product_rating_positive:       number;
    product_installments_quantity: number;
    product_installments_amount:   number;
    product_installments_rate:     number;
}

export interface Products {
    product_id:           number;
    product_name:         string;
    product_price:        number;
    product_condition:    string;
    product_brand:        string;
    product_thumbnail:    string;
    product_thumbnail_id: string;
    product_totalSold:    number;
    product_rating:       ProductRating;
    product_installments: ProductInstallments;
}

export interface ProductInstallments {
    quantity: number;
    amount:   number;
    rate:     number;
}

export interface ProductRating {
    negative: number;
    neutral:  number;
    positive: number;
}
