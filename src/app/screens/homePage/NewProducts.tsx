import { useAppSelector } from "../../hooks";
import { retrieveNewProducts } from "./selector";
import ProductRail from "./ProductRail";

export default function NewProducts() {
    const newProducts = useAppSelector(retrieveNewProducts);

    return (
        <ProductRail
            id="new-arrivals"
            eyebrow="Just landed"
            title="New arrivals"
            subtitle="Fresh detailing gear, just added to the shop"
            products={newProducts}
            emptyText="New products are not available"
            tone="raised"
        />
    );
}
