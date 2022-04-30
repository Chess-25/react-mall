import React, { memo, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { cartListAction } from "./store/actionCreaters";

import { getDetail, Goods, getRecommend } from "@/services/detail";
import Select from "@/components/select"
import Swiper from '@/components/swiper';
import DetailBass from './cpns/detailBass';
import DetailComment from './cpns/detailComment';
import DetailShop from './cpns/detailShop';
import DetailParam from './cpns/detailParam';
import DetailGoods from './cpns/detailGoods';
import GoodList from "@/components/goodsList";
import Toast from '@/components/toast';
import DetailBottomBar from './cpns/detailBottomBar';

import './style.css'

import {
  LeftOutline,
} from "antd-mobile-icons";


const Detail = memo((props) => {

  const backSlot = <div className='back' onClick={e=>backClick()}><LeftOutline/></div>
  const history = useHistory()
  const backClick = ()=>{
    history.goBack()
  }
  
  //跳转到相应位置
  let [selectIndex,setSelectIndex] = useState(0)
  const typeClick = (index)=>{
    setSelectIndex(index)
    switch (index) {
      case 1:
        document.body.scrollTop = document.documentElement.scrollTop = commentRef.current.offsetTop-44
        break;
      case 2:
        document.body.scrollTop = document.documentElement.scrollTop = detailRef.current.offsetTop-44
        break;
      case 3:
        document.body.scrollTop = document.documentElement.scrollTop = recommendRef.current.offsetTop-50
        break;
      default:
        document.body.scrollTop = document.documentElement.scrollTop = 0
        break;
    }
  }

  const commentRef = useRef()
  const detailRef = useRef()
  const recommendRef = useRef()
 
  //监听滚动
  const listenScoll = ()=>{
    if (window.scrollY<=commentRef.current.offsetTop-50) {
      setSelectIndex(0)
    }else if(window.scrollY<detailRef.current.offsetTop-50){
      setSelectIndex(1)
    }else if(window.scrollY<recommendRef.current.offsetTop-56){
      setSelectIndex(2)
    }
    else{
      setSelectIndex(3)
    }
  }
  useEffect(()=>{
    window.addEventListener("scroll",listenScoll)
    return()=>{
      window.removeEventListener("scroll",listenScoll)
    }
  },[])
  //获取详情数据
  const goodsId = props.match.params.id
  let [banners,setBanners]=useState([''])
  let [goodsInfo,setGoodsInfo] = useState({})
  let [commentInfo,setCommentInfo] = useState({})
  let [shopInfo,setShopInfo] = useState({})
  let [paramInfo,setParamInfo] = useState({})
  let [detailInfo,setDetailInfo] = useState({})
  let [recommends,setRecommends] = useState([])
  useEffect(()=>{
    getDetail(goodsId).then((res) => {
      const data = res.result
      setBanners(data.itemInfo.topImages)
      //创建商品对象
      setGoodsInfo(new Goods(data.itemInfo,data.columns,data.shopInfo.services))
      //提取评论信息
      if(data.rate.cRate !==0){
        //因为服务器只返回了一条信息 所以暂时只取第一个
        setCommentInfo(data.rate.list[0])
      }
      //取出店铺信息
      setShopInfo(data.shopInfo)
      //提取参数信息
      setParamInfo(data.itemParams)
      //取出商品展示信息
      setDetailInfo(data.detailInfo)
    })
    //请求推荐信息
    getRecommend().then(res =>{
      setRecommends(res.data.list)
    })
  },[])// eslint-disable-line
  //添加购物车列表
  const { cartList} = useSelector((state) => ({
    cartList: state.cart.cartList,
  }),shallowEqual);
  const dispatch = useDispatch();
  //添加购物车提示
  const [toast,setToast] = useState(null)
  const addCart = (amount)=>{
    let cartGoods = {
      //购物车商品对象
      shop:shopInfo.name,
      id:goodsId,
      title:goodsInfo.title,
      amount:amount,
      price:goodsInfo.price,
      realPrice:goodsInfo.realPrice,
      image:banners[0],
      style:commentInfo.style,
      desc:detailInfo.desc,
      isSelect:true,
    }
    let shopGoods = {name:shopInfo.name,logo:shopInfo.shopLogo,isSelect:true,goodsList:[]}
    //判断购物车中是否已存在该商店
    const shopIndex = cartList.findIndex(item => item.name === cartGoods.shop)
    if (shopIndex===-1) {
      shopGoods.goodsList.push(cartGoods)
      cartList.push(shopGoods)
      setToast('添加购物车成功')
    }else {
      //判断购物车中是否已存在该商品
      const cartIndex = cartList[shopIndex].goodsList.findIndex(item => item.id === goodsId);
      if (cartIndex ===-1) {
        cartList[shopIndex].goodsList.push(cartGoods)
        setToast('添加购物车成功')
      }else{
        cartList[shopIndex].goodsList[cartIndex].amount = amount
        setToast('购物车中该商品数量变成'+amount)
      }
    }
    dispatch(cartListAction(cartList));
    setTimeout(()=>{
      setToast(null)
    },3000)
  }
  return (
    <div>
      <div className="detail-select">
        <Select typeClick={index => typeClick(index)} titles={['商品', '评论', '详情','推荐']} backSlot={backSlot} selectIndex={selectIndex}/>
      </div>
      <div className='detail-content'>
        <Swiper banners={banners} swiperStyle={{height:'300px',with:'100%',overflow:'hidden'}}/>
        <DetailBass goodsInfo={goodsInfo}/>
        <div ref={commentRef}>
          <DetailComment commentInfo={commentInfo}/>
        </div>
        <DetailShop shopInfo={shopInfo}/>
        <DetailParam paramInfo={paramInfo}/>
        <div ref={detailRef}>
          <DetailGoods detailInfo={detailInfo}/>
        </div>
        <div ref={recommendRef} className='recommends'>
          <GoodList goodsList={recommends} imgHeight={{height:'200px',width: '100%'}}/>
        </div>
        {toast&&<Toast toast={toast}/>}
        <DetailBottomBar 
        addCart={amount=>addCart(amount)} 
        shop={shopInfo.name} image={banners[0]} goodsId={goodsId} price={goodsInfo.realPrice}/>
      </div>
    </div>
  );
});

export default Detail;