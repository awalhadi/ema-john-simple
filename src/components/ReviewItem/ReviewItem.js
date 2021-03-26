import React from 'react';
import './ReviewItem.css';
const ReviewItem = (props) => {
    const {name,quantity }  = props.product;
    
    return (
        <div className="productItems">
            <h4 className="text-primary">{name}</h4>
            <p>Quantity:{quantity}</p>
            <button className="addto-cart-btn btn btn-warning">Remove Item</button>
        </div>
    );
};

export default ReviewItem;