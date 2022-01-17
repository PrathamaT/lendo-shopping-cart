import React from 'react';
import './ProductDetail.css';
import { useStateValue } from './StateProvider';
import { useParams } from 'react-router-dom';
import ProductDescription from './ProductDescription';

const ProductDetail = () => {
    const [{ products }] = useStateValue();
    let { id } = useParams();
    let foundItem = products.items.filter((i) => i.id === parseInt(id));

    return (
        <div className="productDetail">

            <div className="productDetail__left">
                <img src={foundItem[0].image} alt={foundItem[0].name} />
            </div>

            <div className="productDetail__right">
                <ProductDescription product={foundItem[0]}></ProductDescription>
            </div>

        </div>
    )
}

export default ProductDetail
