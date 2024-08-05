import React, { useContext } from 'react'
import cart from '../pictures/shopping-bag (1).png'
import fashion from '../pictures/fasion-logo-removebg-preview.png'
import { CartContext } from './context/CartContext';
import { useNavigate } from 'react-router-dom';
function Header() {
  const {state} = useContext(CartContext)
  const navigate = useNavigate();


 
  const handleNavigation =(navigation) =>{
    navigate(navigation)
  }
  return (
    <div className="header">
      <div onClick={()=>handleNavigation('/')}>
        <img src={fashion} className='logo' alt='logo' />
      </div>

      <div  onClick={()=>handleNavigation('/cart')}>
        <img src={cart} className="cart-img-icon" alt='cart' />
       {state.carts.length >0 && <div className='cart-length'>{state.carts.length}</div>}
      </div>
    </div>
  );
}

export default Header