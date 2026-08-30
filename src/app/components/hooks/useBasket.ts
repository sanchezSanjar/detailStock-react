import { useState } from "react";
import type { CartItem } from "../../../lib/types/search";

const useBasket = () => {
    const cartJson: string | null = localStorage.getItem("cartData");
    const currentCart: CartItem[] = cartJson ? JSON.parse(cartJson) : [];
    const [cartItems, setCartItems] = useState<CartItem[]>(currentCart);

    const onAdd = (input: CartItem) => {
        const exist = cartItems.find((item) => item._id === input._id);
        if (exist) {
            const cartUpdate = cartItems.map((item) =>
                item._id === input._id ? { ...exist, quantity: exist.quantity + 1 } : item
            );
            setCartItems(cartUpdate);
            localStorage.setItem("cartData", JSON.stringify(cartUpdate));
        } else {
            const cartUpdate = [...cartItems, { ...input }];
            setCartItems(cartUpdate);
            localStorage.setItem("cartData", JSON.stringify(cartUpdate));
        }
    };

    const onRemove = (input: CartItem) => {
        const exist = cartItems.find((item) => item._id === input._id);
        if (!exist) return;
        if (exist.quantity === 1) {
            const cartUpdate = cartItems.filter((item) => item._id !== input._id);
            setCartItems(cartUpdate);
            localStorage.setItem("cartData", JSON.stringify(cartUpdate));
        } else {
            const cartUpdate = cartItems.map((item) =>
                item._id === input._id ? { ...exist, quantity: exist.quantity - 1 } : item
            );
            setCartItems(cartUpdate);
            localStorage.setItem("cartData", JSON.stringify(cartUpdate));
        }
    };

    const onDelete = (input: CartItem) => {
        const cartUpdate = cartItems.filter((item) => item._id !== input._id);
        setCartItems(cartUpdate);
        localStorage.setItem("cartData", JSON.stringify(cartUpdate));
    };

    const onDeleteAll = () => {
        setCartItems([]);
        localStorage.removeItem("cartData");
    };

    return { cartItems, onAdd, onRemove, onDelete, onDeleteAll };
};

export default useBasket;