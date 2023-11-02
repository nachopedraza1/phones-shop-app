import { NextPage } from "next";
import axios from "axios";

import { MeliProductResponse } from "@/interfaces/MeliProduct";
import Main from "@/components/layouts/Main";

const getProduct = async (id: string | string[]): Promise<MeliProductResponse> => {
    const { data } = await axios.get(`https://api.mercadolibre.com/items?ids=${id}`);
    return data[0].body;
}

const ProductPage: NextPage<{ params: { id: string } }> = async ({ params }) => {
    const { id } = params;

    const product = await getProduct(id);

    return (
        <Main>
            <div>ProductPage</div>
        </Main>
    )
}

export default ProductPage;