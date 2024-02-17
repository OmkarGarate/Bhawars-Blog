import React from 'react'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import bgImg1 from '../Images/bgImg.png';
import profile from '../Images/profileImg.png'

export default function DashboardInner() {
    const [blogs, setBlogs]=useState(null)
    const [users, setUsers]=useState(null)

    useEffect(() => {
        const fetchBlogs = async ()=>{
        const response = await fetch("/blogs");
            const json = await response.json()

            if(response.ok){
                setBlogs(json)
            }
        }
            fetchBlogs()
      
        
    }, [])
    // console.log(blogs)

    useEffect(() => {
        const fetchUsers = async ()=>{
        const response = await fetch("/users");
            const json = await response.json()

            if(response.ok){
                setUsers(json)
            }
        }
        fetchUsers()
      
        
    }, [])
    // console.log(users)

  return (
    <div className='dsh-inner'>
            
        <div className="dshTop">
        <Link to={'/'} className="bth">Back to home</Link>
        <h1>Dashboard</h1>
        </div>

        
        <img src={bgImg1} alt="bgImg1" className="bgImg1" />
        <div className="dsh-bu">
            
            <div className="blogs bu">
                <h2>Blogs</h2>
                <div className="all_blogs">
                        {blogs && blogs.map((blog)=>(
                        <Link className="blog_cont" key={blog._id} to={`/admin/blog/${blog._id}`}>
                                <img src={`http://localhost:3000/uploads/${blog.contentImage}`} alt="" />
                                <div className="ltDesc">
                                <i>{blog.category}</i>
                                <div className="ltHead">{blog.contentHead}</div>
                                <div className="ltd content-short2">{blog.contentDesc}</div>
                            </div>
                        </Link> 
                        ))}
                </div>
            </div>
            <div className="users bu">
                <h2>
                    Users
                </h2>
                <div className="all_blogs">
                        {users && users.map((user)=>(
                        <div className="blog_cont user_cont" key={user._id} >
                                <img src={profile} alt="profile" className='profileImg'/>
                                <div className="ltDesc uiDesc">
                                 <i>{user.email}</i>
                                 <p style={{color: user.userType === 'Admin' ? 'red':'#00ff00'}}>{user.userType}</p>
                                </div>
                        </div> 
                        ))}
                </div>
            </div>
        </div>
    </div>
  )
}
