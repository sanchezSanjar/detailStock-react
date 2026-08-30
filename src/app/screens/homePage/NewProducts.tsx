import { Box, Container, Stack, Card, CardMedia, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Divider from "../../components/divider";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveNewProducts } from "./selector";
import type { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";

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
                                const imagePath = `${serverApi}/${product.productImages[0]}`;
                                const sizeVolume = product.productVolume !== "ZERO" ? product.productVolume : product.productSize;
                                return (
                                    <Card key={product._id} variant="outlined" className={"card"} sx={{ position: "relative" }}>
                                        <div className="product-sale">{sizeVolume}</div>
                                        <CardMedia component="img" image={imagePath} sx={{ aspectRatio: "1" }} />
                                        <Box className="product-detail" sx={{ p: 1.5 }}>
                                            <Stack direction={"row"} sx={{ alignItems: "center" }}>
                                                <Typography className={"title"}>{product.productName}</Typography>
                                                <Divider width="2" height="24" bg="#d9d9d9" />
                                                <Typography className={"price"}>${product.productPrice}</Typography>
                                            </Stack>
                                            <Typography className={"views"} sx={{ display: "flex", alignItems: "center" }}>
                                                {product.productViews}
                                                <VisibilityIcon sx={{ fontSize: 20, marginLeft: "5px" }} />
                                            </Typography>
                                        </Box>
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