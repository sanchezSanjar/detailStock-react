import { type ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Container, Stack, Badge, Pagination, PaginationItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useDispatch, useSelector } from "react-redux";
import type { Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import type { Product, ProductInquiry } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../slices/cartSlice";

const actionDispatch = (dispatch: Dispatch) => ({
    setProducts: (data: Product[]) => dispatch(setProducts(data)),
});
const productsRetriever = createSelector(retrieveProducts, (products) => ({ products }));

const collections = [
    ProductCollection.EXTERIOR_CARE,
    ProductCollection.INTERIOR_CARE,
    ProductCollection.WHEELS_TIRES,
    ProductCollection.GLASS_MIRRORS,
    ProductCollection.TOOLS_ACCESSORIES,
    ProductCollection.POLISH_CORRECTION,
    ProductCollection.OTHERS,
];

export default function Products() {
    const dispatch = useDispatch();
    const { setProducts } = actionDispatch(dispatch);
    const { products } = useSelector(productsRetriever);
    const [productSearch, setProductSearch] = useState<ProductInquiry>({
        page: 1,
        limit: 8,
        order: "createdAt",
        search: "",
    });
    const [searchText, setSearchText] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        const product = new ProductService();
        product.getProducts(productSearch)
            .then((data) => setProducts(data))
            .catch((err) => console.log(err));
    }, [productSearch]);

    // useEffect(() => {
    //     if (searchText === "") {
    //         setProductSearch((prev) => ({ ...prev, search: "" }));
    //     }
    // }, [searchText]);

    const searchCollectionHandler = (collection: ProductCollection | undefined) => {
        setProductSearch((prev) => ({ ...prev, page: 1, productCollection: collection }));
    };

    const searchOrderHandler = (order: string) => {
        setProductSearch((prev) => ({ ...prev, page: 1, order }));
    };

    const searchProductHandler = () => {
        setProductSearch((prev) => ({ ...prev, search: searchText }));
    };

    const paginationHandler = (e: ChangeEvent<unknown>, value: number) => {
        setProductSearch((prev) => ({ ...prev, page: value }));
    };

    const chooseProductHandler = (id: string) => {
        navigate(`/products/${id}`);
    };

    const handleSearchTextChange = (value: string) => {
    setSearchText(value);
    if (value === "") {
        setProductSearch((prev) => ({ ...prev, page: 1, search: "" }));
    }
};

    const handleAddToCart = (product: Product, e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(addToCart({
            productId: product._id,
            productName: product.productName,
            productPrice: product.productPrice,
            productImage: product.productImages[0],
            quantity: 1,
        }));
    };

    return (
        <div className={"products"}>
            <Container>
                <Stack direction={"column"} sx={{ alignItems: "center" }}>
                    <Stack className="avatar-big-box">
                        <Stack className="top-text">
                            <p>DetailStock Shop</p>
                            <Stack direction={"row"} className="single-search-big-box">
                                <input
                                    type="search"
                                    className="single-search-input"
                                    name="singleResearch"
                                    placeholder="Type here"
                                    value={searchText}
                                    onChange={(e) => handleSearchTextChange(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") searchProductHandler();
                                    }}
                                />
                                <Button
                                    className="single-button-search"
                                    variant="contained"
                                    endIcon={<SearchIcon />}
                                    onClick={searchProductHandler}
                                >
                                    Search
                                </Button>
                            </Stack>
                        </Stack>
                    </Stack>

                    <Stack className="dishes-filter-section">
                        <Stack direction={"row"} className="dishes-filter-box">
                            <Button
                                variant={"contained"}
                                className={"order"}
                                color={productSearch.order === "createdAt" ? "primary" : "secondary"}
                                onClick={() => searchOrderHandler("createdAt")}
                            >
                                New
                            </Button>
                            <Button
                                variant={"contained"}
                                className={"order"}
                                color={productSearch.order === "productPrice" ? "primary" : "secondary"}
                                onClick={() => searchOrderHandler("productPrice")}
                            >
                                Price
                            </Button>
                            <Button
                                variant={"contained"}
                                className={"order"}
                                color={productSearch.order === "productViews" ? "primary" : "secondary"}
                                onClick={() => searchOrderHandler("productViews")}
                            >
                                Views
                            </Button>
                        </Stack>
                    </Stack>

                    <Stack className="list-category-section">
                        <Stack className="product-category">
                            <div className="category-main">
                                <Button
                                    variant="contained"
                                    color={!productSearch.productCollection ? "primary" : "secondary"}
                                    onClick={() => searchCollectionHandler(undefined)}
                                >
                                    All
                                </Button>
                                {collections.map((col) => (
                                    <Button
                                        key={col}
                                        variant="contained"
                                        color={productSearch.productCollection === col ? "primary" : "secondary"}
                                        onClick={() => searchCollectionHandler(col)}
                                    >
                                        {col.replace(/_/g, " ")}
                                    </Button>
                                ))}
                            </div>
                        </Stack>

                        <Stack direction={"row"} className="product-wrapper">
                            {products.length !== 0 ? (
                                products.map((product: Product) => {
                                    const imagePath = `${serverApi}/${product.productImages[0]}`;
                                    const sizeVolume = product.productVolume !== "ZERO" ? product.productVolume : product.productSize;
                                    return (
                                        <Stack
                                            key={product._id}
                                            className="product-card"
                                            onClick={() => chooseProductHandler(product._id)}
                                        >
                                            <Stack className="product-img" sx={{ backgroundImage: `url(${imagePath})` }}>
                                                <div className="product-sale">{sizeVolume}</div>
                                                <Button className={"shop-btn"} onClick={(e) => handleAddToCart(product, e)}>
                                                    🛒
                                                </Button>
                                                <Button className="view-btn" sx={{ left: "10px" }}>
                                                    <Badge badgeContent={product.productViews} color="secondary">
                                                        <RemoveRedEyeIcon sx={{ color: product.productViews === 0 ? "gray" : "white" }} />
                                                    </Badge>
                                                </Button>
                                            </Stack>
                                            <Box className={"product-desc"}>
                                                <span className="product-title">{product.productName}</span>
                                                <div className="product-desc">
                                                    <MonetizationOnIcon />
                                                    {product.productPrice}
                                                </div>
                                            </Box>
                                        </Stack>
                                    );
                                })
                            ) : (
                                <Box className="no-data">Products are not available</Box>
                            )}
                        </Stack>
                    </Stack>

                    <Stack className="pagination-section">
                        <Pagination
                            count={products.length !== 0 ? productSearch.page + 1 : productSearch.page}
                            page={productSearch.page}
                            renderItem={(item) => (
                                <PaginationItem
                                    slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                                    {...item}
                                    color={"secondary"}
                                />
                            )}
                            onChange={paginationHandler}
                        />
                    </Stack>
                </Stack>
            </Container>

            <div className="address">
                <Container>
                    <Stack className={"address-area"} sx={{ alignItems: "center" }}>
                        <Box className={"title"}>Our Address</Box>
                        <div className={"map-links"}>
                            <a
                                href="https://map.kakao.com/link/search/대구광역시청"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={"map-btn kakao"}
                            >
                                Open in Kakao Map
                            </a>
                            <a
                                href="https://map.naver.com/p/search/대구광역시청"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={"map-btn naver"}
                            >
                                Open in Naver Map
                            </a>
                        </div>
                    </Stack>
                </Container>
            </div>
        </div>
    );
}