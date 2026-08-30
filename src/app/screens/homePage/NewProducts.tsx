import { Box, Container, Stack } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
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
                <Stack className={"main"}>
                    <Box className={"category-title"}>New Arrivals</Box>
                    <Stack className={"cards-frame"}>
                        <CssVarsProvider>
                            {newProducts.length !== 0 ? (
                                newProducts.map((product: Product) => {
                                    const imagePath = `${serverApi}/${product.productImages[0]}`;
                                    const sizeVolume =
                                        product.productVolume !== "ZERO"
                                            ? product.productVolume
                                            : product.productSize;
                                    return (
                                        <Card key={product._id} variant="outlined" className={"card"}>
                                            <CardOverflow>
                                                <div className="product-sale">{sizeVolume}</div>
                                                <AspectRatio ratio="1">
                                                    <img src={imagePath} alt="" />
                                                </AspectRatio>
                                            </CardOverflow>
                                            <CardOverflow variant="soft" className="product-detail">
                                                <Stack className="info">
                                                    <Stack direction={"row"}>
                                                        <Typography className={"title"}>
                                                            {product.productName}
                                                        </Typography>
                                                        <Divider width="2" height="24" bg="#d9d9d9" />
                                                        <Typography className={"price"}>
                                                            ${product.productPrice}
                                                        </Typography>
                                                    </Stack>
                                                    <Stack>
                                                        <Typography className={"views"}>
                                                            {product.productViews}
                                                            <VisibilityIcon sx={{ fontSize: 20, marginLeft: "5px" }} />
                                                        </Typography>
                                                    </Stack>
                                                </Stack>
                                            </CardOverflow>
                                        </Card>
                                    );
                                })
                            ) : (
                                <Box className="no-data">New products are not available</Box>
                            )}
                        </CssVarsProvider>
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}