import React, { memo, useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";

import "./style.css";

import {
  AppOutline,
  UnorderedListOutline,
  PayCircleOutline,
  UserOutline,
} from "antd-mobile-icons";

export default memo(function Nav() {

  const navList = [
    { title: "首页", path: "/main/home", icon: <AppOutline fontSize={20}/> },
    { title: "分类", path: "/main/category", icon: <UnorderedListOutline fontSize={20}/> },
    { title: "购物车", path: "/main/cart", icon: <PayCircleOutline fontSize={20}/> },
    { title: "我的", path: "/main/profile", icon: <UserOutline fontSize={20}/> },
  ];
  let [navIndex,setNavIndex] = useState(0)

  const history = useHistory()
  const location = useLocation()
  const goClick = (path,index)=>{
    if (location.pathname!==path) {
      history.push(path)
      setNavIndex(index)
    }
  }
  useEffect(()=>{
    switch (location.pathname) {
      case "/main/category":
        setNavIndex(1)
        break;
      case "/main/cart":
        setNavIndex(2)
        break;
      case "/main/profile":
        setNavIndex(3)
        break;
      default:
        setNavIndex(0)
        break;
    }
  },[navIndex,location])
  return (
    <div>
      <div className="nav">
        {navList.map((item, index) => {
          return (
            <div onClick={()=>goClick(item.path,index)} className={"nav-item " + (navIndex===index?"active":"")} key={index}>
              <div>
                <div>{item.icon}</div>
                <div>{item.title}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
