import React from 'react'
import { Link } from 'react-router-dom'
import plus from '../Images/plus2.png'

function BottomNav() {
  return (
    <div className='bottomNav'>
        <Link to={'/manageBlog'}>Manage Blogs</Link>
        <Link to={'/createblog'}><img src={plus} alt="plus" /></Link>
        <Link>Users</Link>
    </div>
  )
}

export default BottomNav