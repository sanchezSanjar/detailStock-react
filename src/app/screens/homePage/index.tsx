import { useEffect } from "react";
import { useAppDispatch } from "../../hooks";
import Hero from "./Hero";
import Collections from "./Collections";
import PopularProducts from "./PopularProducts";
import NewProducts from "./NewProducts";
import { setPopularProducts, setNewProducts, setTopUsers } from "./slice";
import ProductService from "../../services/ProductService";
import MemberService from "../../services/MemberService";
import Showcase from "./Showcase";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import InfoCenter from "./InfoCenter";


export default function HomePage() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const product = new ProductService();
        product.getProducts({ page: 1, limit: 8, order: "productViews" })
            .then((data) => dispatch(setPopularProducts(data)))
            .catch((err) => console.log(err));

        product.getProducts({ page: 1, limit: 8, order: "createdAt" })
            .then((data) => dispatch(setNewProducts(data)))
            .catch((err) => console.log(err));

        const member = new MemberService();
        member.getTopUsers()
            .then((data) => dispatch(setTopUsers(data)))
            .catch((err) => console.log(err));
    }, [dispatch]);

    return (
    <div className="homepage">

        <Hero />

        <Collections />
        <PopularProducts />
        <Showcase />
        <NewProducts />
        <ActiveUsers />
        <Events />
        <InfoCenter />

    </div>
);
}