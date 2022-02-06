import axios from "axios";

export const setLoaded = (payload) => ({
    type: 'SET_LOADED',
    payload,
});

export const fetchProducts = (sortBy, category) => (dispatch)  => {
    dispatch(setLoaded(false));
    axios.get(`products?${category !== null ? `category=${category}` : ''}&_sort=${sortBy.type}&_order=${sortBy.order}`).then(({data}) => {
        dispatch(setProducts(data));
    });
}



export const setProducts = (items) => ({
    type: 'SET_PRODUCTS',
    payload: items,
});