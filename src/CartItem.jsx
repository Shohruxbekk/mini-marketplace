import React, { use } from 'react'
import { useState } from 'react'
import cart from './CartList.jsx'


const CartItem = ({ product, onRemove, onUpdateQty }) => {
  

   
    return (
        <div className='cartItem'>
            <div className='productInfo'>
                <div className='imgCounter'>
                    <img src={product.image} alt={product.title} />
                    <div className='counter'>
                        <button onClick={() => onUpdateQty(product.id, product.quantity - 1)}>-</button>
                        <p>{product.quantity}</p>
                        <button onClick={() => onUpdateQty(product.id, product.quantity + 1)}>+</button></div>
                </div>
                <div className='titlePrice'>
                    <div style={{display:"flex",
                        gap:"10px",
                        alignItems:"center"
                    }}><h1>{product.quantity}</h1>X<h1>{product.title}</h1></div>
                    <p>${product.price}</p>
                </div>
            </div>
            <div className='btnContainer'>

                <button onClick={()=>onRemove(product.id)} className='removeFromCart'>Remove from Cart</button>
            </div>
        </div>
    )
}

export default CartItem
