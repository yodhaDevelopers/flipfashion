import { useStateValue } from "../StateProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import EmptySearchHistory from './Components/EmptySearchHistory';
import SearchHistoryProduct from './SearchHistoryProduct';
import SnackbarHandler from "./Components/SnackbarHandler";


function SearchHistory() {
    const [{ history }, dispatch] = useStateValue();
    const [snackbarState, setSnackbarState] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const navigate = useNavigate();


    const goHomeHandler = () => {
        navigate('/');
    }

    const emptyHistory = () => {
        if (history.length < 1) {
            setSnackbarState({
                open: true,
                message: "Search History is already empty",
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
                message: "Removed all products from Search History",
                severity: "success",
            });
            dispatch({
                type: "EMPTY_HISTORY",
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

    const handleRemoveFromHistory = () => {
        setSnackbarState({
            open: true,
            message: "Deleted a item from your search history",
            severity: "success",
        });
        setTimeout(() => {
            setSnackbarState(prevState => ({
                ...prevState,
                open: false,
            }));
        }, 2000);
    }


    return (
        <>
            <main className="w-full mt-20">

                <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-11/12 mt-0 sm:mt-4 m-auto sm:mb-7">
                    <div className="flex-1">
                        <div className="flex flex-col shadow bg-white">
                            <span className="font-medium text-lg px-2 sm:px-8 py-4 border-b">Search History &nbsp;({history.length})</span>
                            {history && history.length === 0 && (
                                <EmptySearchHistory />
                            )}
                            {history.map(item => (
                                <SearchHistoryProduct
                                    title={item.title}
                                    onRemoveFromHistory={handleRemoveFromHistory}
                                />
                            ))}
                            <span className="flex justify-center">
                                <SnackbarHandler
                                    open={snackbarState.open}
                                    message={snackbarState.message}
                                    severity={snackbarState.severity}
                                    handleClose={handleSnackbarClose}
                                />
                                <button onClick={goHomeHandler} className="bg-blue-600 cursor-pointer w-full sm:w-1/3 mx-2 sm:mx-6 my-4 py-3 font-medium text-white shadow hover:shadow-lg rounded-sm">SEARCH FOR PRODUCTS</button>
                                <button className={"bg-blue-600 w-full sm:w-1/3 mx-2 sm:mx-6 my-4 py-3 font-medium text-white shadow hover:shadow-lg rounded-sm"} onClick={emptyHistory}>CLEAR SEARCH HISTORY</button>
                            </span>
                        </div>
                    </div>
                </div>
            </main></>
    );
}

export default SearchHistory;