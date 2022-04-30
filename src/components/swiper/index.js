import React, { memo } from 'react';
import { Swiper } from "antd-mobile";
import "./style.css";

const index = memo((props) => {
  const {banners,swiperStyle} = props

  const items = banners.map((item, index) => (
    <Swiper.Item key={index}>
      <div style={swiperStyle} key={index}>
        <img className='img' src={item.image||item} alt="" />
      </div>
    </Swiper.Item>
  ));

  return (
    <div>
      <Swiper loop>{items}</Swiper>
    </div>
  );
});

export default index;
