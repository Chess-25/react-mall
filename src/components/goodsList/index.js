import React, { memo } from 'react';

import { useHistory } from 'react-router-dom';

import "./style.css"

import {
  StarOutline
} from "antd-mobile-icons";

const GoodList = memo((props) => {
  const {goodsList,imgHeight} = props

  const history = useHistory()
  const goDetail = (id)=>{
    if (id) {//判断id是否为空
      history.push("/detail/"+id)
    }
  }
  return (
    <div>
      <div className='goods'>
        {
          goodsList.map((item,index)=>{
            return(
              <div className='goods-item' key={index} onClick={()=>goDetail(item.iid)}>
                <div className='goods-content'>
                  <div className="goods-img"><img style={imgHeight} src={item.image||item.show.img} alt=""/></div>
                  <div className='goods-title'>{ item.title }</div>
                  <div className='goods-price'>
                    <span>￥{ item.price }</span>
                    <span><StarOutline />{item.cfav}</span>
                  </div>
                  <div className='orgPrice'>{item.orgPrice}</div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
});

export default GoodList;