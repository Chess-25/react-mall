import React, { memo, useState } from 'react'

import "./style.css"

const SideBar = memo((props) => {

  let {cateList} = props

  let [sideIndex,setSideIndex] = useState(0)
  const sideClick = (item,index)=>{
    const {sideClick} = props//从父组件获取方法
    setSideIndex(index)
    sideClick(item.cate)
  }

  return (
    <div className='side'>
      {
        cateList.map((item,index)=>{
          return (
            <div key={index} onClick={()=>sideClick(item,index)} className={"side-item " + (sideIndex===index?"active":"")}>
              <span>{item.title}</span>
            </div>
          )
        })
      }
    </div>
  )
})

export default SideBar