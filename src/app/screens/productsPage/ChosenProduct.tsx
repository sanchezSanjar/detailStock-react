import { useEffect } from "react";
import { Container, Stack, Box, Button, Rating } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Divider from "../../components/divider";
import "swiper/css";
import "swiper/css/navigation";
import { useDispatch, useSelector } from "react-redux";
import type { Dispatch } from "@reduxjs/toolkit";
import { setChosenProduct, setShop } from "./slice";
import { createSelector } from "reselect";
import { retrieveChosenProduct, retrieveShop } from "./selector";
import type { Product } from "../../../lib/types/product";
import { useParams } from "react-router-dom";
import ProductService from "../../services/ProductService";
import MemberService from "../../services/MemberService";
import type { Member } from "../../../lib/types/member";
import { serverApi } from "../../../lib/config";
import { addToCart } from "../../slices/cartSlice";
import  "../../css/products.css";

const actionDispatch = (dispatch: Dispatch) => ({
    setShop: (data: Member) => dispatch(setShop(data)),
    setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
});
const chosenProductRetriever = createSelector(retrieveChosenProduct, (chosenProduct) => ({ chosenProduct }));
const shopRetriever = createSelector(retrieveShop, (shop) => ({ shop }));

export default function ChosenProduct() {
    const { productId } = useParams<{ productId: string }>();
    const dispatch = useDispatch();
    const { setShop, setChosenProduct } = actionDispatch(dispatch);
    const { chosenProduct } = useSelector(chosenProductRetriever);
    const { shop } = useSelector(shopRetriever);

    useEffect(() => {
        if (!productId) return;
        const product = new ProductService();
        product.getProduct(productId)
            .then((data) => setChosenProduct(data))
            .catch((err) => console.log(err));

        const member = new MemberService();
        member.getShop()
            .then((data) => setShop(data))
            .catch((err) => console.log(err));
    }, [productId]);

    if (!chosenProduct) return null;

    return (
        <div className={"chosen-product"}>
            <Box className={"title"}>Product Detail</Box>
            <Container className={"product-container"}>
                <Stack className={"chosen-product-slider"}>
                    <Swiper loop={true} spaceBetween={10} navigation={true} modules={[Navigation]} className="swiper-area">
                        {chosenProduct.productImages.map((ele: string, index: number) => {
                            const imagePath = `${serverApi}/${ele}`;
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
                            <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                            <div className={"evaluation-box"}>
                                <div className={"product-view"}>
                                    <RemoveRedEyeIcon sx={{ mr: "10px" }} />
                                    <span>{chosenProduct.productViews}</span>
                                </div>
                            </div>
                        </Box>
                        <p className={"product-desc"}>{chosenProduct.productDesc ? chosenProduct.productDesc : "No Description"}</p>
                        <Divider height="1" width="100%" bg="#000000" />
                        <div className={"product-price"}>
                            <span>Price:</span>
                            <span>${chosenProduct.productPrice}</span>
                        </div>
                        <div className={"button-box"}>
                            <Button
                                variant="contained"
                                onClick={() => dispatch(addToCart({
                                    productId: chosenProduct._id,
                                    productName: chosenProduct.productName,
                                    productPrice: chosenProduct.productPrice,
                                    productImage: chosenProduct.productImages[0],
                                    quantity: 1,
                                }))}
                            >
                                Add To Basket
                            </Button>
                        </div>
                    </Box>
                </Stack>
            </Container>
        </div>
    );
}