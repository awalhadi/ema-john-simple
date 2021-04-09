import React, { useEffect, useState } from 'react';
import fakeData from "../../fakeData";
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import "./Shop.css";
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProduct] = useState(first10);
    const [cart, setCart] = useState([]);
    
    // load data fro local storage
    useEffect( () => {
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        const previousCart = productKeys.map(exsistingKey => {
            const product = fakeData.find(pd => pd.key === exsistingKey);
            product.quantity = saveCart[exsistingKey];
            return product;
        })
        console.log(previousCart);
        setCart(previousCart);
    }, [])
    const handleClick = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;

        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const otherProducts = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...otherProducts, sameProduct];
        }else{
            product.quantity = 1;
            newCart = [...cart, product];
        }

        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                products.map(pd => <Product 
                    product={pd}
                    handleClick={handleClick}
                    key={pd.key}
                    showAddToCart={true}
                    >
                    </Product>) 
                }
            </div>

            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;