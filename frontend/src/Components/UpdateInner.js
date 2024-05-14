import React, { useEffect, useState } from "react";
import time from "../Images/time.png";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import '../css/updateInner.css'
import { useAuthContext } from "../hooks/useAuthContext";
import deleteImg from '../Images/delete.png'

export default function UpdateInner() {
  
  const {id} = useParams()
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null)
  const [blogHead, setBlogHead] = useState("");
  const [contentHead, setContentHead] = useState("");
  const [contentDesc, setContentDesc] = useState("");
  const [category, setCategory] = useState("");
  const [contentImage, setContentImage] = useState(null);
  const [error, setError] = useState(null)
  const [conf, setConf] = useState("");     
  const {user} = useAuthContext()
  const [featured, setFeatured] = useState('Feature')
  
//to fetch the data
    useEffect(() => {
        const fetchBlog = async ()=>{
        const response = await fetch(`http://localhost:5000/blogs/${id}`);
            const json = await response.json()

            if(response.ok){
                setBlog(json)
                setCategory(json.category)
                setBlogHead(json.blogHead)
                setContentHead(json.contentHead)
                setContentDesc(json.contentDesc)
                setContentImage(json.contentImage)
            }
        }

        if(user){
          fetchBlog()
      }
      
    }, [id, user])
    // console.log(blog)
    // var result=0.008*blog.description.split(" ").length;

//To update the data

const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("category", category);
    formData.append("blogHead", blogHead);
    formData.append("contentHead", contentHead);
    formData.append("contentDesc", contentDesc);
    formData.append("uploaded_file", contentImage);
  
    try {
      const response = await fetch(`http://localhost:5000/blogs/${id}`, {
        method: 'PATCH',
        body: formData
      });
  
      const json = await response.json();
  
      if (!response.ok) {
        setError(json.error || "Failed to update blog post");
      } else {
        setError(null);
        // console.log("Updated blog post", json);
        setConf("Successfully Updated a blog")
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      setError("Error during form submission. Please try again later.");
    }
  };
  

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // optional: adds smooth scrolling animation
    });}

//To delete the blog
const handleClick = async ()=>{
  if(!user){
    return
  }
  alert('Blog Deleted Successfully!!')
  const response = await fetch(`http://localhost:5000/blogs/${id}`, {
    method: 'DELETE'
  })

  navigate('/dashboard')
}

const handleFeatured = async () => {
    try {
      // Ensure that id is defined and contains the correct value
      
      // Make the POST request to set the blog as featured

      const formData = new FormData();
      formData.append("blogId", id);
      const response = await fetch(`http://localhost:5000/featured/${id}`, {
        method: "POST",
        body: formData
      });
  
      // Handle potential errors
      if (!response.ok) {
        throw new Error("Failed to set blog as featured");
      }
  
      // Parse the JSON response
      const json = await response.json();
  
      // Update state with the response data (if needed)
      setBlog(json);
      setCategory(json.category);
      setBlogHead(json.blogHead);
      setContentHead(json.contentHead);
      setContentDesc(json.contentDesc);
      setContentImage(json.contentImage);
      setFeatured('Featured');
  
      // Log the featured blog data
      // console.log("Featured blog:", json);
    } catch (error) {
      // Handle any errors that occur during the process
      console.error("Error setting blog as featured:", error);
    }
  };
  
  

  return (
    <div className="uNav blogInner">
      <div className="blogContent">
        <div className="blgDel">
          {/* <img src={pipewhite} alt="" /> */}
          <div className="lg-blog-btn">BLOG</div>
          <div className="dlf">
            <button className="submit" onClick={handleFeatured}>{featured}</button>
            <div className="del">
            <button className="delBlog" onClick={handleClick}>
                <img src={deleteImg} alt="deleteImg" />
            </button>
          </div>
          
          </div>
        </div>
        <div className="blog-content updateBlog">
          <Link to="/manageBlog" className="bth">
            Back to home
          </Link>
          
         {blog ? (
          // Render content when blog is not null
          
          <form onSubmit={handleSubmit} encType="multipart/form-data"
          method="post">
            <div className="blog-time">
              <img src={time} alt="" />
              <i>{0.008*blog.contentDesc.split(" ").length.toFixed(2)} min read</i>
            </div>
            <h3 className="blog-title">
            <input 
            type="text"
            onChange={(e)=>setCategory(e.target.value)}
            value={category}
            className="bcHead"
            />
            </h3>

            {/* <h3 className="blog-title">{blog.title}</h3> */}
            <h1 className="blog-heading">
            <input
            type="text"
            onChange={(e)=>setBlogHead(e.target.value)}
            value={blogHead}
            />
            </h1>
            <h2 className="blog-heading">
            <input
            type="text"
            onChange={(e)=>contentHead(e.target.value)}
            value={contentHead}
            />
            </h2>
            {blog && blog.contentImage && (
                <img src={`http://localhost:5000/uploads/${blog.contentImage}`} alt="" className='blogImg'/>
            )}

            <input
              type="file"
              className="form-control-file"
              name="uploaded_file"
              onChange={(e) => setContentImage(e.target.files[0])}
            />
            {/* <h1 className="blog-heading">{blog.contentHead}</h1> */}
            
            <div className="bc-inner">
              <div className="blog-sec">
                <div className="blog-img">
                  {/* <img src={blogImg} alt="content"/> */}
                </div>
                <div className="para">
                    <textarea
                        type="text"
                        onChange={(e)=>setContentDesc(e.target.value)}
                        value={contentDesc}
                        placeholder="Paragraph"
                        rows="10" cols="50"
                    ></textarea>
                </div>
                {/* <p>{blog.description}</p> */}
              </div>
              <div className="ub-btn">
              <button className="submit" onClick={scrollToTop}>Update</button>
              {!error && error!= '' ?(<div className="success">{conf}</div>) : (<div className="error">{error}</div>) }
              </div>
            </div>
            
          </form>
        ) : (
          // Render a loading state or placeholder when blog is still null
          <p>Loading...</p>
        )}
          {/* <RelatedTopic/> */}
          {/* <ExploreMore/> */}
        </div>
      </div>
    </div>
  );
}
