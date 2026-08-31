import { Box, Container, Stack, Card, CardMedia, CardContent, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getImageUrl } from "../../../lib/utils/getImageUrl";
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
                                const imagePath = getImageUrl(product.productImages[0]);
                                return (
                                    <Card key={product._id} className={"card"} sx={{ position: "relative", backgroundColor: "#151515" }}>
                                        <CardMedia component="img" image={imagePath} draggable={false} sx={{ height: 300 }} />
                                        <CardContent
                                            sx={{
                                                position: "absolute",
                                                bottom: 0,
                                                width: "100%",
                                                background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
                                            }}
                                        >
                                            <Stack direction={"row"} sx={{ justifyContent: "space-between", alignItems: "center" }}>
                                                <Typography
                                                    sx={{
                                                        color: "#fff",
                                                        fontSize: "1.1rem",
                                                        fontWeight: 700,
                                                        flex: 1,
                                                        whiteSpace: "nowrap",
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                    }}
                                                >
                                                    {product.productName}
                                                </Typography>
                                                <Typography sx={{ color: "#e50914", fontWeight: 600 }}>
                                                    ${product.productPrice}
                                                </Typography>
                                            </Stack>
                                            <Typography sx={{ color: "#ccc", display: "flex", alignItems: "center", mt: 0.5 }}>
                                                {product.productViews}
                                                <VisibilityIcon sx={{ fontSize: 22, marginLeft: "5px" }} />
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