import React from "react";
import {Categories, SortPopup, ProductBlock, ProductLoadingBlock} from "../components";
import {useDispatch, useSelector} from "react-redux";
import {setCategory} from "../redux/actions/filters";
import {fetchProducts} from "../redux/actions/products";



const categoryNames = ['Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];
const sortItems = [
    {name: 'популярности', type: 'popular'},
    {name: 'цене', type: 'price'},
    {name: 'алфавиту', type: 'alphabet'}]


function Home() {
    const dispatch = useDispatch();
    const items = useSelector(({products}) => products.items);
    const isLoaded = useSelector(({products}) => products.isLoaded);
    const {category, sortBy} = useSelector(({filters}) => filters);



    React.useEffect(() => {
        dispatch(fetchProducts());
    }, [category]);


    const onSelectedCategory = React.useCallback((index) => {
        dispatch(setCategory(index));
    });

    return (
        <div className="container">
            <div className="content__top">
                <Categories onClickItem={onSelectedCategory} items={categoryNames}/>
                <SortPopup items={sortItems}/>
            </div>
            <h2 className="content__title">Все товары</h2>
            <div className="content__items">
                {isLoaded
                    ? items.map(obj => <ProductBlock key={obj.id} isLoading={true} {...obj} />)
                    : Array(9).fill(0).map((_, index) =><ProductLoadingBlock key={index}/>)}

            </div>
        </div>
    )
};


export default Home;