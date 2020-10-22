import React from 'react'
import ReactTimeAgo from 'react-time-ago'
 
export default function Timestamp({ date }) {
  return (
    <div>
      <ReactTimeAgo className='timestamp' date={date} locale="en-US" timeStyle="round-minute"/>
    </div>
  )
};