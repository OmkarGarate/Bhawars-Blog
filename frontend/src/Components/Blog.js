import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../css/blog.css';
import bgImg1 from '../Images/bgImg.png';
import bgImg2 from '../Images/bgImg2.png';
import like from '../Images/like.png';
import likedImg from '../Images/liked.png';
import triangle from '../Images/triangle.png';
import time from '../Images/time.png';  
import TopNav from './TopNav';
import { useAuthContext } from '../hooks/useAuthContext';
import '../css/umainmq.css'

function Blog({bth}) {
    const [blogs, setBlogs] = useState('');
    const [liked, setLiked] = useState(false);
    const { user } = useAuthContext();
    const [backToHome, setBackToHome] = useState('/');
    const [commentInput, setCommentInput] = useState('');
    const { id } = useParams();

    // Define fetchBlogs function
    const fetchBlogs = async () => {
        try {
            const response = await fetch(`http://localhost:5000/blogs/${id}`);
            const json = await response.json();

            if (response.ok) {
                setBlogs(json);
                // console.log(json.comments)
            }
        } catch (error) {
            console.error('Error fetching blog:', error);
        }
    };
    

    useEffect(() => {
            fetchBlogs();
        

        if (bth === "admin") {
            setBackToHome('/dashboard');
        }
    }, [id, bth]);
    console.log(user)

    useEffect(() => {
        if (blogs && user) {
            const likedUser = blogs.likes.some(like => like.toString() === user.user._id.toString());
            setLiked(likedUser ? false : true);
        }
    }, [blogs, user]);

    const handleLikeClick = async () => {
        try {
            const response = await fetch(`/blogs/${id}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ blogId: id, userId: user.user._id })
            });
            if (response.ok) {
                fetchBlogs();
                setLiked(liked ? false : true);
            } else {
                console.error('Failed to like blog');
            }
        } catch (error) {
            console.error('Error liking blog:', error);
        }
    };

    const handleCommentSubmit = async () => {
        try {
            const response = await fetch(`/blogs/${id}/comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ blogId: id, comment: commentInput }) // Send the comment content
            });
            if (response.ok) {
                // Refresh the blog data to display the newly added comment
                // console.log(response)
                fetchBlogs();
                setCommentInput(''); // Clear the comment input field after submission
            } else {
                console.error('Failed to add comment');
            }
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const calculateReadingTime = (content) => {
        const wordsPerMinute = 200;
        const wordCount = content.split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / wordsPerMinute);
        return readingTime;
    };

    const splitContentDesc = (content) => {
        const midpointIndex = Math.ceil(content.length / 4);
        let firstHalf = content.slice(0, midpointIndex);
        let secondHalf = content.slice(midpointIndex);
        const periodIndex = secondHalf.indexOf('.');
        if (periodIndex !== -1) {
            firstHalf += secondHalf.slice(0, periodIndex + 1);
            secondHalf = secondHalf.slice(periodIndex + 1);
        }
        return [firstHalf, secondHalf];
    };

    return (
        <div className="blog">
            <TopNav />
            <img src={bgImg1} alt="bgImg1" className="bgImg1" />
            <div className="blogInner">
                <Link to={backToHome} className="bth">
                    Back to home
                </Link>
                {blogs ? (
                    <div>
                        <p className="blogCat">{blogs.category}</p>
                        <h1>{blogs.blogHead}</h1>
                        <div className="bnt">
                            <i>By Bhawars</i>
                            <div className="timeToRead">
                                <img src={time} alt="time" />
                                <i>{calculateReadingTime(blogs.contentDesc)} min </i>
                            </div>
                        </div>
                        <div className="blogContent">
                            <div className="bcHead">{blogs.contentHead}</div>
                            <p>{splitContentDesc(blogs.contentDesc)[0]}</p>
                            <img src={`http://localhost:5000/uploads/${blogs.contentImage}`} alt="" />
                            <p>{splitContentDesc(blogs.contentDesc)[1]}</p>
                            <div className="reactions">
                                <div className="like">
                                    <img src={liked ? like : likedImg} alt="like" onClick={handleLikeClick} />
                                </div>
                                <div className="comment">
                                    <input
                                        type="text"
                                        placeholder="Comment your thoughts or ask a query"
                                        value={commentInput}
                                        onChange={(e) => setCommentInput(e.target.value)} // Update comment input state
                                    />
                                    <img src={triangle} alt="triangle" onClick={handleCommentSubmit} /> {/* Call handleCommentSubmit on click */}
                                </div>
                                {/* <p>{blogs.comments[0].username}</p> */}
                            </div>
                        </div>
                        <div className="likedCount">
                            <i>{blogs.likes.length} people liked this</i>
                        </div>
                        <div className="comments">
                            <h2>Comments:</h2>
                            {blogs.comments ? (
                                blogs.comments.map((c, index) => (
                                    <p key={index} className='cmt'>
                                        {c}
                                    </p>
                                ))
                            ) : (
                                "Loading..."
                            )}
                        </div>
                    </div>
                ) : (
                    <p>Loading....</p>
                )}
            </div>
            {!user? (
                <div className="blurBlog">
                <Link to={backToHome} className="bth">
                        Back to home
                    </Link>
                    Sign in to See Blog
                    <Link to={'/login'} className='sinr'>Sign In</Link>
                </div>
            ):(null)}
            
            <img src={bgImg2} alt="bgImg2" className="bgImg1 bgImg2" />
        </div>
    );
}



export default Blog;
