// import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import HomePage from "./screens/homePage";
import ProductsPage from "./screens/productsPage";
import OrdersPage from "./screens/ordersPage";
import UserPage from "./screens/userPage";
import  HelpPage from "./screens/helpPage";
import Navbar from "./components/headers/Navbar";
import { Footer } from "./components/footer";
import LoginPage from "./screens/loginPage";
import SignupPage from "./screens/signupPage";
import "./css/app.css";
import "./css/navbar.css";
import "./css/home.css";


function App() {
 return(
  <>      
    <Navbar />
     
        <Routes>
    <Route path="/products/*" element={<ProductsPage />} />
    <Route path="/orders/*" element={<OrdersPage />} />
    <Route path="/member-page/*" element={<UserPage />} />
    <Route path="/help" element={<HelpPage />} />
    <Route path="/signup" element={<SignupPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/" element={<HomePage />} />
        </Routes>
      <Footer/>
    </>
 );

}

export default App;