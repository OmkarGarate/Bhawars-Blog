import React from 'react'
import TopNav from "./TopNav"
import { useEffect, useState } from 'react'
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from 'react-router-dom';
import profile from '../Images/profile.png'
import upArrow from '../Images/up-arrow.png'
import '../css/allusers.css'

const AllUsers = () => {
    const [users, setUsers]=useState(null)
    const {user} = useAuthContext()
    const [uWidth, setUWidth] = useState({
        width: "0px"
    })
    useEffect(() => {
        const fetchBlogs = async ()=>{
        const response = await fetch("/users", {
            headers:{
                'Authorization': `Bearer ${user.token}`
            }
        });
            const json = await response.json()

            if(response.ok){
                setUsers(json)
            }
        }
        if(user){
            fetchBlogs()
        }
        
    }, [user])
    useEffect(()=>{
        setTimeout(() => {
            setUWidth({
                width: "100%"
            })
        }, 500);
    })
    // console.log(users)
    const scrollToTop = () =>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // optional: adds smooth scrolling animation
          });
    }
  return (
    <div className='dashboard'>
        <TopNav topLeft="Dashboard" />
    <div className="dsh-inner ua">
    <Link to={'/dashboard'} className="bth">Back to home</Link>
            <h1>All Users</h1>
            <div className="all_blogs mb_all allUsers">
            {users && users.map((user)=>(
                        <div className="blog_cont allUser_cont " key={user._id}>
                                <img src={profile} alt="profile" className='profileImg'/>
                                <div className="ltDesc uiDesc" style={uWidth}>
                                    {user.email}
                                    <p style={{color: user.userType === 'Admin' ? 'red':'#00ff00'}}>{user.userType}</p>
                                </div>
                        </div> 
                ))}
                
            </div>
            <button onClick={scrollToTop} className='scrollToTop'><img src={upArrow} alt="" /></button>
        </div>
    </div>
  )
}

export default AllUsers