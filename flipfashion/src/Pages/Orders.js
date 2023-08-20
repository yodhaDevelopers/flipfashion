import { useStateValue } from "../StateProvider";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SnackbarHandler from "./Components/SnackbarHandler";
import EmptyOrder from './Components/EmptyOrder';
import OrderProduct from './OrderProduct';

let orderItems = new Set();
function Orders() {
    const [{ orders }, dispatch] = useStateValue();
    const navigate = useNavigate();
    const [snackbarState, setSnackbarState] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const emptyOrders = () => {
        if (orders.length < 1) {
            setSnackbarState({
                open: true,
                message: "No recent orders",
                severity: "error",
            });
        }
        else {
            setSnackbarState({
                open: true,
                message: "Removed all past orders",
                severity: "success",
            });
            dispatch({
                type: "EMPTY_ORDERS",
            });
            setTimeout(() => {
                setSnackbarState(prevState => ({
                    ...prevState,
                    open: false,
                }));
            }, 6000);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarState({
            ...snackbarState,
            open: false,
        });
    };

    const goHomeHandler = () => {
        navigate('/');
    }

    console.log(orderItems);

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
                            <span className="font-medium text-lg px-2 sm:px-8 py-4 border-b">My Orders ({orders.length})</span>

                            {orders && orders.length === 0 && (
                                <EmptyOrder />
                            )}

                            {orders.map(item => (
                                <OrderProduct
                                    id={item.id}
                                    title={item.title}
                                    image={item.image}
                                    price={item.price}
                                />
                            ))}

                            <div className="flex justify-center">
                                <button onClick={goHomeHandler} className="bg-blue-600 cursor-pointer w-full sm:w-1/3 mx-2 sm:mx-6 my-4 py-3 font-medium text-white shadow hover:shadow-lg rounded-sm">PLACE ORDERS NOW</button>
                                <button className={"bg-blue-600 w-full sm:w-1/3 mx-2 sm:mx-6 my-4 py-3 font-medium text-white shadow hover:shadow-lg rounded-sm"} onClick={emptyOrders}>REMOVE ALL PAST ORDERS</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main></>
    );
}

export default Orders;