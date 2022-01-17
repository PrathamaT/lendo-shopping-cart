import React from 'react';
import './ProductDescription.css';
import { useStateValue } from './StateProvider';

const ProductDescription = ({ product }) => {
    // eslint-disable-next-line no-empty-pattern
    const [{ }, dispatch] = useStateValue();

    const addToBasketHandler = () => {
        dispatch({
            type: 'ADD_TO_CART',
            item: { ...product }
        })
    }

    const onClickHandler = (e) => {
        debugger
        dispatch({
            type: 'SELECT_VARIANT',
            value: e.target.value
        })
    }
    return (
        <div className="prodDesc">
            <h1 className="prodDesc__title">{product.name}</h1>
            <div className="prodDesc__data">
                <p><strong>Brand: </strong><small>{product.brand}</small></p>
                <p><strong>Weight: </strong><small>{product.weight}</small></p>
                <h4 className="prodDesc__sectionHeading">Select color</h4>
                <div className="prodDesc__options">{product.options.map((item) => (
                    <button
                        key={item.color}
                        type="button"
                        onClick={onClickHandler}
                        value={item.color}
                        disabled={item.quantity > 0 ? false : true}
                        className="prodDesc__variantButton">{item.color}
                    </button>
                ))}
                </div>
            </div>

            <p className="prodDesc__price">
                <small>SEK</small>
                <strong>{product.price}</strong>
            </p>
            <p>
                <button
                    onClick={addToBasketHandler}
                    disabled={product.available === true ? false : true}
                    className="prodDesc__addToBasket">Add to basket
                </button>
                {product.available === false ?
                    <p className="prodDesc__itemOutOfStock">Item is out of stock.Please try again after some time.</p>
                    : ''}
            </p>


        </div>
    )
}

export default ProductDescription
