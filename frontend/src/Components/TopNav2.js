import React from 'react'
import "../css/frontend.css"
import topnav_logo from '../Images/topnav_logo.png'

function TopNav() {
  return (
    <>
    <div className="topNav">
        <img src={topnav_logo} alt="" />
        <button>Sign in / Register</button>
    </div>
    </>
  )
}

export default TopNav