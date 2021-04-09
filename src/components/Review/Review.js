import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [placeOrder, setPlaceOrder] = useState(false);

    const handlePlaceOrder = () => {
        setCart([]);
        setPlaceOrder(true);
        processOrder();
    }

    useEffect( () => {
        const cartProducts = getDatabaseCart();
        const productKeys = Object.keys(cartProducts);
        const products = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = cartProducts[key];
            return product;
        });
        setCart(products);
    }, []);

    const removeProduct = (productKey) => {
        const product = cart.filter(pd => pd.key !== productKey);
        setCart(product);
        removeFromDatabaseCart(productKey);
    }
    let thankyouImage;
    if (placeOrder) {
        thankyouImage = <img src={happyImage} alt=""/>;
    }

    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItem 
                    product={pd}
                    key={pd.key}
                    removeProduct={removeProduct}
                    >

                    </ReviewItem>)
                }
                { thankyouImage }
            </div>

            <div className="cart-container">
                <Cart cart={cart}>
                <button onClick={handlePlaceOrder} className="addto-cart-btn btn btn-warning">Place Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;