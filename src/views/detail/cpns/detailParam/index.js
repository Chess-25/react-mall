import React, { memo } from 'react'

import './style.css'

const ParamInfo = memo((props) => {

  const {paramInfo} = props

  return (
    <div>
      {Object.keys(paramInfo).length !== 0&&<div className='param-info'>
        <table className='param-size'>
          <tbody>
            {/* 箭头函数省略return */}
            {paramInfo.rule.tables[0].map((tr,index) => <tr key={index}>
              {tr.map((td,indey) => <td key={indey}>{td}</td>)}
            </tr>)}
          </tbody>
        </table>
        <table className='info-param'>
          <tbody>
            {/* 箭头函数省略return */}
            {paramInfo.info.set.map((info,index)=><tr key={index}>
              <td className='info-param-key'>{info.key}</td>
              <td className='param-value'>{info.value}</td>
            </tr>)}
          </tbody>
        </table>
      </div>}
    </div>
  )
})

export default ParamInfo