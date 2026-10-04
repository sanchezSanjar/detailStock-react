import { Box, Container, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { retrieveNewProducts } from "./selector";
import type { Product } from "../../../lib/types/product";
import ProductCard from "../../components/productCard";

export default function NewProducts() {
    const newProducts = useAppSelector(retrieveNewProducts);
    const navigate = useNavigate();

    return (
        <div className={"new-products-frame"}>
            <Container>
                <Box className={"main"}>
                    <Box className={"category-title"}>New Arrivals</Box>
                    <Box className="section-subtitle">Fresh detailing gear just added to the shop</Box>
                    <Stack direction={"row"} className={"cards-frame"}>
                        {newProducts.length !== 0 ? (
                            newProducts.map((product: Product) => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                    onClick={() => navigate(`/products/${product._id}`)}
                                />
                            ))
                        ) : (
                            <Box className="no-data">New products are not available</Box>
                        )}
                    </Stack>
                </Box>
            </Container>
        </div>
    );
}
