import React, { memo, useEffect, useState } from 'react'

import './style.css'

const LoadMore = memo((props) => {
  const {goodsPage} = props
  let [noLoad,setNoLoad] = useState(true)
  const loadClick = ()=>{
    const {loadMore} = props
    if (goodsPage<10) {
      loadMore()
    }
  }
  useEffect(()=>{
    if (goodsPage<10) {
      setNoLoad(true)
    }else{
      setNoLoad(false)
    }
  },[goodsPage])
  return (
    <div className='load-more'>
      <div onClick={e=>{loadClick()}}>
        {noLoad?'加载更多商品':'没有更多了'}
      </div>
    </div>
  )
})

export default LoadMore