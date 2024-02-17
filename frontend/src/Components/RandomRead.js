import React, { useState, useEffect } from 'react';
import shuffle from '../Images/shuffle.png';
import sampleimg from '../Images/sampleimg.jpg';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';


function RandomRead() {
  const [blogs, setBlogs] = useState(null);
  const [data, setData] = useState('')
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch("/blogs");
                if (!response.ok) {
                    throw new Error('Failed to fetch blogs');
                }
                const fetchedBlogs = await response.json();
                // Get top 3 blogs
                setBlogs(fetchedBlogs);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };
        
        fetchBlogs();
    }, []);

    // // console.log(blogs);


  const handleShuffle = () => {
    const randomIndex = Math.floor(Math.random() * blogs.length);
    const randomData = blogs[randomIndex];
    setData(randomData);
  };
  // console.log("rd: ", data)

  return (
    <>
      <div className="rRHeading">
        <h1>Random Read</h1>
        <img src={shuffle} alt="shuffle" onClick={handleShuffle} />
      </div>
      <div className="rRContent">
        <div className="rrc">
          <div className="fContent">
            {data===''?(
              <div className="showRandom">Click to generate random blog</div>
            ):
              (<Link  to={`/user/blog/${data._id}`} className='fContent'>
                <img src={`http://localhost:3000/uploads/${data.contentImage}`} alt="contentImage" />
            <div className="fTheory">
              <i>{data.category}</i>
              <h1>{data.blogHead}</h1>
              <p>{data.contentDesc}</p>
            </div>
              </Link>)
            }
          
          </div>
        </div>
      </div>
    </>
  );
}

export default RandomRead;
