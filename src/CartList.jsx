import React, { useEffect } from 'react'
import { useState } from 'react'
import CartItem from './CartItem.jsx'



const CartList = () => {
    
    const [cartItems, setCartItems] = useState([]);
const syncCart = () => {
    const saved = localStorage.getItem('cart')
    if (!saved) return setCartItems([])
    try {
      const data = JSON.parse(saved)
      setCartItems(Array.isArray(data) ? data : [])
    } catch (e) {
      localStorage.removeItem('cart')
      setCartItems([])
    }
  }
        useEffect(() => {
    syncCart()
  }, [])
  
  useEffect(() => {
    window.addEventListener('storage', syncCart)
    return () => window.removeEventListener('storage', syncCart)
  }, [])
      useEffect(() => {
  
    localStorage.setItem('cart', JSON.stringify(cartItems))
  
}, [cartItems])
  
    const updateQuantity = (id, newQty) => {
    
    setCartItems(prev =>
      prev.map(item => item.id === id ? { ...item, quantity: newQty } : item)
    )
  }

const handleRemove = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
    localStorage.setItem('cart', JSON.stringify(cartItems.filter(item => item.id !== id)))
    
  }

   
    
    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className='cartList'>
            {cartItems.length === 0 && <h1>Your cart is empty</h1>}
            {cartItems.map(item => (
                
                <CartItem key={item.id} product={item} onRemove={handleRemove} onUpdateQty={updateQuantity} quantity={item.quantity} />))}
                {cartItems.length >0  && <div className='totalAmount'>
               

                <h2>Total: ${totalAmount.toFixed(2)}</h2></div>}
        </div>
    )
}

export default CartList
