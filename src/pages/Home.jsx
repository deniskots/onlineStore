import React from "react";
import {Categories, SortPopup, ProductBlock, ProductLoadingBlock} from "../components";
import {useDispatch, useSelector} from "react-redux";
import {setCategory, setSortBy} from "../redux/actions/filters";
import {fetchProducts} from "../redux/actions/products";
import {addProductToCart} from "../redux/actions/cart";


const categoryNames = ['Потребительские', 'Производственные', 'Вспомогательные', 'Твердые', 'Жидкие'];
const sortItems = [
    {name: 'популярности', type: 'popular', order: 'desc'},
    {name: 'цене', type: 'price', order: 'desc'},
    {name: 'алфавиту', type: 'name', order: 'asc'}
];


function Home() {
    const dispatch = useDispatch();
    const items = useSelector(({products}) => products.items);
    const cartItems = useSelector(({cart}) => cart.items);
    const isLoaded = useSelector(({products}) => products.isLoaded);
    const {category, sortBy} = useSelector(({filters}) => filters);


    React.useEffect(() => {
        dispatch(fetchProducts(sortBy,category));
    }, [category, sortBy]);


    const onSelectCategory = React.useCallback((index) => {
        dispatch(setCategory(index));
    }, []);


    const onSelectSortType = React.useCallback((type) => {
        dispatch(setSortBy(type));
    }, []);

    const handleAddProductToCart = (obj) => {
        dispatch ({
            type: 'ADD_PRODUCT_CART',
            payload: obj
        })
    }

    return (
        <div className="container">
            <div className="content__top">
                <Categories activeCategory={category}
                            onClickCategory={onSelectCategory}
                            items={categoryNames}/>
                <SortPopup activeSortType={sortBy.type}
                           onClickSortType={onSelectSortType}
                           items={sortItems}/>
            </div>
            <h2 className="content__title">Все товары</h2>
            <div className="content__items">
                {isLoaded
                    ? items.map(obj => <ProductBlock onClickAddProduct = {handleAddProductToCart} key={obj.id} addedCount={cartItems[obj.id] && cartItems[obj.id].items.length}{...obj} />)
                    : Array(9).fill(0).map((_, index) => <ProductLoadingBlock key={index}/>)}

            </div>
        </div>
    )
}


export default Home;