import React from "react";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { auth } from "../firebase";
import Searchbar from "./Components/Searchbar";

function Header({ onSignOut, onSearch }) {

    const [{ basket, user, history }] = useStateValue();

    const handleAuthenticaton = () => {
        if (user) {
            auth.signOut();
            onSignOut();
        }
    }

    const handleSearch = () => {
        onSearch();
    }

    return (
        <header className="bg-blue-700 fixed top-0 py-2.5 w-full z-10">

            <div className=" w-full sm:w-9/12 px-1 sm:px-4 m-auto flex  sm:w-9/12 px-1 sm:px-4 m-auto flex justify-between items-center relative">

                <div className="flex items-center flex-1">
                    <Link to="/" className="h-7 mr-1 sm:mr-4">
                        <img
                            className="h-full w-full object-contain"
                            src="assets/logo.png" alt="flipfashion"
                        />
                    </Link>
                    <Searchbar search={handleSearch} />
                </div>

                <div className="flex items-center justify-between ml-1 sm:ml-0 gap-0.5 sm:gap-7 relative">
                    {/* <span className=" px-3 sm:px-9 py-0.5 text-primary-blue  font-medium rounded-sm ">Welcome {!user ? ' Guest' : user.email}</span> */}

                    <Link to={'/login'} className="px-3 sm:px-6 py-0.6 text-primary-blue bg-white border font-medium rounded cursor-pointer">

                        <div onClick={handleAuthenticaton} className="header__option">
                            <span>{user ? ' Sign Out' : ' Sign In'}</span>
                        </div>
                    </Link>

                    <Link to='/orders' className="flex items-center text-white font-medium gap-2 relative">
                        <div className="">
                            <span className="">Returns&nbsp;</span>
                            <span className="">& Orders</span>

                        </div>
                    </Link>

                    <Link to="/cart" className="flex items-center text-white font-medium gap-2 relative">
                        <span>
                            <ShoppingCartOutlinedIcon /> </span>
                        <span className="w-5 h-5 p-2 bg-red-500 text-xs rounded-full absolute -top-2 left-3 flex justify-center items-center border">
                            {basket?.length}
                        </span>

                    </Link>
                    <Link to="/history" className="flex items-center text-white font-large relative ">
                        <span>
                            <ScheduleRoundedIcon /> </span>
                        <span className="w-5 h-5 p-2 bg-red-500 text-xs rounded-full absolute -top-2 left-3 flex justify-center items-center border">
                            {history?.length}
                        </span>
                    </Link>

                </div>
            </div>
        </header>
    );
}

export default Header;