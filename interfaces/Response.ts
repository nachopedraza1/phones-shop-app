
export interface MySqlProduct {
    id:                    number;
    meli_id:               string;
    name:                  string;
    price:                 number;
    condition:             string;
    brand:                 string;
    thumbnail:             string;
    thumbnail_id:          string;
    totalSold:             number;
    negative:              number;
    neutral:               number;
    positive:              number;
    quantity:              number;
    amount:                number;
    rate:                  number;
}

export interface Products {
    id:           number;
    meli_id:      string;
    name:         string;
    price:        number;
    condition:    string;
    brand:        string;
    thumbnail:    string;
    thumbnail_id: string;
    totalSold:    number;
    rating:       ProductRating;
    installments: ProductInstallments;
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
