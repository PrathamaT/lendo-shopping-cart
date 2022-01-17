import data from '../data.json';
import { getProductById, getSelectedVariant, findIndexOfSelectedProduct, findIndexofSelectedOption, getSelectedOption, getNewBasket } from '../objectUtil';

export const initialState = {
    products: { ...data },
    basket: [],
    isSearchActive: false,
    foundProducts: {}, // used in case of searching a product
    isVariantSelected: false,
    variantValue: '',

};

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            if (state.isVariantSelected && state.variantValue) {
                let updatedProducts = state.products;

                //find index of the selected item from our global state
                let foundIndex = findIndexOfSelectedProduct(updatedProducts, action.item.id);
                let productVariants = updatedProducts.items[foundIndex].options;
                let variant = getSelectedVariant(action.item, state.variantValue);

                if (variant[0].quantity > 0) {

                    //find index of the selected option of the selected product
                    let optionsIndex = findIndexofSelectedOption(updatedProducts, foundIndex, state.variantValue)
                    let selectedOption = getSelectedOption(updatedProducts, foundIndex, optionsIndex);
                    selectedOption.quantity = selectedOption.quantity > 0 ? selectedOption.quantity - 1 : 0;

                    let quantity = productVariants.map(item => item.quantity);
                    let areAllVariantsOutOfStock = (quantity.every(item => item === 0));

                    if ((selectedOption.quantity === 0) && areAllVariantsOutOfStock) {
                        //update the available key if all the products are out of stock
                        updatedProducts.items[foundIndex].available = !areAllVariantsOutOfStock
                    }
                    if (selectedOption.quantity !== null) {
                        action.item.color = state.variantValue;
                        action.item.selectedIndex = optionsIndex;
                        let newBasket = getNewBasket(state.basket, action.item);

                        return {
                            ...state,
                            basket: newBasket,
                            isVariantSelected: false,
                            variantValue: null,
                            products: { ...updatedProducts }
                        }
                    }
                } else {
                    //if quantity of all the variants is equal to 0, set available to false
                    let quantity = productVariants.map(item => item.quantity);
                    //update the product avaiability to false if all the items in the quantity array are equal to 0
                    updatedProducts.items[foundIndex].available = !(quantity.every(item => item === 0));

                    return {
                        ...state,
                        products: { ...updatedProducts }
                    }
                }
            } else {
                return { ...state }
            }
            break;

        case 'REMOVE_FROM_CART':
            let newBasket = [...state.basket];
            let modifiedProducts = { ...state.products }
            const index = state.basket.findIndex((basketItem) =>
                basketItem.color === action.item.color);
            if (index >= 0) {
                //remove the selected item from basket
                newBasket.splice(index, 1);
                //add the quantity removed from cart to products stock
                let filteredProducts = modifiedProducts.items.filter(item => item.id === action.item.id)
                let selectedVariant = filteredProducts[0].options.filter(item => item.color === action.item.color)
                selectedVariant[0].quantity += action.item.quantity
            }
            return { ...state, basket: newBasket, products: modifiedProducts }

        case 'CLEAR_CART':
            return { ...state, basket: [] };

        case 'DECREMENT_COUNTER':
            let updatedProducts = { ...state.products }
            let updatedBasket = [...state.basket]
            //get the selected product
            let product = getProductById(updatedProducts, action.item.id)
            //get the selected variant
            let selectedVariant = getSelectedVariant(product[0], action.item.color)[0]
            if (action.item.quantity > 0) {
                selectedVariant.quantity += 1 //increment the stock by 1
                //find the selected variant in the temp basket
                let filteredVariant = updatedBasket.filter(item => item.color === selectedVariant.color)
                //update its quantity
                filteredVariant[0].quantity -= 1

                if (filteredVariant[0].quantity === 0) {
                    //remove the item from basket
                    return {
                        ...state,
                        basket: [...updatedBasket.filter(i => i.color !== filteredVariant[0].color)],
                        products: { ...updatedProducts }
                    }
                }
                return {
                    ...state,
                    basket: [...updatedBasket],
                    products: { ...updatedProducts }
                }
            } else {
                return { ...state }
            }

        case 'INCREMENT_COUNTER':
            let tempProducts = { ...state.products }
            let tempBasket = [...state.basket]

            //get the selected product
            let prod = getProductById(tempProducts, action.item.id)
            //get the selected variant
            let selectedOption = getSelectedVariant(prod[0], action.item.color)[0]

            if (selectedOption && selectedOption.quantity > 0) {
                selectedOption.quantity -= 1 //decrement the stock by 1
                //find the selected variant in the temp basket
                let filteredVariant = tempBasket.filter(item => item.color === selectedOption.color)
                //update its quantity
                filteredVariant[0].quantity += 1
                return {
                    ...state,
                    basket: [...tempBasket],
                    products: { ...tempProducts }
                }
            } else {
                return { ...state }
            }

        case "FILTER_PRODUCT_BY_NAME":
            let filteredProduct = state.products.items.filter(
                (product) => { return product.name.toLowerCase().indexOf(action.value) !== -1 }
            )
            let finalObject = { "items": [...filteredProduct] }
            return {
                ...state,
                isSearchActive: !!action.value.length > 0 || false,
                foundProducts: finalObject
            };

        case "SELECT_VARIANT":
            debugger
            return {
                ...state,
                isVariantSelected: !!action.value.length > 0 || false,
                variantValue: action.value.length > 0 ? action.value : ''
            }

        default:
            return state;
    }
}

export default reducer;
