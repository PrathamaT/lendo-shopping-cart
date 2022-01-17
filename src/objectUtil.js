export const getBasketTotal = (basket) => (
    basket?.reduce((amount, item) => item.quantity * (parseInt(item.price)) + amount, 0)
);

export const getProductById = (products,id) => (
    products.items.filter(item=> {return item.id === id})
);

export const getSelectedVariant =( productSelected,variantValue)=>{
    return (
        productSelected.options.filter((variant)=> variant.color === variantValue)
    )
}

export const findIndexOfSelectedProduct=(products,productId)=>{
    return (
        products.items.findIndex((i) => i.id === productId)
    )
}

export const findIndexofSelectedOption=(product,foundIndex,variantValue)=>{
    return (
        product.items[foundIndex].options.findIndex(option => {
            return option.color === variantValue
          })
    )
}

export const getSelectedOption =(products,foundIndex,optionsIndex)=>{
    return(
        products.items[foundIndex].options[optionsIndex]
    )
}

export const getNewBasket=(basket,product)=>{
    //NOTE: The basket can have more than one items with the same id
    //Hence,get all the objects with the selected product's id
    let filteredBasket = basket.filter((item)=>item.id === product.id)
    let index=filteredBasket.map((item)=>  item.color ).indexOf(product.color)
     //check if the product id is already present in the basket
    if(index >= 0){
        //check if the selected variant is already present in the basket
        if(basket[index].color === product.color){
            //update the quantity of the existing product variant in the basket
            basket[index].quantity += 1
            return [...basket]
        }else{
            //Since this is a new product variant added to the basket, 
            //let the product quantity to 1
            product.quantity = 1
            return [...basket,product]
        }
    }else{
        product.quantity = 1
        return [...basket,product]  
    }
}