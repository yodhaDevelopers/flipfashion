import SearchIcon from '@mui/icons-material/Search';
//import { useState, useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from "../../StateProvider";
//import axios from 'axios';

const Searchbar = ({ search }) => {

    const [{ }, dispatch] = useStateValue();
    const [keyword, setKeyword] = useState("");
    //const [searchHistory, setSearchHistory] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (keyword !== "") {
            dispatch({
                type: "ADD_TO_SEARCH_HISTORY",
                item: {
                    title: keyword,
                },
            });
            setKeyword('');
            navigate('/');
            search();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full sm:w-9/12 px-1 sm:px-4 py-1.5 flex justify-between items-center shadow-md bg-white rounded-sm overflow-hidden">
            <input value={keyword} onChange={(e) => setKeyword(e.target.value)} className="text-sm flex-1 outline-none border-none placeholder-gray-500" type="text" placeholder="Search for products, brands and more" />
            <button type="submit" className="text-primary-blue"><SearchIcon /></button>
        </form>
    );
};

export default Searchbar;