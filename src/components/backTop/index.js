import React, { memo, useEffect, useState } from 'react'

import { UpCircleOutline } from "antd-mobile-icons";

import "./style.css"

const backTop = memo(() => {

  let [backShow,setBackShow] = useState(false)

  const backTop = ()=>{
    document.body.scrollTop = document.documentElement.scrollTop = 0
  }
  const listenScoll = ()=>{
    if (window.scrollY>1500) {
      setBackShow(true)
    }else{
      setBackShow(false)
    }
  }
  useEffect(()=>{
    window.addEventListener("scroll",listenScoll)
  },[])
   
  return (
    <div className='back-top' onClick={()=>backTop()}>{backShow&&<UpCircleOutline />}</div>
  )
})

export default backTop