export const initialState = {
    basket: [],
    orders: [],
    history: [],
    user: null
};

// Selector
export const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) => item.price + amount, 0);

function reducer(state, action) {

    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.user
            }
        case "ADD_TO_BASKET":
            return {
                ...state,
                basket: [...state.basket, action.item],
            };

        case "EMPTY_CART":
            return {
                ...state,
                basket: [],
            };

        case "REMOVE_FROM_BASKET":
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            );
            let newBasket = [...state.basket];

            if (index >= 0) {
                newBasket.splice(index, 1);

            } else {
                console.warn(
                    `Cant remove product (id: ${action.id}) as its not in basket!`
                )
            }

            return {
                ...state,
                basket: newBasket
            }

        case "BUY_ALL":
            return {
                ...state,
                orders: [...state.orders, ...state.basket],
                basket: [],
            };


        case "PLACE_ORDER":
            return {
                ...state,
                orders: [...state.orders, action.item],
            }

        case "REMOVE_FROM_ORDERS":
            const order_index = state.orders.findIndex(
                (orderItem) => orderItem.id === action.id
            );
            let newOrder = [...state.orders];

            if (order_index >= 0) {
                newOrder.splice(order_index, 1);

            } else {
                console.warn(
                    `Cant remove product (id: ${action.id}) as its not in your products!`
                )
            }

            return {
                ...state,
                orders: newOrder
            }

        case "EMPTY_ORDERS":
            return {
                ...state,
                orders: [],
            };


        case "ADD_TO_SEARCH_HISTORY":
            return {
                ...state,
                history: [...state.history, action.item],
            }

        case "REMOVE_FROM_HISTORY":
            const search_index = state.history.findIndex(
                (searchItem) => searchItem.id === action.id
            );
            let newSearch = [...state.history];

            if (search_index >= 0) {
                newSearch.splice(search_index, 1);

            } else {
                console.warn(
                    `Cant remove product (id: ${action.id}) as its not in your products!`
                )
            }

            return {
                ...state,
                history: newSearch
            }

        case "EMPTY_HISTORY":
            return {
                ...state,
                history: [],
            };

        default:
            return state;
    }
};

export default reducer;