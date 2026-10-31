import { NavLink, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useAppDispatch } from "../../hooks";
import { addToCart } from "../../slices/cartSlice";
import type { Product } from "../../../lib/types/product";
import ProductCard from "../../components/productCard";
import { sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import "swiper/css";

interface ProductRailProps {
    id: string; // unique per rail, so each one gets its own arrow buttons
    eyebrow: string;
    title: string;
    subtitle: string;
    products: Product[];
    emptyText: string;
    tone?: "base" | "raised";
}

/** a horizontal product slider: arrows on desktop, swipe on phones */
export default function ProductRail({ id, eyebrow, title, subtitle, products, emptyText, tone = "base" }: ProductRailProps) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleAddToCart = (product: Product) => {
        dispatch(
            addToCart({
                productId: product._id,
                productName: product.productName,
                productPrice: product.productPrice,
                productImage: product.productImages[0],
                productLeftCount: product.productLeftCount,
                quantity: 1,
            }),
        );
        sweetTopSmallSuccessAlert("Added to basket", 1200).then();
    };

    return (
        <Reveal className={`home-band ${tone === "raised" ? "home-band-raised" : ""}`}>
            <div className="home-wrap">
                <SectionHeader
                    eyebrow={eyebrow}
                    title={title}
                    subtitle={subtitle}
                    actions={
                        <>
                            <button className={`rail-arrow ${id}-prev`} aria-label="previous products">
                                <ArrowBackIcon fontSize="small" />
                            </button>
                            <button className={`rail-arrow ${id}-next`} aria-label="next products">
                                <ArrowForwardIcon fontSize="small" />
                            </button>
                            <NavLink to="/products" className="sec-link">
                                View all
                            </NavLink>
                        </>
                    }
                />

                {products.length === 0 ? (
                    <div className="home-empty">{emptyText}</div>
                ) : (
                    <Swiper
                        className="product-rail"
                        modules={[Navigation, A11y]}
                        navigation={{ prevEl: `.${id}-prev`, nextEl: `.${id}-next` }}
                        spaceBetween={20}
                        slidesPerView={1.25}
                        breakpoints={{
                            560: { slidesPerView: 2.2 },
                            900: { slidesPerView: 3 },
                            1200: { slidesPerView: 4 },
                        }}
                    >
                        {products.map((product, index) => (
                            <SwiperSlide key={product._id} className="rail-slide" style={{ animationDelay: `${index * 0.07}s` }}>
                                <ProductCard
                                    product={product}
                                    onClick={() => navigate(`/products/${product._id}`)}
                                    onAddToCart={handleAddToCart}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </Reveal>
    );
}
