import React, { useEffect, useState } from 'react';
import { Link, useLocation   } from "react-router-dom";
import sampleimg from "../Images/sampleimg.jpg";
import tri_latest_g from "../Images/tri_latest_g.png";
import fire_f from "../Images/fire_f.png";
import fire_b from "../Images/fire_b.png";
import history from "../Images/history.png";
import history_b from "../Images/history_b.png";
import tri_latest from "../Images/tri_latest.png";
import rgt_arrow_btn from "../Images/rgt_arrow_btn.png";
import left_arrow_btn from "../Images/left_arrow_btn.png";
import { useAuthContext } from '../hooks/useAuthContext';

function Latest({cat}) {
    const [ltStyle, setLtStyle] = useState({
        "backgroundColor": "#2EF04C",
        "box-shadow": "0px 0px 10px #2EF04C",
        border: "1px solid #2EF04C",
        color: "#2EF04C",
        image: tri_latest,
      });
      const [popStyle, setPopStyle] = useState({
        "backgroundColor": "transparent",
        border: "1px solid #FF9D00",
        color: "#FF9D00",
        "box-shadow": "none",
        image: fire_f,
      });
      const [hisStyle, setHisStyle] = useState({
        "backgroundColor": "transparent",
        "box-shadow": "none",
        border: "1px solid #9A9A9A",
        color: "white",
        image: history,
      });

      const [blogs, setBlogs] = useState(null);
    const { user } = useAuthContext();
    const location = useLocation(); // This gives you the current path
console.log("Current URL path:", location.pathname);

const cats = [
  { cat: "2D Sol", pathP: '/popular', pathL: '/' },
  { cat: "As Built", pathP: '/asbuilt/popular', pathL: '/asbuilt' },
  { cat: "Process Engineering", pathP: '/procegg/popular', pathL: '/procegg' },
  { cat: "Model 3D", pathP: '/model3d/popular', pathL: '/model3d' },
  { cat: "Corporate", pathP: '/corp/popular', pathL: '/corp' },
  { cat: "Miscellaneous", pathP: '/misc/popular', pathL: '/misc' },
  { cat: "Reverse Engineering", pathP: '/reverse/popular', pathL: '/reverse' },
  { cat: "Analysis", pathP: '/analysis/popular', pathL: '/analysis' },
  { cat: "Detailed Design", pathP: '/detdes/popular', pathL: '/detdes' },
  { cat: "Office Life", pathP: '/officelife/popular', pathL: '/officelife' }
];


// Find the corresponding path for the given cat
const catPathP = cats.find(c => c.cat === cat)?.pathP || '';
const catPathL = cats.find(c => c.cat === cat)?.pathL || '';



    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch("/blogs");
                if (!response.ok) {
                    throw new Error('Failed to fetch blogs');
                }
                const fetchedBlogs = await response.json();
                const filteredBlogs = fetchedBlogs.filter(blog => blog.category === cat);
            setBlogs(Array.isArray(filteredBlogs) ? filteredBlogs : []);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };
        
        fetchBlogs();

    }, []);

    console.log(blogs);
    
      const [slide, setSlide] = useState({
        transform: "translateX(0px)",
      });
      const [n, setN] = useState(1);
      const chunkArray = (arr, size) => {
        return Array.from({ length: Math.ceil(arr.length / size) }, (_, index) =>
          arr.slice(index * size, index * size + size)
        );
      
      };
      const groupedEvents = blogs ? chunkArray(blogs, 2) : [];
const numberOfBlogs = blogs ? blogs.length : 0; // Check if blogs is not null before accessing its length

const goToPrev = () => {
    const trs = n === 1 ? 0 : (n - 1) * -640;
    setN(n === 1 ? 1 : n - 1);
    setSlide({
        transform: `translateX(${trs}px)`,
    });
};

const goToNext = () => {
    const trs =
        n === Math.ceil(numberOfBlogs / 2)
            ? (Math.ceil(numberOfBlogs / 2) - 1) * -640
            : n * -640;

    setN(
        n === Math.ceil(numberOfBlogs / 2) ? Math.ceil(numberOfBlogs / 2) : n + 1
    );

    setSlide({
        transform: `translateX(${trs}px)`,
    });
};

console.log(n);
console.log(Math.ceil(numberOfBlogs / 2));

  return (
    <>
    <div className="me">
          {/* <h1 className="l-head">
          <strong>Event</strong> Listing
        </h1> */}
          <ul className="me-ev">
          <Link
                to={catPathL}
                
              >
            <li style={ltStyle}>
              <div className="triangle_latest">
                <img src={ltStyle.image} alt="" />
              </div>
              <p style={{
                  color: ltStyle.color === "white" ? "#2EF04C" : "#1B3C6E",
                }}>
                  Latest Up
                </p>
                
              

              {/* <div className="underline"></div> */}
            </li>
            </Link>
            <Link
                to={catPathP}
              >
            <li style={popStyle}>
              <img src={popStyle.image} alt="" />
              <p
              style={{
                color: popStyle.color === "white" ? "#1B3C6E" : "#FF9D00",
              }}>
                Popular
              </p>
                
              
              {/* <div className="underline" style={{width: "100%"}}></div> */}
            </li>
            </Link>
            <Link
                to={'/history'}
              >
            <li style={hisStyle}>
              <img src={hisStyle.image} alt="" />
              <p
              style={{
                color: hisStyle.color === "white" ? "#9A9A9A" : "#1B3C6E",
              }}>
                History
              </p>
            </li>
            </Link>
          </ul>
          <div className="ELbtns">
            <button className="prev" onClick={goToPrev}>
              <img src={left_arrow_btn} alt="" />
            </button>
            <button className="next" onClick={goToNext}>
              <img src={rgt_arrow_btn} alt="" />
            </button>
          </div>
        </div>
    {blogs?(
        <div className="elWindow">
        <div className="elEvents" style={slide}>
          {groupedEvents.map((group, rowIndex) => (
            <div key={rowIndex} className="eventRow">
              {group.map((eve, index) => (
                <div className="elEve" key={index}>
                  {eve && (
                    <Link to={`/user/blog/${eve?._id}`} className="fContent">
                      <img src={`http://localhost:3000/uploads/${eve.contentImage}`} alt="" />
                      <div className="fTheory">
                        {/* <p>{cat}</p> */}
                        <i>{eve.category}</i>
                        <h1>{eve.blogHead}</h1>
                        <p>{eve.contentDesc}</p>
                      </div>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    ):(<p className='loading'>Loading....</p>)}
    </>
  )
}

export default Latest