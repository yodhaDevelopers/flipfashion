import React, { useState, useEffect } from "react";
import { useStateValue } from "../StateProvider";
import CartProduct from "./CartProduct";
import EmptyCart from "./Components/EmptyCart";
import SnackbarHandler from "./Components/SnackbarHandler";
import { useNavigate } from "react-router-dom";

function Cart() {
    const [{ basket, user }, dispatch] = useStateValue();
    const navigate = useNavigate();
    const [snackbarState, setSnackbarState] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const emptyCart = () => {
        if (basket.length < 1) {
            setSnackbarState({
                open: true,
                message: "Cart is already empty",
                severity: "error",
            });
            setTimeout(() => {
                setSnackbarState(prevState => ({
                    ...prevState,
                    open: false,
                }));
            }, 2000);
        }
        else {
            setSnackbarState({
                open: true,
                message: "Removed all products from cart",
                severity: "success",
            });
            dispatch({
                type: "EMPTY_CART",
            });
            setTimeout(() => {
                setSnackbarState(prevState => ({
                    ...prevState,
                    open: false,
                }));
            }, 2000);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarState({
            ...snackbarState,
            open: false,
        });
    };

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    const handleProductRemove = () => {
        setSnackbarState({
            open: true,
            message: "Removed a product from cart",
            severity: "success",
        });
        setTimeout(() => {
            setSnackbarState(prevState => ({
                ...prevState,
                open: false,
            }));
        }, 2000);
    }

    const handlePurchase = () => {
        setSnackbarState({
            open: true,
            message: "Order Placed Successfully! Go to Returns & Orders to view your order",
            severity: "success",
        });
        setTimeout(() => {
            setSnackbarState(prevState => ({
                ...prevState,
                open: false,
            }));
        }, 2000);
    }

    const handleBuyAll = () => {
        dispatch({
            type: "BUY_ALL",
        });
        setSnackbarState({
            open: true,
            message: "All products bought successfully!",
            severity: "success",
        });
        setTimeout(() => {
            setSnackbarState(prevState => ({
                ...prevState,
                open: false,
            }));
        }, 2000);
    };

    return (
        <>
            <main className="w-full mt-20">
                <SnackbarHandler
                    open={snackbarState.open}
                    message={snackbarState.message}
                    severity={snackbarState.severity}
                    handleClose={handleSnackbarClose}
                />
                <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-11/12 mt-0 sm:mt-4 m-auto sm:mb-7">
                    <div className="flex-1">
                        <div className="flex flex-col shadow bg-white">
                            <span className="font-medium text-lg px-2 sm:px-8 py-4 border-b">My Cart ({basket.length})</span>
                            {basket && basket.length === 0 && (
                                <EmptyCart />
                            )}
                            {basket.map(item => (

                                <CartProduct
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                    image={item.image}
                                    price={item.price}
                                    rating={item.rating}
                                    onRemoveFromBasket={handleProductRemove}
                                    onBuyNow={handlePurchase}
                                />
                            ))}

                            <div className="flex justify-center">
                                <button disabled={basket.length < 1 ? true : false} className={`${basket.length < 1 ? "bg-blue-600 cursor-not-allowed" : "bg-orange-500"} w-full sm:w-1/3 mx-2 sm:mx-6 my-4 py-3 font-medium text-white shadow hover:shadow-lg rounded-sm`} onClick={handleBuyAll}>BUY ALL PRODUCTS IN CART</button>
                                <button className={"bg-blue-600 w-full sm:w-1/3 mx-2 sm:mx-6 my-4 py-3 font-medium text-white shadow hover:shadow-lg rounded-sm"} onClick={emptyCart}>EMPTY CART</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}


export default Cart;