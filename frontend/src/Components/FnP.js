import React from 'react'
import Featured from './Featured'
import Popular from './Popular'
import bgImg from '../Images/bgImg.png'

function FnP() {
  return (
    <div className="fnp">
        <img src={bgImg} alt="" className='bgImg'/>
        <Featured/>
        <Popular/>
    </div>
  )
}

export default FnP