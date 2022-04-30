import React, { memo } from 'react'

import './style.css'

const ShopInfo = memo((props) => {

  const {shopInfo} = props

  const sellCountFilter=(value)=>{
    let rselt =value;
    if(value > 10000){
      rselt = (rselt / 10000).toFixed(1) + '万'
    }
    return rselt
  }

  return (
    <div>
      {Object.keys(shopInfo).length !== 0&&<div className='shop-info'>
        <div className='shop-top'>
          <img src={shopInfo.shopLogo} alt=""/>
          <span>{shopInfo.name}</span>
        </div>
        <div className='shop-middle'>
          <div className='shop-middle-item shop-middle-left'>
            <div className='info-sells'>
              <div className='sells-count'>
                {sellCountFilter(shopInfo.cSells)}
              </div>
              <div className='sells-text'>总销量</div>
            </div>
            <div className='info-goods'>
              <div className='goods-count'>
                {shopInfo.cGoods}
              </div>
              <div className='goods-text'>全部宝贝</div>
            </div>
          </div>
          <div className='shop-middle-item shop-middle-right'>
            <div>
              {shopInfo.score.map((item,index)=>{
                return(
                  <div key={index} className='score-item'>
                    <span>{item.name}</span>
                    <span className='score'>{item.score}</span>
                    <span className='better'>{item.isBetter ? '高':'低'}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className='shop-bottom'>
          <div className='enter-shop'>
            进店逛逛
          </div>
        </div>
      </div>}
    </div>
  )
})

export default ShopInfo