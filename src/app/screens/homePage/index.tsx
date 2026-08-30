import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import type { Dispatch } from "@reduxjs/toolkit";
import Statistics from "./Statistics";
import PopularProducts from "./PopularProducts";
import NewProducts from "./NewProducts";
import { setPopularProducts, setNewProducts, setTopUsers } from "./slice";
import type { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import MemberService from "../../services/MemberService";
import type { Member } from "../../../lib/types/member";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";


const actionDispatch = (dispatch: Dispatch) => ({
    setPopularProducts: (data: Product[]) => dispatch(setPopularProducts(data)),
    setNewProducts: (data: Product[]) => dispatch(setNewProducts(data)),
    setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});

export default function HomePage() {
    const { setPopularProducts, setNewProducts, setTopUsers } = actionDispatch(useDispatch());

    useEffect(() => {
        const product = new ProductService();
        product.getProducts({ page: 1, limit: 4, order: "productViews", productCollection: ProductCollection.EXTERIOR_CARE })
            .then((data) => setPopularProducts(data))
            .catch((err) => console.log(err));

        product.getProducts({ page: 1, limit: 4, order: "createdAt" })
            .then((data) => setNewProducts(data))
            .catch((err) => console.log(err));

        const member = new MemberService();
        member.getTopUsers()
            .then((data) => setTopUsers(data))
            .catch((err) => console.log(err));
    }, []);

    return (
    <div className="homepage">

        <div className="hero-section">
            <Container maxWidth={false} className="hero-content">
                <Stack className="hero-text">
                    <Typography className="hero-title">
                        World's Best Detailing<br />Products For Your Car
                    </Typography>
                    <Typography className="hero-subtitle">
                        Your choice decides your status.
                    </Typography>
                    <Typography className="hero-service">
                        Service 24/7
                    </Typography>
                    <Box className="hero-cta">
                        <NavLink to="/signup">
                            <Button variant="contained" className="signup-btn">
                                SIGN UP
                            </Button>
                        </NavLink>
                    </Box>
                </Stack>
            </Container>
        </div>

        <Statistics />
        <PopularProducts />
        <NewProducts />
        <Advertisement />
        <ActiveUsers />
        <Events />

    </div>
);
}