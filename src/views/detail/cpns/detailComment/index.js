import React, { memo } from 'react'

import './style.css'

import { formatDate } from "@/utils/utils";

const CommentInfo = memo((props) => {
  const {commentInfo} = props

  const showDate = (value)=>{
    let date = new Date(value * 1000);
    return formatDate(date, "yyyy-MM-dd hh:mm:ss");
  }

  return (
    <div>
      {Object.keys(commentInfo).length !== 0&&<div className='comment-info'>
        <div className='info-header'>用户评价</div>
        <div className='header-more'>更多<i className='arrow-right'></i></div>
        <div className='info-user'>
          <img src={commentInfo.user.avatar} alt="" />
          <span>{commentInfo.user.uname}</span>
        </div>
        <div className='info-detail'>
          <p>{ commentInfo.content }</p>
          <div className='info-other'>
            <span className='date'>{showDate(commentInfo.created)}</span>
            <span>{ commentInfo.style }</span>
          </div>
          {commentInfo.extraInfo&&<div className='info-extra'>
            {commentInfo.extraInfo.map((item,index)=>{
              return(
                <span key={index}>{item}</span>
              )
            })}
          </div>}
        </div>
      </div>}
      {Object.keys(commentInfo).length === 0&&<div className='comment-info' style={{color: 'red'}}>暂无用户评论</div>}
    </div>
  )
})

export default CommentInfo