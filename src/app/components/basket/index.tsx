import React from "react";
import { Box, Button, Stack, IconButton, Badge, Menu, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import { incrementItem, decrementItem, removeFromCart } from "../../slices/cartSlice";

export function Basket() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const totalPrice = cartItems.reduce((sum, item) => sum + item.productPrice * item.quantity, 0);
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOrder = () => {
        handleClose();
        navigate("/order");
    };

    return (
        <Box className={"hover-line"}>
            <IconButton
                aria-label="cart"
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                <Badge badgeContent={totalQuantity} color="secondary">
                    <ShoppingCartIcon sx={{ color: "#ffffff" }} />
                </Badge>
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: "visible",
                            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                            mt: 1.5,
                            minWidth: 320,
                            "&:before": {
                                content: '""',
                                display: "block",
                                position: "absolute",
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: "background.paper",
                                transform: "translateY(-50%) rotate(45deg)",
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <Stack className={"basket-frame"}>
                    {cartItems.length === 0 ? (
                        <Box className={"all-check-box"}>
                            <div>Cart is empty!</div>
                        </Box>
                    ) : (
                        <Box className={"orders-main-wrapper"}>
                            {cartItems.map((item) => (
                                <Box key={item.productId} className={"orders-wrapper"}>
                                    <Box className={"basket-info-box"}>
                                        <div
                                            className={"cancel-btn"}
                                            onClick={() => dispatch(removeFromCart(item.productId))}
                                        >
                                            <CancelIcon color={"primary"} />
                                        </div>
                                        <img src={item.productImage} className={"product-img"} alt={item.productName} />
                                        <span className={"product-name"}>{item.productName}</span>
                                        <p className={"product-price"}>${item.productPrice} x {item.quantity}</p>
                                        <Box sx={{ minWidth: 120 }}>
                                            <div className="col-2">
                                                <button className="remove" onClick={() => dispatch(decrementItem(item.productId))}>-</button>{" "}
                                                <button className="add" onClick={() => dispatch(incrementItem(item.productId))}>+</button>
                                            </div>
                                        </Box>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    )}

                    {cartItems.length > 0 && (
                        <Box className={"basket-order"}>
                            <Typography className={"price"}>
                                Total: ${totalPrice.toFixed(2)} ({totalQuantity} items)
                            </Typography>
                            <Button startIcon={<ShoppingCartIcon />} variant={"contained"} onClick={handleOrder}>
                                Order
                            </Button>
                        </Box>
                    )}
                </Stack>
            </Menu>
        </Box>
    );
}