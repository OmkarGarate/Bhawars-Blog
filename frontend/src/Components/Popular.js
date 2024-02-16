import React, { useEffect, useState } from 'react';
import fire_f from '../Images/fire.png';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

function Popular() {
    const [blogs, setBlogs] = useState(null);
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch("/blogs");
                if (!response.ok) {
                    throw new Error('Failed to fetch blogs');
                }
                const fetchedBlogs = await response.json();
                // Sort blogs by likes in descending order
                const sortedBlogs = fetchedBlogs.sort((a, b) => b.likes.length - a.likes.length);
                // Get top 3 blogs
                const top3Blogs = sortedBlogs.slice(0, 3);
                setBlogs(top3Blogs);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
    }, []);

    console.log(blogs);

    return (
        <>
            <div className="popular">
                <div className="pHeading">
                    <img src={fire_f} alt="" />
                    <p>Popular</p>
                </div>
                <div className="pCont">
                    {blogs ? (
                        blogs.map((item) => (
                            <Link to={`/user/blog/${item._id}`} key={item._id}>
                                <ul className='pContent'>
                                    <li className='pImgs'><img src={`http://localhost:3000/uploads/${item.contentImage}`} alt="" /></li>
                                    <li className="pT">
                                        <i>{item.blogHead}</i>
                                        <h4>{item.contentDesc}</h4>
                                    </li>
                                </ul>
                            </Link>
                        ))
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default Popular;
