import { useAppSelector } from "../../hooks";
import { retrievePopularProducts } from "./selector";
import ProductRail from "./ProductRail";

export default function PopularProducts() {
    const popularProducts = useAppSelector(retrievePopularProducts);

    return (
        <ProductRail
            id="popular"
            eyebrow="Best sellers"
            title="Popular products"
            subtitle="The gear our customers look at the most"
            products={popularProducts}
            emptyText="Popular products are not available"
            tone="raised"
        />
    );
}
