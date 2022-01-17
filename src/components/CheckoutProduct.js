import React from 'react';
import './CheckoutProduct.css';
import { useStateValue } from './StateProvider';
import Counter from './Counter';


const CheckoutProduct = ({ item}) => {
    // eslint-disable-next-line no-empty-pattern
    const [{ }, dispatch] = useStateValue();
    const removeFromBasket = () => {
        dispatch({
            type: "REMOVE_FROM_CART",
            item: item
        })
    }
    return (
        <div className="checkoutProduct">
            <img src={item.image} alt="" />
            <div className="checkoutProduct__info">
                <p className="checkoutProduct__title">{item.name}</p>
                <p><small>Color: </small>{item.color}</p>
                <p><small>Quantity: </small>{item.quantity}</p>
                <p><small>SEK</small> <strong>{item.price}</strong></p>
                <Counter item={item}/>
                <button onClick={removeFromBasket} className="checkoutProduct__removeFromBasket">Remove from cart</button>
            </div>
        </div>
    )
}

export default CheckoutProduct
