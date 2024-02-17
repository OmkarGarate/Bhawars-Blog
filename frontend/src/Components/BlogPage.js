import React,{useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext';

function BlogPage() {
    const [blogs, setBlogs]=useState(null)
    const [likes, setLikes]=useState('')
    const {id} = useParams()
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchBlogs = async ()=>{
            const response = await fetch("/blogs")
            const json = await response.json()

            if(response.ok){
                setBlogs(json)
                // console.log(json.likes)
            }
        }
            fetchBlogs()
        
    }, [])
    
    // console.log(blogs)
  return (
    <div className='blogPage'>
        {blogs ? (
        blogs.map((item) => (
          
          <Link to={`/user/blog/${item._id}`} key={item._id}>
            <ul >
              <li>{item.title}</li>
              <li>{item.blogHead}</li>
              <li>{item.contentHead}</li>
              <li>{item.contentDesc}</li>
              <img src={`http://localhost:3000/uploads/${item.contentImage}`} alt="" />
              <li >{likes}</li>
            </ul>
          </Link>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default BlogPage;