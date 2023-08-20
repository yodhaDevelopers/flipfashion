import React from 'react';
import { useStateValue } from "../StateProvider";



function SearchHistoryProduct({ title, onRemoveFromHistory }) {
    const [, dispatch] = useStateValue();

    const removeFromHistory = () => {
        // dispatch the item into the data layer
        dispatch({
            type: "REMOVE_FROM_HISTORY",
            item: {
                title: title,
            },
        });
        onRemoveFromHistory();
    };
    return (
        <div className=' flex flex-col items-start gap-2 px-4 py-6 relative hover:shadow-lg rounded-sm'>
            <div className="product__info flex flex-row justify-between items-center text-center group">
                <h2 className="text-xl mt-4 group-hover:text-primary-blue text-left">{title}</h2>

                <button className=" text-l bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded ml-20" onClick={removeFromHistory} >Remove From History </button>

            </div>

        </div>
    )
}

export default SearchHistoryProduct;