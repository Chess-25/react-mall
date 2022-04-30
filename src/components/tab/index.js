import React, { memo } from 'react';
import "./style.css"
const Tab = memo((props) => {

  const {leftSlot,centerSlot,rightSlot} = props

  return (
    <div className='tab'>
      {leftSlot}
      {centerSlot}
      {rightSlot}
    </div>
  );
});

export default Tab;