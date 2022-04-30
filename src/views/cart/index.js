import React, { memo } from "react";

import './style.css'

import Tab from '@/components/tab'
import CartGoodsList from "./cpns/cartGoodsList";
import CartBottomBar from "./cpns/cartBottomBar";

const Cart = memo((props)=> {
  return (
    <div>
      <Tab centerSlot={'购物车'}/>
      <div className="cart-content">
        <CartGoodsList/>
      </div>
      <CartBottomBar/>
    </div>
  );
});

export default Cart;