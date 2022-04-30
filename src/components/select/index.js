import React, { memo } from 'react';

import "./style.css"

const GoodSelect = memo((props) => {
  const {titles,backSlot,selectIndex} = props//从父组件获取数据
  const selectClick = (index)=>{
    const {typeClick} = props//从父组件获取方法
    typeClick(index)//调用父组件的方法
  }
  return (
    <div>
      <div className='select'>
        {backSlot}
        {
          titles.map((item,index)=>{
            return(
              <div key={item} 
                  className={"select-item " + (selectIndex===index?"active":"")} 
                  onClick={e=>selectClick(index)}>
                  <span>{item}</span>
              </div>
            )
          })
        }
      </div> 
    </div>
  );
});

export default GoodSelect;