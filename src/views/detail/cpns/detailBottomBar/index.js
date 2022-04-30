import React, { memo, useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";

import "./style.css";

import {
  MessageOutline,
  PayCircleOutline,
  StarOutline,
  CloseOutline,
} from "antd-mobile-icons";

import { Popup } from 'antd-mobile'

const BottomBar = memo((props)=> {

  const navList = [
    { title: "客服", path: "/main/home", icon: <MessageOutline fontSize={22}/> },
    { title: "购物车", path: "/main/cart", icon: <PayCircleOutline fontSize={22}/> },
    { title: "收藏", path: "/main/profile", icon: <StarOutline fontSize={22}/> },
  ];
  let [navIndex,setNavIndex] = useState(0)

  const history = useHistory()
  const location = useLocation()
  const goClick = (path,index)=>{
    if (location.pathname!==path) {
      history.push(path)
      setNavIndex(index)
    }
  }
  useEffect(()=>{
    switch (location.pathname) {
      case "/main/category":
        setNavIndex(1)
        break;
      case "/main/cart":
        setNavIndex(2)
        break;
      case "/main/profile":
        setNavIndex(3)
        break;
      default:
        setNavIndex(0)
        break;
    }
  },[location])
  const {shop,goodsId,image,price} = props
  const [visible, setVisible] = useState(false)
  const popupClose = ()=>{
    setVisible(false)
  }
  let [amount,setAmount] = useState(1)
  const { cartList } = useSelector((state) => ({
    cartList: state.cart.cartList,
  }),shallowEqual);
  const shopIndex = cartList.findIndex(item => item.name === shop)
  let [addType,setAddType] = useState(null)
  const popupShow = (type)=>{
    setAddType(type)
    if (shopIndex!==-1) {
      let cartIndex = cartList[shopIndex].goodsList.findIndex(item => item.id === goodsId);
      if (cartIndex !==-1) {
        setAmount(cartList[shopIndex].goodsList[cartIndex].amount)
      }
    }
    setVisible(true)
  }
  const subAmount = ()=>{
    if (amount>1) {
      setAmount(amount-=1)
    }
  }
  const addAmount = ()=>{
    if (amount<10) {
      setAmount(amount+=1)
    }
  }
  const addCart =(amount)=>{
    const {addCart}=props
    addCart(amount)
    if (addType==='buy') {
      history.push('/main/cart')
    }
    setVisible(false)
  }
  return (
    <div className="detail-bar">
      <div className="detail-buy">
        <div className="buy-left">
          {navList.map((item, index) => {
            return (
              <div onClick={()=>goClick(item.path,index)} className={"left-item " + (navIndex===index?"active":"")} key={index}>
                <div>
                  <div>{item.icon}</div>
                  <div>{item.title}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="buy-right">
          <div className="add"  onClick={e=>popupShow('add')}>加入购物车</div>
          <div className="buy" onClick={e=>popupShow('buy')}>立即购买</div>
        </div>
      </div>
      <Popup visible={visible} bodyStyle={{ height: '50vh',borderTopLeftRadius: '8px',borderTopRightRadius: '8px'}}>
        <div className="popup">
          <div className="popup-top">
            <div className="popup-goods">
              <img src={image} alt=''/>
              <div className="popup-price">
                ￥<span>{price}</span>
                <div className="popup-inventory">剩余***件</div>
                <div style={{color:'#969799',fontSize:'12px'}}>请选择颜色</div>
              </div>
            </div>
            <div className="popup-close">
              <span onClick={e=>popupClose()}><CloseOutline fontSize={22} color='#c8c9cc'/></span>
            </div>
          </div>
          <div className="popup-middle">
            <div className="popup-color">颜色</div>
            <div className="popup-select-color">
              <div>默认</div>
              <div>蓝色</div>
            </div>
            <div className="popup-amount">
              <div>购买数量</div>
              <div className="popup-stepper">
                (限购10件)<div onClick={e=>subAmount()}>-</div><div>{amount}</div><div onClick={e=>addAmount()}>+</div>
              </div>
              
            </div>
          </div>
          <div className="popup-bottom">
          {addType==='add'&&<div className="popup-bottom-add"  onClick={e=>addCart(amount)}>加入购物车</div>}
          {addType==='buy'&&<div className="popup-bottom-buy"  onClick={e=>addCart(amount)}>立即购买</div>}
          </div>
        </div>
      </Popup>
    </div>
  )
})

export default BottomBar
