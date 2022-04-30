import React, { memo, useEffect, useState } from "react";

import Tab from "@/components/tab";
import Swiper from "@/components/swiper";
import Select from "@/components/select";
import BackTop from "@/components/backTop";
import GoodList from "@/components/goodsList";
import LoadMore from "@/components/loadMore";
import "./style.css";
import { getMultidata, getGoodsData } from "@/services/home";

function Home(props) {
  let [banners, setBanners] = useState([{}]);
  useEffect(()=>{
    getMultidata().then((res) => {
      setBanners(res.data.banner.list);
    });
  },[])
  // let [goodsData,setGoodsData] = useState({
  //   pop: { page: 1, list: [] },
  //   new: { page: 1, list: [] },
  //   sell: { page: 1, list: [] },
  // })
  let [goodsData,setGoodsData] = useState([])
  let [goodsPage,setGoodsPage] = useState(1)
  let [goodsType,setGoodsType] = useState('pop')
  let [selectIndex,setSelectIndex] = useState(0)
  const typeClick = (index)=>{
    if (selectIndex!==index) {
      setGoodsData([])
      setSelectIndex(index)
      setGoodsPage(1)
    }
    switch (index) {
      case 1:
        setGoodsType('new')
        break;
      case 2:
        setGoodsType('sell')
        break;
      default:
        setGoodsType('pop')
        break;
    }
  }
  const GetGoodsData = (type,page)=>{
    getGoodsData(type,page).then((res) => {
      let goodsList = goodsData
      goodsList.push(...res.data.list)//将商品数据添加到展示列
      setGoodsData(goodsList)
      setGoodsPage(goodsPage+=1)
    });
  }

  const loadMore = ()=>{
    GetGoodsData(goodsType,goodsPage)
  }
  
  let [selectShow,setSelectShow] = useState(false)
  const listenScoll = ()=>{
    if (window.scrollY>=200) {
      setSelectShow(true)
    }else{
      setSelectShow(false)
    }
  }
  useEffect(()=>{
    window.addEventListener("scroll",listenScoll)
    return()=>{
      window.removeEventListener("scroll",listenScoll)
    }
  },[])
  useEffect(() => {
    GetGoodsData(goodsType,goodsPage)
  }, [goodsType]);// eslint-disable-line
  return (
    <div>
      <Tab centerSlot={'首页'}/>
      <div className="selectShow">
          {selectShow&&<Select typeClick={index => typeClick(index)} titles={['流行', '新款', '精选']} selectIndex={selectIndex}/>}
        </div>
      <div className="home-scroll">
        <Swiper banners={banners} swiperStyle={{height:'195px',with:'100%'}}></Swiper>
        <Select typeClick={index => typeClick(index)} titles={['流行', '新款', '精选']} selectIndex={selectIndex}/>
        <BackTop />
        <GoodList goodsList={goodsData} imgHeight={{height:'200px',width: '100%'}}/>
        <LoadMore loadMore={e=>loadMore(e)} goodsPage={goodsPage}/>
      </div>
    </div>
  );
}

export default memo(Home);
