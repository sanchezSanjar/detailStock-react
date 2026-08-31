import { type ChangeEvent, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
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
import { getImageUrl } from "../../../lib/utils/getImageUrl";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../slices/cartSlice";
import { Box, Button, Container, Stack, Card, CardMedia, CardContent, Typography, Pagination, PaginationItem } from "@mui/material";

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

    const filteredProducts = products.filter((product: Product) =>
    product.productName.toLowerCase().includes(searchText.toLowerCase())
    );

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
                                {filteredProducts.length !== 0 ? (
                                filteredProducts.map((product: Product) => {
                                const imagePath = getImageUrl(product.productImages[0]);
                                const sizeVolume = product.productVolume !== "ZERO" ? product.productVolume : product.productSize;
                                return (
                                    <Card
                                        key={product._id}
                                        className="product-card"
                                        sx={{ position: "relative", backgroundColor: "#151515", cursor: "pointer" }}
                                        onClick={() => chooseProductHandler(product._id)}
                                    >
                                        <div className="product-sale">{sizeVolume}</div>
                                        <CardMedia component="img" image={imagePath} draggable={false} sx={{ height: 300 }} />
                                        <Button
                                            className={"shop-btn"}
                                            onClick={(e) => handleAddToCart(product, e)}
                                            sx={{ position: "absolute", top: 10, right: 10, zIndex: 2 }}
                                        >
                                            🛒
                                        </Button>
                                        <CardContent
                                            sx={{
                            position: "absolute",
                            bottom: 0,
                            width: "100%",
                            background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
                        }}>
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
                                    <RemoveRedEyeIcon sx={{ fontSize: 20, marginLeft: "5px" }} />
                                </Typography>
                            </CardContent>
                                        </Card>
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