import React, { memo, useRef } from 'react'
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { cartListAction } from "@/store/cart/actionCreaters";


import { useHistory } from "react-router-dom";

import './style.css'

import {
  CheckCircleOutline
} from "antd-mobile-icons";

import { SwipeAction } from 'antd-mobile'

const CartGoodsList = memo((props) => {
  const { cartList } = useSelector((state) => ({
    cartList: JSON.parse(JSON.stringify(state.cart.cartList)),
  }),shallowEqual);
  const dispatch = useDispatch();

  const history = useHistory()
  const backDetail = (id)=>{
    if (id) {
      history.push('/detail/'+id)
    }
  }

  const selectShop = (name)=>{
    const cartIndex = cartList.findIndex(list => list.name === name)
    cartList[cartIndex].isSelect = !cartList[cartIndex].isSelect
    cartList[cartIndex].goodsList.forEach(item=>{
      item.isSelect = cartList[cartIndex].isSelect
    })
    dispatch(cartListAction(cartList))
  }

  const selectGoods = (item,isSelect)=>{
    if (isSelect) {
      const shopIndex = cartList.findIndex(list => list.name === item.shop)
      const cartIndex = cartList[shopIndex].goodsList.findIndex(list => list.id === item.id)
      cartList[shopIndex].goodsList[cartIndex].isSelect = !cartList[shopIndex].goodsList[cartIndex].isSelect//修改商品选中状态
      dispatch(cartListAction(cartList))//更新state中的cartList
    }
  }
  const actionRef =useRef(null)
  const subGoods = (item)=>{
    const shopIndex = cartList.findIndex(list => list.name === item.shop)
    const cartIndex = cartList[shopIndex].goodsList.findIndex(list => list.id === item.id)
    cartList[shopIndex].goodsList.splice(cartIndex,1)//删除对应的商品
    if (cartList[shopIndex].goodsList.length===0) {
      cartList.splice(shopIndex,1)//删除购物车中商店商品数量为0时删除该商店
    }
    dispatch(cartListAction(cartList))//更新state中的cartList
    actionRef.current?.close()
  }
  const rightActions = [
    {
      key: 'delete',
      text: '删除',
      color: 'danger',
      onClick: async (e) => {
        // await Dialog.confirm({
        //   content: '确定要删除该商品？',
        // })
        // actionRef.current?.close()
      },
    },
  ]
  return (
    <div>
      <div className='cart-list'>
        {cartList.map((list,index)=>{
          return (
            <div key={list.name} className='cart-item'>
              <div className='cart-shop'>
                <div onClick={e=>selectShop(list.name)} className={"shopselect " + (list.isSelect?"active":"")}>
                  <CheckCircleOutline fontSize={24}/>
                </div>
                <img src={list.logo} alt='店铺图片'/>
                {list.name}
              </div>
              {list.goodsList.map((item,indey)=>{
                return (
                  <SwipeAction key={item.id} ref={actionRef} rightActions={rightActions} closeOnAction={false} onAction={e=>subGoods(item)}>
                    <div className='cart-message' key={item.title}>
                      <div className={"cart-select-button " + (list.isSelect&&item.isSelect?"active":"")} onClick={e=>selectGoods(item,list.isSelect)}>
                        <CheckCircleOutline fontSize={24}/>
                      </div>
                      <div className='cart-img' onClick={e=>backDetail(item.id)}>
                        <img src={item.image} alt='商品图片'/>
                      </div>
                      <div className='cart-info'>
                        <div className='cart-info-title'>{item.title}</div>
                        <div className='cart-info-desc'>{item.desc}</div>
                        <div className='cart-info-style'>{item.style}</div>
                        <div className='cart-info-price'>
                          <span>{item.price}</span>
                          <span>￥{item.realPrice}</span>
                          <span>×{item.amount}</span>
                        </div>
                      </div>
                    </div>
                  </SwipeAction>
                )})}
            </div>
          )
        })}
      </div>
    </div>
  )
})

export default CartGoodsList