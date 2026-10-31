import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import { ProductVolume } from "../../../lib/enums/product.enum";
import { sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { createSelector } from "@reduxjs/toolkit";
import { setChosenProduct, setShop } from "./slice";
import { retrieveChosenProduct, retrieveShop } from "./selector";
import { NavLink, useParams } from "react-router-dom";
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
    const [thumbs, setThumbs] = useState<SwiperType | null>(null);

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

    const images = chosenProduct.productImages.length ? chosenProduct.productImages : [""];
    const soldOut = chosenProduct.productLeftCount === 0;
    const lowStock = !soldOut && chosenProduct.productLeftCount <= 5;
    const sizeVolume = chosenProduct.productVolume !== ProductVolume.ZERO ? chosenProduct.productVolume : chosenProduct.productSize;
    const collectionLabel = chosenProduct.productCollection.replace(/_/g, " ").toLowerCase();

    const handleAddToCart = () => {
        dispatch(
            addToCart({
                productId: chosenProduct._id,
                productName: chosenProduct.productName,
                productPrice: chosenProduct.productPrice,
                productImage: chosenProduct.productImages[0],
                productLeftCount: chosenProduct.productLeftCount,
                quantity: 1,
            }),
        );
        sweetTopSmallSuccessAlert("Added to basket", 1200).then();
    };

    return (
        <div className={"chosen-product"}>
            <div className={"detail-wrap"}>
                <nav className={"detail-crumbs"}>
                    <NavLink to="/products">Shop</NavLink>
                    <span>/</span>
                    <NavLink to={`/products?collection=${chosenProduct.productCollection}`}>{collectionLabel}</NavLink>
                    <span>/</span>
                    <strong>{chosenProduct.productName}</strong>
                </nav>

                <div className={"detail-grid"}>
                    <div className={"detail-gallery"}>
                        <Swiper
                            loop={images.length > 1}
                            spaceBetween={10}
                            navigation={images.length > 1}
                            thumbs={{ swiper: thumbs && !thumbs.destroyed ? thumbs : null }}
                            modules={[Navigation, Thumbs]}
                            className="detail-main-swiper"
                        >
                            {images.map((ele: string, index: number) => (
                                <SwiperSlide key={index}>
                                    <img className="slider-image" src={getImageUrl(ele, "/img/default.png")} alt={chosenProduct.productName} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        {images.length > 1 && (
                            <Swiper
                                onSwiper={setThumbs}
                                spaceBetween={10}
                                slidesPerView={4}
                                watchSlidesProgress
                                modules={[Thumbs]}
                                className="detail-thumbs"
                            >
                                {images.map((ele: string, index: number) => (
                                    <SwiperSlide key={index}>
                                        <img src={getImageUrl(ele, "/img/default.png")} alt="" />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )}
                    </div>

                    <div className={"detail-info"}>
                        <span className={"detail-collection"}>{collectionLabel}</span>
                        <h1 className={"detail-name"}>{chosenProduct.productName}</h1>
                        <div className={"detail-meta"}>
                            <span className={"detail-chip"}>{sizeVolume.replace(/_/g, " ")}</span>
                            <span className={`detail-stock ${soldOut ? "is-out" : lowStock ? "is-low" : ""}`}>
                                <i />
                                {soldOut ? "Sold out" : lowStock ? `Only ${chosenProduct.productLeftCount} left` : "In stock"}
                            </span>
                            <span className={"detail-views"}>
                                <VisibilityOutlinedIcon fontSize="inherit" /> {chosenProduct.productViews} views
                            </span>
                        </div>

                        <div className={"detail-price"}>{formatPrice(chosenProduct.productPrice)}</div>
                        <p className={"detail-desc"}>{chosenProduct.productDesc || "No description yet."}</p>

                        <div className={"detail-actions"}>
                            <button className={"btn-shine"} disabled={soldOut} onClick={handleAddToCart}>
                                <ShoppingCartOutlinedIcon fontSize="small" /> {soldOut ? "Sold out" : "Add to basket"}
                            </button>
                            <NavLink to="/products" className={"btn-glass"}>
                                <ArrowBackIcon fontSize="small" /> Back to shop
                            </NavLink>
                        </div>

                        <ul className={"detail-perks"}>
                            <li><LocalShippingOutlinedIcon fontSize="small" /> Free delivery on orders from $100</li>
                            <li><VerifiedOutlinedIcon fontSize="small" /> Pro-grade quality, hand-picked</li>
                            <li><SupportAgentOutlinedIcon fontSize="small" /> Sold by {shop?.memberNick ?? "DetailStock"}{shop?.memberPhone ? ` · ${shop.memberPhone}` : ""}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
