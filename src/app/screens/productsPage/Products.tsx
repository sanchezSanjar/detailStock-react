import { type ChangeEvent, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setProducts } from "./slice";
import { retrieveProducts } from "./selector";
import type { Product, ProductInquiry } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../slices/cartSlice";
import { Box, Button, Container, Stack, Pagination, PaginationItem } from "@mui/material";
import ProductCard from "../../components/productCard";

const collections = [
    ProductCollection.EXTERIOR_CARE,
    ProductCollection.INTERIOR_CARE,
    ProductCollection.WHEELS_TIRES,
    ProductCollection.GLASS_MIRRORS,
    ProductCollection.TOOLS_ACCESSORIES,
    ProductCollection.POLISH_CORRECTION,
    ProductCollection.OTHERS,
];

const orders = [
    { value: "createdAt", label: "New" },
    { value: "productPrice", label: "Price" },
    { value: "productViews", label: "Views" },
];

export default function Products() {
    const dispatch = useAppDispatch();
    const products = useAppSelector(retrieveProducts);
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
            .then((data) => dispatch(setProducts(data)))
            .catch((err) => console.log(err));
    }, [dispatch, productSearch]);

    const searchCollectionHandler = (collection: ProductCollection | undefined) => {
        setProductSearch((prev) => ({ ...prev, page: 1, productCollection: collection }));
    };

    const searchOrderHandler = (order: string) => {
        setProductSearch((prev) => ({ ...prev, page: 1, order }));
    };

    const searchProductHandler = () => {
        setProductSearch((prev) => ({ ...prev, page: 1, search: searchText.trim() }));
    };

    const paginationHandler = (_e: ChangeEvent<unknown>, value: number) => {
        setProductSearch((prev) => ({ ...prev, page: value }));
    };

    const handleSearchTextChange = (value: string) => {
        setSearchText(value);
        if (value === "") {
            setProductSearch((prev) => ({ ...prev, page: 1, search: "" }));
        }
    };

    const filteredProducts = products.filter((product: Product) =>
        product.productName.toLowerCase().includes(searchText.trim().toLowerCase())
    );

    const handleAddToCart = (product: Product) => {
        dispatch(addToCart({
            productId: product._id,
            productName: product.productName,
            productPrice: product.productPrice,
            productImage: product.productImages[0],
            productLeftCount: product.productLeftCount,
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
                            <span className="top-subtext">Professional-grade care for every part of your car</span>
                            <Stack direction={"row"} className="single-search-big-box">
                                <SearchIcon className="single-search-icon" />
                                <input
                                    type="search"
                                    className="single-search-input"
                                    name="singleResearch"
                                    placeholder="Search products"
                                    value={searchText}
                                    onChange={(e) => handleSearchTextChange(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") searchProductHandler();
                                    }}
                                />
                                <Button
                                    className="single-button-search"
                                    variant="contained"
                                    onClick={searchProductHandler}
                                >
                                    Search
                                </Button>
                            </Stack>
                        </Stack>
                    </Stack>

                    <Stack className="dishes-filter-section">
                        <Stack direction={"row"} className="dishes-filter-box">
                            {orders.map((order) => (
                                <Button
                                    key={order.value}
                                    className={"order"}
                                    variant={productSearch.order === order.value ? "contained" : "outlined"}
                                    onClick={() => searchOrderHandler(order.value)}
                                >
                                    {order.label}
                                </Button>
                            ))}
                        </Stack>
                    </Stack>

                    <Stack className="list-category-section">
                        <Stack className="product-category">
                            <div className="category-main">
                                <Button
                                    variant={!productSearch.productCollection ? "contained" : "outlined"}
                                    onClick={() => searchCollectionHandler(undefined)}
                                >
                                    All
                                </Button>
                                {collections.map((col) => (
                                    <Button
                                        key={col}
                                        variant={productSearch.productCollection === col ? "contained" : "outlined"}
                                        onClick={() => searchCollectionHandler(col)}
                                    >
                                        {col.replace(/_/g, " ")}
                                    </Button>
                                ))}
                            </div>
                        </Stack>

                        <Stack direction={"row"} className="product-wrapper">
                            {filteredProducts.length !== 0 ? (
                                filteredProducts.map((product: Product) => (
                                    <ProductCard
                                        key={product._id}
                                        product={product}
                                        onClick={() => navigate(`/products/${product._id}`)}
                                        onAddToCart={handleAddToCart}
                                    />
                                ))
                            ) : (
                                <Box className="no-data">Products are not available</Box>
                            )}
                        </Stack>
                    </Stack>

                    <Stack className="pagination-section">
                        <Pagination
                            count={products.length === productSearch.limit ? productSearch.page + 1 : productSearch.page}
                            page={productSearch.page}
                            color={"primary"}
                            renderItem={(item) => (
                                <PaginationItem
                                    slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                                    {...item}
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
