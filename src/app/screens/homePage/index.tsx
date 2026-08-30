import { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { Dispatch } from "@reduxjs/toolkit";
import Statistics from "./Statistics";
import { setPopularProducts, setNewProducts, setTopShops } from "./slice";
import type { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import MemberService from "../../services/MemberService";
import type { Member } from "../../../lib/types/member";

const actionDispatch = (dispatch: Dispatch) => ({
    setPopularProducts: (data: Product[]) => dispatch(setPopularProducts(data)),
    setNewProducts: (data: Product[]) => dispatch(setNewProducts(data)),
    setTopShops: (data: Member[]) => dispatch(setTopShops(data)),
});

export default function HomePage() {
    const { setPopularProducts, setNewProducts, setTopShops } = actionDispatch(useDispatch());

    useEffect(() => {
        const product = new ProductService();
        product.getProducts({ page: 1, limit: 4, order: "productViews", productCollection: ProductCollection.EXTERIOR_CARE })
            .then((data) => setPopularProducts(data))
            .catch((err) => console.log(err));

        product.getProducts({ page: 1, limit: 4, order: "createdAt" })
            .then((data) => setNewProducts(data))
            .catch((err) => console.log(err));

        const member = new MemberService();
        member.getTopShops()
            .then((data) => setTopShops(data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className={"homepage"}>
            <Statistics />
        </div>
    );
}