import React, { useState } from "react";
import bgImg1 from "../Images/bgImg.png";
import bgImg2 from "../Images/bgImg2.png";
import { Link } from "react-router-dom";
import { useAuthContext } from '../hooks/useAuthContext';
import TopNav from "./TopNav";

function CreateBlog() {
  const [blogHead, setBlogHead] = useState("");
  const [contentHead, setContentHead] = useState("");
  const [contentDesc, setContentDesc] = useState("");
  const [category, setCategory] = useState("");
  const [contentImage, setContentImage] = useState(null);
  const [error, setError] = useState("");
  const { user } = useAuthContext();
  const [conf, setConf] = useState("");

  const categories = [
    { name: '2D Sol'},
    { name: 'As Built'},
    { name: 'Process Engineering'},
    { name: 'Model 3D'},
    { name: 'Corporate'},
    { name: 'Miscellaneous'},
    { name: 'Reverse Engineering'},
    { name: 'Analysis'},
    { name: 'Detailed Design' },
    { name: 'Office Life'},
  ];

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  // console.log(selectedCategory)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("category", selectedCategory.name);
    formData.append("blogHead", blogHead);
    formData.append("contentHead", contentHead);
    formData.append("contentDesc", contentDesc);
    formData.append("uploaded_file", contentImage);

    try {
      const response = await fetch("/blogs", {
        method: "POST",
        body: formData,
      });

      const json = await response.json();
      // console.log(json);

      if (!response.ok) {
        setError(json.error || "Failed to create blog post");
      } else {
        setBlogHead("");
        setContentHead("");
        setContentDesc("");
        setCategory("");
        setContentImage(null);
        setError(null);
      
        setConf("Successfully created a blog")
        // console.log("New blog added", json);
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      setError("Error during form submission. Please try again later.");
    }
  };

  return (
    <div className="createBlog">
      <TopNav/>
      <img src={bgImg1} alt="bgImg1" className="bgImg1" />
      <div className="createBlogInner">
        <Link to={'/dashboard'} className="bth">Back to home</Link>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          method="post"
        >
          {/* <input
            type="text"
            name="category"
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
          /> */}
          <div className="setCat">
          <label> Select Category</label>
            <select
              value={selectedCategory.name}
              onChange={(e) => {
                const selectedCategory = categories.find(cat => cat.name === e.target.value);
                setSelectedCategory(selectedCategory);
              }}
            >
              {categories.map(category => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
          </select>
          </div>

          <input
            type="text"
            name="blogHead"
            onChange={(e) => setBlogHead(e.target.value)}
            placeholder="Blog Head"
          />
          <div className="crBlogDesc">
            <input
              type="text"
              name="contentHead"
              onChange={(e) => setContentHead(e.target.value)}
              placeholder="Content Head"
            />
            <input
              type="text"
              name="contentDesc"
              onChange={(e) => setContentDesc(e.target.value)}
              placeholder="Description"
            />
            <input
              type="file"
              className="form-control-file"
              name="uploaded_file"
              onChange={(e) => setContentImage(e.target.files[0])}
            />
            <button type="submit" className="submit">Submit</button>
            {!error && error!= '' ?(<div className="success">{conf}</div>) : (<div className="error">{error}</div>) }
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateBlog;
