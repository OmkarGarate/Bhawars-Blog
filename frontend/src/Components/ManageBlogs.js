import React from 'react'
import TopNav from './TopNav'
import "../css/manageBlogs.css"
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react'
import ltBlog from "../Images/lt-blog.png";
import editIcon from "../Images/edit.png";
import deleteIcon from "../Images/delete.png"
import upArrow from '../Images/up-arrow.png'
import bgImg1 from '../Images/bgImg.png';
import bgImg2 from '../Images/bgImg2.png';
import { useAuthContext } from "../hooks/useAuthContext";

export default function ManageBlogs() {
    const [blogs, setBlogs]=useState(null)
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchBlogs = async ()=>{
        const response = await fetch("/blogs");
            const json = await response.json()

            if(response.ok){
                setBlogs(json)
            }
        }

        if(user){
            fetchBlogs()
        }
        
    }, [user])
    console.log(blogs)

    const scrollToTop = () =>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // optional: adds smooth scrolling animation
          });
    }
  return (
    <div className='dashboard'>
        
        <TopNav topLeft="Dashboard"/>
        <div className="dsh-inner di">
            <h1>Manage Blogs</h1>
            <img src={bgImg1} alt="bgImg1" className="bgImg1" />
            <div className="all_blogs mb_all">
            {blogs && blogs.map((blog)=>(
                <Link className="blog_cont mb_bc" key={blog._id} to={`/updateBlog/${blog._id}`}>
                        <img src={`http://localhost:3000/uploads/${blog.contentImage}`} alt="" />
                        <div className="ltDesc mb_desc">
                        <i>{blog.category}</i>
                        <div className="ltHead">{blog.contentHead}</div>
                        <div className="ltd content-short2">{blog.contentDesc}</div>
                        
                    </div>
                    {/* <div className="edit_btns">
                            <button><img src={editIcon} alt="" /></button>
                            <button><img src={deleteIcon} alt="" /></button>
                    </div> */}
                </Link> 
            ))}
                
            </div>
            <button onClick={scrollToTop} className='scrollToTop'><img src={upArrow} alt="upArrow" /></button>
            
        </div>
        <img src={bgImg2} alt="bgImg1" className="bgImg1 bgImg2" />
    </div>
  )
}
