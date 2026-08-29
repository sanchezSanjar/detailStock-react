// import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { Route , Routes, useLocation} from "react-router-dom";
import { HomePage } from "./screens/homePage";
import { ProductsPage } from "./screens/productsPage";
import { OrdersPage } from "./screens/ordersPage";
import { UserPage } from "./screens/userPage";
import { HomeNavbar } from "./components/headers/HomeNavbar";
import { OtherNavbar } from "./components/headers/OtherNavbar";
import { Footer } from "./components/footer";

function App() {
const location = useLocation();
console.log("location:", location);

 return(
  <>      
    {location.pathname === "/" ?<HomeNavbar /> : <OtherNavbar/>}
     
        <Routes>
          <Route path="/products">
            <ProductsPage />
          </Route>
          <Route path="/orders">
            <OrdersPage/>
          </Route>
          <Route path="/member-page">
            <UserPage/>
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Routes>
      <Footer/>
    </>
 );

}

export default App;