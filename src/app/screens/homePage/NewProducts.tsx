import { Box, Container, Stack, Card, CardMedia, CardContent, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveNewProducts } from "./selector";
import type { Product } from "../../../lib/types/product";
import { getImageUrl } from "../../../lib/utils/getImageUrl";

const newProductsRetriever = createSelector(retrieveNewProducts, (newProducts) => ({ newProducts }));

export default function NewProducts() {
    const { newProducts } = useSelector(newProductsRetriever);

    return (
        <div className={"new-products-frame"}>
            <Container>
                <Box className={"main"}>
                    <Box className={"category-title"}>New Arrivals</Box>
                    <Stack direction={"row"} sx={{ flexWrap: "wrap", gap: 2 }} className={"cards-frame"}>
                        {newProducts.length !== 0 ? (
                            newProducts.map((product: Product) => {
                                const imagePath = getImageUrl(product.productImages[0]);
                                const sizeVolume = product.productVolume !== "ZERO" ? product.productVolume : product.productSize;
                                return (
                                    <Card key={product._id} className={"card"} sx={{ position: "relative", backgroundColor: "#151515" }}>
                                        <div className="product-sale">{sizeVolume}</div>
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
                                                <Typography sx={{ color: "#e50914", fontWeight: 600, ml: 1 }}>
                                                    ${product.productPrice}
                                                </Typography>
                                            </Stack>
                                            <Typography sx={{ color: "#ccc", display: "flex", alignItems: "center", mt: 0.5 }}>
                                                {product.productViews}
                                                <VisibilityIcon sx={{ fontSize: 20, marginLeft: "5px" }} />
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                );
                            })
                        ) : (
                            <Box className="no-data">New products are not available</Box>
                        )}
                    </Stack>
                </Box>
            </Container>
        </div>
    );
}