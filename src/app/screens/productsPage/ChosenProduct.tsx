import { useEffect } from "react";
import { Container, Stack, Box, Button } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Divider from "../../components/divider";
import "swiper/css";
import "swiper/css/navigation";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { createSelector } from "@reduxjs/toolkit";
import { setChosenProduct, setShop } from "./slice";
import { retrieveChosenProduct, retrieveShop } from "./selector";
import { useParams } from "react-router-dom";
import ProductService from "../../services/ProductService";
import MemberService from "../../services/MemberService";
import { getImageUrl } from "../../../lib/utils/getImageUrl";
import { formatPrice } from "../../../lib/utils/formatPrice";
import { addToCart } from "../../slices/cartSlice";
import  "../../css/products.css";

const chosenProductRetriever = createSelector(retrieveChosenProduct, (chosenProduct) => ({ chosenProduct }));
const shopRetriever = createSelector(retrieveShop, (shop) => ({ shop }));

export default function ChosenProduct() {
    const { productId } = useParams<{ productId: string }>();
    const dispatch = useAppDispatch();
    const { chosenProduct } = useAppSelector(chosenProductRetriever);
    const { shop } = useAppSelector(shopRetriever);

    useEffect(() => {
        if (!productId) return;
        const product = new ProductService();
        product.getProduct(productId)
            .then((data) => dispatch(setChosenProduct(data)))
            .catch((err) => console.log(err));

        const member = new MemberService();
        member.getShop()
            .then((data) => dispatch(setShop(data)))
            .catch((err) => console.log(err));
    }, [dispatch, productId]);

    if (!chosenProduct || chosenProduct._id !== productId) return null;

    return (
        <div className={"chosen-product"}>
            <Box className={"title"}>Product Detail</Box>
            <Container className={"product-container"}>
                <Stack className={"chosen-product-slider"}>
                    <Swiper loop={chosenProduct.productImages.length > 1} spaceBetween={10} navigation={true} modules={[Navigation]} className="swiper-area">
                        {chosenProduct.productImages.map((ele: string, index: number) => {
                            const imagePath = getImageUrl(ele);
                            return (
                                <SwiperSlide key={index}>
                                    <img className="slider-image" src={imagePath} alt="" />
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </Stack>
                <Stack className={"chosen-product-info"}>
                    <Box className={"info-box"}>
                        <strong className={"product-name"}>{chosenProduct.productName}</strong>
                        <span className={"resto-name"}>{shop?.memberNick}</span>
                        <span className={"resto-name"}>{shop?.memberPhone}</span>
                        <Box className={"rating-box"}>
                            <div className={"evaluation-box"}>
                                <div className={"product-view"}>
                                    <RemoveRedEyeIcon sx={{ mr: "10px" }} />
                                    <span>{chosenProduct.productViews}</span>
                                </div>
                            </div>
                        </Box>
                        <p className={"product-desc"}>{chosenProduct.productDesc ? chosenProduct.productDesc : "No Description"}</p>
                        <Divider height="1" width="100%" bg="var(--line)" />
                        <div className={"product-price"}>
                            <span>Price:</span>
                            <span>{formatPrice(chosenProduct.productPrice)}</span>
                        </div>
                        <div className={"button-box"}>
                            <Button
                                variant="contained"
                                disabled={chosenProduct.productLeftCount === 0}
                                onClick={() => dispatch(addToCart({
                                    productId: chosenProduct._id,
                                    productName: chosenProduct.productName,
                                    productPrice: chosenProduct.productPrice,
                                    productImage: chosenProduct.productImages[0],
                                    productLeftCount: chosenProduct.productLeftCount,
                                    quantity: 1,
                                }))}
                            >
                                {chosenProduct.productLeftCount === 0 ? "Sold Out" : "Add To Basket"}
                            </Button>
                        </div>
                    </Box>
                </Stack>
            </Container>
        </div>
    );
}