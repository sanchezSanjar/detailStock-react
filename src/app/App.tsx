import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import Navbar from "./components/headers/Navbar";
import { Footer } from "./components/footer";
import "./css/app.css";
import "./css/navbar.css";
import "./css/home.css";

const HomePage = lazy(() => import("./screens/homePage"));
const ProductsPage = lazy(() => import("./screens/productsPage"));
const OrdersPage = lazy(() => import("./screens/ordersPage"));
const UserPage = lazy(() => import("./screens/userPage"));
const HelpPage = lazy(() => import("./screens/helpPage"));
const LoginPage = lazy(() => import("./screens/loginPage"));
const SignupPage = lazy(() => import("./screens/signupPage"));
const NotFoundPage = lazy(() => import("./screens/notFoundPage"));

const PageLoader = () => (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress color="primary" />
    </Box>
);

function App() {
    return (
        <>
            <Navbar />
            <Suspense fallback={<PageLoader />}>
                <Routes>
                    <Route path="/products/*" element={<ProductsPage />} />
                    <Route path="/orders/*" element={<OrdersPage />} />
                    <Route path="/member-page/*" element={<UserPage />} />
                    <Route path="/help" element={<HelpPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Suspense>
            <Footer />
        </>
    );
}

export default App;
