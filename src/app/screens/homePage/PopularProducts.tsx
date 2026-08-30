import { Box, Container, Stack, Card, CardMedia, CardContent, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { serverApi } from "../../../lib/config";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePopularProducts } from "./selector";
import type { Product } from "../../../lib/types/product";

const popularProductsRetriever = createSelector(retrievePopularProducts, (popularProducts) => ({ popularProducts }));

export default function PopularProducts() {
    const { popularProducts } = useSelector(popularProductsRetriever);

    return (
        <div className="popular-products-frame">
            <Container>
                <Stack className="popular-section">
                    <Box className="category-title">Popular Products</Box>
                    <Stack direction={"row"} sx={{ justifyContent: "space-between" }} className="cards-frame">
                        {popularProducts.length !== 0 ? (
                            popularProducts.map((product: Product) => {
                                const imagePath = `${serverApi}/${product.productImages[0]}`;
                                return (
                                    <Card key={product._id} className={"card"} sx={{ position: "relative" }}>
                                        <CardMedia component="img" image={imagePath} sx={{ height: 300 }} />
                                        <CardContent
                                            sx={{
                                                position: "absolute",
                                                bottom: 0,
                                                width: "100%",
                                                background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
                                            }}
                                        >
                                            <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
                                                <Typography variant="h6" sx={{ color: "#fff" }}>
                                                    {product.productName}
                                                </Typography>
                                                <Typography sx={{ color: "#ccc", display: "flex", alignItems: "center" }}>
                                                    {product.productViews}
                                                    <VisibilityIcon sx={{ fontSize: 22, marginLeft: "5px" }} />
                                                </Typography>
                                            </Stack>
                                            <Typography sx={{ color: "#ccc", display: "flex", alignItems: "center", gap: "6px", mt: 1 }}>
                                                <DescriptionOutlinedIcon sx={{ fontSize: 16 }} />
                                                {product.productDesc}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                );
                            })
                        ) : (
                            <Box className="no-data">Popular products are not available</Box>
                        )}
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}