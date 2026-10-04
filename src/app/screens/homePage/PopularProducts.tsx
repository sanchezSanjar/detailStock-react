import { Box, Container, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { retrievePopularProducts } from "./selector";
import type { Product } from "../../../lib/types/product";
import ProductCard from "../../components/productCard";

export default function PopularProducts() {
    const popularProducts = useAppSelector(retrievePopularProducts);
    const navigate = useNavigate();

    return (
        <div className="popular-products-frame">
            <Container>
                <Stack className="popular-section">
                    <Box className="category-title">Popular Products</Box>
                    <Box className="section-subtitle">Most viewed by our customers this week</Box>
                    <Stack direction={"row"} className="cards-frame">
                        {popularProducts.length !== 0 ? (
                            popularProducts.map((product: Product) => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                    onClick={() => navigate(`/products/${product._id}`)}
                                />
                            ))
                        ) : (
                            <Box className="no-data">Popular products are not available</Box>
                        )}
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}
