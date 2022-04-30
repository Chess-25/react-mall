import React, { memo } from 'react'

import './style.css'

const DetailGoods = memo((props) => {
  const {detailInfo} = props
  return (
    <div>
      {Object.keys(detailInfo).length !==0&&<div className='goods-info'>
        <div className='info-desc clear-fix'>
          <div className='start'></div>
          <div className='desc'>{detailInfo.desc}</div>
          <div className='end'></div>
        </div>
        <div className='info-key'>{detailInfo.detailImage[0].key}</div>
        <div>
          {detailInfo.detailImage[0].list.map((item,index)=>{
            return(
              <img src={item} key={index} alt=''/>
            )
          })}
        </div>
      </div>}
    </div>
  )
})

export default DetailGoods