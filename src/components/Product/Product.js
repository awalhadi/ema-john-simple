import React from 'react';
import "./Product..css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Product = (props) => {
    const {name, img, seller, price, stock, key} = props.product;
    // console.log(props);
    return (
        <div className="product">
            <div className="product-img">
                <img src={img} alt={name}/>
            </div>
            <div>
                <h4 className="text-primary"> <Link to={"/product/" + key}>{name}</Link> </h4>
                <p><small>by: {seller}</small></p>
                <h5>${price}</h5>
                <p><small>stock {stock} available order-soon</small></p>
                
                {props.showAddToCart === true &&
                    <button onClick={() => props.handleClick(props.product)} className="addto-cart-btn btn btn-warning"><FontAwesomeIcon icon={faShoppingCart} /> Add to cart</button>
                }
            </div>
        </div>
    );
};

export default Product;