import React, { memo, useEffect, useState } from 'react'

import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { cartListAction } from "@/store/cart/actionCreaters";

import './style.css'

import {
  CheckCircleOutline
} from "antd-mobile-icons";

import Toast from '@/components/toast';

const CartBottomBar = memo((props) => {
  const { cartList } = useSelector((state) => ({
    cartList: JSON.parse(JSON.stringify(state.cart.cartList)),
  }),shallowEqual);
  let [totalPrice,setTotalPrice] = useState(0)
  //计算总价格
  const countTotal = ()=>{
    let total = 0
    cartList.forEach(list=>{
      if (list.isSelect) {
        list.goodsList.forEach(item=>{
          if (item.isSelect) {
            total += item.realPrice*item.amount.toFixed(2)
          }
        })
      }
    })
    setTotalPrice(total)
  }
  //改变全选状态
  const changeTotal = ()=>{
    let isTotal = false
    const cartIndex = cartList.findIndex(list => list.isSelect === false)
    if (cartIndex===-1) {
      for (const list of cartList) {
        const goodsIndex = list.goodsList.findIndex(item => item.isSelect === false)
        if (goodsIndex===-1) {
          isTotal = true
        }else{
          isTotal = false
          break
        }
      }
    }else{
      isTotal = false
    }
    setTotalSelect(isTotal)
  }
  let [totalSelect,setTotalSelect] = useState(true)
  const dispatch = useDispatch();
  //点击全选按钮
  const totalFn=()=>{
    if (cartList.length>0) {
      cartList.forEach(list=>{
        list.isSelect = !totalSelect
        list.goodsList.forEach(item=>{
          item.isSelect = !totalSelect
        })
      })
      setTotalSelect(!totalSelect)
    }
    dispatch(cartListAction(cartList))
  }
  const [toast,setToast] = useState({isShow:false,text:''})
  const calcClick = ()=>{
    if (totalPrice===0) {
      setToast({
        isShow:true,
        text:'请先选择商品',
      })
    }else{
      setToast({
        isShow:true,
        text:'支付金额: ￥'+totalPrice,
      })
    }
    setTimeout(()=>{
      setToast({isShow:false,text:''})
    },3000)
  }
  useEffect(()=>{
    //当cartList变化时全选按钮和总价格也要发生改变
    countTotal()
    changeTotal()
  },[cartList])// eslint-disable-line
  return (
    <div>
      {toast.isShow&&<Toast toast={toast.text}/>}
      <div className='cart-bottom-bar'>
        <div className={"totalselect " + (totalSelect?"active":"")} onClick={e=>totalFn()}>
          <CheckCircleOutline fontSize={24}/><div>全选</div>
        </div>
        <div className='total-price'>
          <span>合计：￥{totalPrice}</span>
        </div>
        <div className='calc' onClick={e=>calcClick()}>去结算</div>
      </div>
    </div>
  )
})

export default CartBottomBar