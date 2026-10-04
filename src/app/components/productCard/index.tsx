import type { MouseEvent } from "react";
import { IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import type { Product } from "../../../lib/types/product";
import { ProductVolume } from "../../../lib/enums/product.enum";
import { getImageUrl } from "../../../lib/utils/getImageUrl";
import "../../css/productCard.css";

interface ProductCardProps {
    product: Product;
    onClick?: (product: Product) => void;
    onAddToCart?: (product: Product) => void;
}

export default function ProductCard({ product, onClick, onAddToCart }: ProductCardProps) {
    const sizeVolume = product.productVolume !== ProductVolume.ZERO ? product.productVolume : product.productSize;
    const soldOut = product.productLeftCount === 0;

    const handleAddToCart = (e: MouseEvent) => {
        e.stopPropagation();
        onAddToCart?.(product);
    };

    return (
        <div className={"product-card"} onClick={() => onClick?.(product)}>
            {/* whole photo on a grey box, never cropped */}
            <div className={"product-photo"}>
                <img src={getImageUrl(product.productImages[0], "/img/default.png")} alt={product.productName} draggable={false} />
                <span className={"product-badge"}>{sizeVolume.replace(/_/g, " ")}</span>
                {soldOut && <span className={"product-badge sold-out"}>SOLD OUT</span>}
            </div>

            <div className={"product-body"}>
                <span className={"product-name"} title={product.productName}>{product.productName}</span>
                <div className={"product-meta"}>
                    <span className={"product-price"}>${product.productPrice}</span>
                    <span className={"product-views"}>
                        <VisibilityOutlinedIcon fontSize="inherit" />
                        {product.productViews}
                    </span>
                </div>
            </div>

            {onAddToCart && (
                <IconButton
                    className={"product-cart-btn"}
                    aria-label="add to basket"
                    disabled={soldOut}
                    onClick={handleAddToCart}
                >
                    <AddShoppingCartIcon fontSize="small" />
                </IconButton>
            )}
        </div>
    );
}
