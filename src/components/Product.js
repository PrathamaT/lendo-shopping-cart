import React from "react";
import "./Product.css";
import { Link } from "react-router-dom";

function Product({ product }) {

    return (
        
        <div className="product">
            <Link to={"/detail/"+product.id} className="product__link" state={{product:product}}>
            <div className="product__info">
                <p>{product.name}</p>
                <p className="product__price">
                    <small>SEK</small>
                    <strong>{product.price}</strong>
                </p>
            </div>
            <img src={product.image} alt={product.name} className="product__img"/>
            </Link>
        </div>
    )
}

export default Product
