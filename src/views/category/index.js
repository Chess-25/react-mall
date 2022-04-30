import React, { memo, useEffect, useState } from 'react';

import { SearchBar } from 'antd-mobile'

import SideBar from '@/components/sideBar';
import Select from "@/components/select";
import GoodList from "@/components/goodsList";
import LoadMore from "@/components/loadMore";

import { getMultidata, getCategoryData } from "@/services/category";

import "./style.css"

export default memo(function Category(){

  const onSearch = (e)=>{
    console.log(e);
  }
  //获取侧边栏数据
  let [cateList,setCateList] = useState([])
  useEffect(()=>{
    getMultidata().then(res=>{
      setCateList(res.data.cateList.list)
    })
  },[])
  //选择商品分类
  let[cate,setCate] = useState('coat')
  const sideClick = (cateName)=>{
    if (cate!==cateName) {
      setGoodsData([])
      setCate(cateName)
      setGoodsPage(1)
    }
  }
  //选择商品类型
  let [goodsType,setGoodsType] = useState('pop')
  let [goodsPage,setGoodsPage] = useState(1)
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
  //获取商品数据
  let [goodsData,setGoodsData] = useState([])
  const GetCategoryData = (cate,type,page)=>{
    getCategoryData(cate,type,page).then(res=>{
      let goodsList = goodsData
      goodsList.push(...res.data.list)//将商品数据添加到展示列
      setGoodsData(goodsList)
      setGoodsPage(goodsPage+=1)
    }) 
  }
  const loadMore = ()=>{
    GetCategoryData(cate,goodsType,goodsPage)
  }
  useEffect(()=>{
    GetCategoryData(cate,goodsType,goodsPage)
  },[cate,goodsType])// eslint-disable-line
  return (
    <div className='cate'>
      <div className='cate-top'>
        <div className='cate-tab'>商品分类</div>
        <div className='search'>
          <SearchBar placeholder='请输入搜索内容' style={{ '--background': '#ffffff' }} onSearch={e => onSearch(e)}/>
        </div>
      </div>
      <div className='cate-content'>
        <div className='cate-side'><SideBar sideClick={cateName=>sideClick(cateName)} cateList={cateList}/></div>
        <div className='cate-select'>
          <Select typeClick={index => typeClick(index)} titles={['流行', '新款', '精选']} selectIndex={selectIndex}/>
          <div className='cate-goods'>
            <GoodList goodsList={goodsData} imgHeight={{height:'160px',width: '100%',}}/>
            <LoadMore loadMore={e=>loadMore(e)} goodsPage={goodsPage}/>
          </div>
        </div>
      </div>
    </div>
  );
});
