import React from 'react';

const Cart = (props) => {
    console.log(props.cart);
    const cart = props.cart;
    const total = cart.reduce( (total, prd) => total + prd.price,0 );
    let shipping = 0;
    if (total > 35) {
        shipping = 0;
    }else if(total > 15){
        shipping = 4.99;
    }else if(total > 0){
        shipping = 15;
    }

    const convertNumber = (num) => {
       const precession = num.toFixed(2);
       return Number(precession);
    }
    const tax = convertNumber(total / 10);
    const grandTotal = convertNumber(total + shipping + tax);

    return (
        <div>
            <h2>Order Summery</h2>
            <p>Items ordered: {cart.length}</p>
            <p>Product Price: {convertNumber(total)}</p>
            <p><small>Shipping Cost: {shipping}</small></p>
            <p><small>Tax + VAT: {tax}</small></p>
            <p>Total: {grandTotal}</p>

        </div>
    );
};

export default Cart;