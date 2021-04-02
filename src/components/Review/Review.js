import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = () => {
    const [cart, setCart] = useState([]);

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
            </div>

            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Review;