import {combineReducers} from "redux";
import filtersReducer from "../reducers/filters";
import productsReducer from "../reducers/products";

const RootReducer = combineReducers({
    filters: filtersReducer,
    products: productsReducer
});

export default RootReducer;