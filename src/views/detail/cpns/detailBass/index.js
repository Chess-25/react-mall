import React, { memo } from 'react'

import './style.css'

const BassInfo = memo((props) => {
  const {goodsInfo} = props
  return (
    <div>
      {Object.keys(goodsInfo).length !== 0&&
      <div className='base-info'>
        <div className='info-title'>{goodsInfo.title}</div>
        <div className='info-price'>
          <span className='n-price'>{goodsInfo.price}</span>
          <span className='o-price'>{goodsInfo.oldPrice}</span>
          <span>{goodsInfo.discount&&goodsInfo.discount}</span>
        </div>
        <div className='info-other'>
          <span>{goodsInfo.columns[0]}</span>
          <span>{goodsInfo.columns[1]}</span>
          <span>{goodsInfo.columns[2]}</span>
        </div>
        <div className='info-service'>
          {goodsInfo.services.map((item,index)=>{
            return(
              index<3&&<span className='info-service-item' key={index}>
                <img src={item.icon} alt=""/>
                {item.name}
              </span>
            )
          })}
          <span className='info-service-item'></span>
        </div>
      </div>
    }
    </div>
  )
})

export default BassInfo