import React from 'react'
import TopNav from "./TopNav"
import { useEffect, useState } from 'react'
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from 'react-router-dom';
import profile from '../Images/profile.png'
import upArrow from '../Images/up-arrow.png'
import '../css/allusers.css'

const Users = () => {
    const [users, setUsers]=useState(null)
    console.log(users)
    const scrollToTop = () =>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // optional: adds smooth scrolling animation
          });
    }
  return (
    <div>
        <TopNav topLeft="Dashboard" />
    <div className="dsh-inner ua">
            <h1>All Users</h1>
            <div className="all_blogs mb_all allUsers">
            {users && users.map((user)=>(
                        <Link className="blog_cont allUser_cont " key={user._id} to={`/admin/blog/${user._id}`}>
                                <img src={profile} alt="profile" className='profileImg'/>
                                <div className="ltDesc uiDesc">
                                 {user.email}
                                </div>
                        </Link> 
                ))}
                
            </div>
            <button onClick={scrollToTop} className='scrollToTop'><img src={upArrow} alt="" /></button>
        </div>
    </div>
  )
}

export default Users