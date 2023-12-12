import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import filtersReducer from "./filtersSlice";
import authReducer from "./authSlice";
import cartReducer from "./shoppingCartSlice";
import ordersReducer from "./ordersSlice";
import sliderReducer from "./slideSlice";
import searchReducer from "./searchSlice";
import reviewReducer from "./reviewSlice";

const store =  configureStore({
    reducer: {
        products: productsReducer,
        filters: filtersReducer,
        auth: authReducer,
        cart : cartReducer,
        orders: ordersReducer,
        slider: sliderReducer,
        search: searchReducer,
        review: reviewReducer
    }
})

export default store;