import React from 'react';
import './checkout-item.styles.scss';

import { connect } from 'react-redux';

import { addItem } from '../../redux/cart/cart.actions';
import { removeItem } from '../../redux/cart/cart.actions';
import { clearItemFromCart } from '../../redux/cart/cart.actions';

const CheckoutItem = ({cartItem, addItem, removeItem, clearItem}) => {
    const {name, imageUrl, price, quantity} = cartItem;
    return (    
        <div className='checkout-item'>
            <div className='image-container'>
                <img src={imageUrl} alt='item'/>
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <span className='arrow' onClick={()=>removeItem(cartItem)}>&#10094;</span>
                <span className='value'>{quantity}</span>
                <span className='arrow' onClick={()=>addItem(cartItem)}>&#10095;</span>
            </span>
            <span className='price'>{price}</span>
            <span className='remove-button' onClick={()=>clearItem(cartItem)}>&#10005;</span>
        </div>
    );
}


const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item)),
    removeItem: item => dispatch(removeItem(item)),
    clearItem: item => dispatch(clearItemFromCart(item))
});

export default connect(null, mapDispatchToProps)(CheckoutItem);