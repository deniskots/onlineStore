import React from "react";

const initialState = {
    items: {},
    totalPrice: 0,
    totalCount: 0
};
//берем массив,пробегайся по массиву и возращает общуюю сумму ценн(суммируем)
const getTotalPrice = arr => arr.reduce((sum, obj) => obj.price + sum, 0);

//
/*const _get = (obj, path) => {
    const [firstKey, ...keys] = path.split('.');
    return keys.reduce((val, key) => {
        return val[key];
    }, obj[firstKey]);
};
const getTotalSum = (obj, path) => {
    return Object.values(obj).reduce((sum, obj) => {
        const value = _get(obj, path);
        return sum + value;
    }, 0);
};*/
const getCurrentPrice = (newItems) => {
    const items = Object.values(newItems).map(obj => obj.items);

    // создаем ноовый массив,в который с помощью канкат обьединяет все маасивы по индексам
    //эплай берет новый массив собирает все другие и в качестве аргумента передается в канкат
    const allProducts = [].concat.apply([], Object.values(items));
    const totalPrice = getTotalPrice(allProducts);
    const totalCount = allProducts.length
    return{
        totalPrice,
        totalCount
    }
}

const cart = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_PRODUCT_CART': {
            //создаст новый масив. Возьмет все старые значения по ключу[action.payload.id]
            const currentProductItems = !state.items[action.payload.id]
                //создай массив из обьекта, который придет в action.payload
                ? [action.payload]
                /*а если есть такой, то распарси список (проитерируй) items по ключу action.payload.id и добавь в конец весь обьект
                коротый пришел в action.payload*/
                : [...state.items[action.payload.id].items, action.payload];

            const newItems = {
                ...state.items,
                //и по ключу из action.payload.id создает обьект с двумя свойствами. Массивом items и подсчитаной ценой продуктов в этом массиве
                [action.payload.id]: {
                    items: currentProductItems,
                    totalPrice: getTotalPrice(currentProductItems),
                }
            }
            /*const totalCount = getTotalSum(newItems, 'items.length');
            const totalPrice = getTotalSum(newItems, 'totalPrice');*/
            const currentValue = getCurrentPrice(newItems)
            return {
                ...state,
                items: newItems,
                totalCount: currentValue.totalCount,
                totalPrice: currentValue.totalPrice
            };
        }
        //очищаем полность карзину,обнулив все данные до 0 state
        case 'CLEAR_CART' : {
            return {
                totalPrice: 0,
                totalCount: 0,
                items: {},
            }
        }

        //удалить один продукт из списка корзины
        case 'REMOVE_CART_ITEM' : {

            //создаем копию глобального обьекта items
            const newItems = {
                ...state.items
            };

            //до удаления скопирует сумму цен и кол-во
            const currentTotalPrice = newItems[action.payload].totalPrice;
            const currentTotalCount = newItems[action.payload].items.length;

            //удаляет один обьект
            delete newItems[action.payload];

            //возращает текущее ,измененное состояние
            return {
                ...state,
                items: newItems,
                totalPrice: state.totalPrice - currentTotalPrice,
                totalCount: state.totalCount - currentTotalCount,
            }
        }

        case 'PLUS_CART_ITEM': {
            //берет старые значения в items по ключу из экшена и добавляет в конец еще один обьект по этому же ключу и индексом 0
            const newObjItem = [...state.items[action.payload].items, state.items[action.payload].items[0]]
            const newItems = {
                ...state.items,
                [action.payload]: {
                    items: newObjItem,
                    totalPrice: getTotalPrice(newObjItem),
                }
            }
            /*const totalCount = getTotalSum(newItems, 'items.length');
            const totalPrice = getTotalSum(newItems, 'totalPrice');*/
            const currentValue = getCurrentPrice(newItems)
            //возращает старые значения и в конец добавляет новый обьект по клюяу из экшена(стоимость)
            return {
                ...state,
                items: newItems,
                totalCount: currentValue.totalCount,
                totalPrice: currentValue.totalPrice
            }
    }


        case 'MINUS_CART_ITEM': {
            //если в старом массиве остался  больше одного товара,мы делаем удаление,если один товар тогда удаление не делаем
            const oldItems = state.items[action.payload].items;
            const newObjItems = oldItems.length > 1 ? state.items[action.payload].items.slice(1): oldItems;
            const newItems = {
                ...state.items,
                [action.payload]: {
                    items: newObjItems,
                    totalPrice: getTotalPrice(newObjItems),
                }
            }
            /*const totalCount = getTotalSum(newItems, 'items.length');
            const totalPrice = getTotalSum(newItems, 'totalPrice');*/
            const currentValue = getCurrentPrice(newItems)
            return {
                ...state,
                items: newItems,
                totalCount: currentValue.totalCount,
                totalPrice: currentValue.totalPrice
            }
        }
        default:
            return state;
    }
};

export default cart;





/*
const initialState = {
    items: [],
    totalPrice: 0,
    totalCount: 0
};

const cart = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_PRODUCT_CART': {
             const newItems = {
                 ...state.items,
                 [action.payload.id]: !state.items[action.payload.id]
                     ? [action.payload]
                     : [...state.items[action.payload.id], action.payload]
             }
             const allProducts = [].concat.apply([], Object.values(newItems));
             const totalPrice = allProducts.reduce((sum, obj) => obj.price + sum, 0)

            return {
                ...state,
                items: newItems,
                totalCount: allProducts.length,
                totalPrice

            };
        }
        default:
            return state;
    }
};

export default cart;*/
