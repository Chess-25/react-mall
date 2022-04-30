import React, { memo } from 'react'

import './style.css'

const Toast = memo((props) => {

  const {toast} = props

  return (
    <div className='toast'>
      <div className='toast-content'>{toast}
      </div>
    </div>
  )
})

export default Toast