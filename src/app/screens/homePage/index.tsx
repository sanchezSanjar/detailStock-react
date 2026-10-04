import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Statistics from "./Statistics";
import PopularProducts from "./PopularProducts";
import NewProducts from "./NewProducts";
import { setPopularProducts, setNewProducts, setTopUsers } from "./slice";
import ProductService from "../../services/ProductService";
import MemberService from "../../services/MemberService";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import InfoCenter from "./InfoCenter";


export default function HomePage() {
    const dispatch = useAppDispatch();
    const authMember = useAppSelector((state) => state.auth.authMember);

    useEffect(() => {
        const product = new ProductService();
        product.getProducts({ page: 1, limit: 4, order: "productViews" })
            .then((data) => dispatch(setPopularProducts(data)))
            .catch((err) => console.log(err));

        product.getProducts({ page: 1, limit: 4, order: "createdAt" })
            .then((data) => dispatch(setNewProducts(data)))
            .catch((err) => console.log(err));

        const member = new MemberService();
        member.getTopUsers()
            .then((data) => dispatch(setTopUsers(data)))
            .catch((err) => console.log(err));
    }, [dispatch]);

    return (
    <div className="homepage">

        <div className="hero-section">
            <video className="hero-video" autoPlay muted loop playsInline poster="/img/default.png">
                <source type="video/mp4" src="/video/detailStock-ads-1.mp4" />
            </video>
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
                        <NavLink to={authMember ? "/products" : "/signup"}>
                            <Button variant="contained" className="signup-btn">
                                {authMember ? "SHOP NOW" : "SIGN UP"}
                            </Button>
                        </NavLink>
                    </Box>
                </Stack>
            </Container>

            <Statistics />
        </div>

        <PopularProducts />
        <NewProducts />
        <Advertisement />
        <ActiveUsers />
        <Events />
        <InfoCenter />

    </div>
);
}