import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import star_f from '../Images/star_f.png'
import sampleimg from '../Images/sampleimg.jpg';
import { useAuthContext } from '../hooks/useAuthContext';

function Featured() {
  const [blogs, setBlogs] = useState('');
    const [liked, setLiked] = useState(false);
    const { user } = useAuthContext();
    const [backToHome, setBackToHome] = useState('/');
    const [commentInput, setCommentInput] = useState('');
    const { id } = useParams();

    
    useEffect(() => {
      // Define fetchBlogs function
      const fetchBlogs = async () => {
        try {
            const response = await fetch(`/featured/blog`);
            const json = await response.json();

            if (response.ok) {
                setBlogs(json[0]);
                console.log("featuredComp: ",json)
            }
        } catch (error) {
            console.error('Error fetching blog:', error);
        }
    };

    fetchBlogs()
    }, [])
    
  
  return (
    <Link to={`/user/blog/${blogs._id}`} className="featured featuredd">
        <div className="fHeading">
            <img src={star_f} alt="" />
            <p>Featured</p>
        </div>
        <div className="fContent">
        <img src={`http://localhost:3000/uploads/${blogs.contentImage}`} alt="" className='blogImg'/>
            <div className="fTheory">
                <i>{blogs.category}</i>
                <h1>{blogs.blogHead}</h1>
                <p>{blogs.contentDesc}</p>
            </div>
        </div>
    </Link>
  )
}

export default Featured