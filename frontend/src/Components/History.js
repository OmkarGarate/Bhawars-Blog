// import React from 'react'
import React, { useState } from "react";
import { Link } from "react-router-dom";
import sampleimg from "../Images/sampleimg.jpg";
import tri_latest_g from "../Images/tri_latest_g.png";
import fire_f from "../Images/fire_f.png";
import fire_b from "../Images/fire_b.png";
import history from "../Images/history.png";
import history_b from "../Images/history_b.png";
import tri_latest from "../Images/tri_latest.png";
import rgt_arrow_btn from "../Images/rgt_arrow_btn.png";
import left_arrow_btn from "../Images/left_arrow_btn.png";
import Featured from "./Featured";
// import star_f from "../Images/star_f.png";

function Lph() {
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

  const handleLatestUp = (e) => {
    if (e === "latest") {
      setLtStyle({
        "backgroundColor": "#2EF04C",
        "box-shadow": "0px 0px 10px #2EF04C",
        border: "1px solid #2EF04C",
        image: tri_latest,
      });
      setPopStyle({
        "backgroundColor": "transparent",
        border: "1px solid #FF9D00",
        "box-shadow": "none",
        image: fire_f,
      });
      setHisStyle({
        "backgroundColor": "transparent",
        border: "1px solid #9A9A9A",
        "box-shadow": "none",
        color: "white",
        image: history,
      });
    } else if (e === "popular") {
      setPopStyle({
        "backgroundColor": "#FF9D00",
        "box-shadow": "0px 0px 10px #FF9D00",
        border: "1px solid #FF9D00",
        color: "white",
        image: fire_b,
      });
      setLtStyle({
        "backgroundColor": "transparent",
        "box-shadow": "none",
        color: "white",
        border: "1px solid #2EF04C",
        image: tri_latest_g,
      });
      setHisStyle({
        "backgroundColor": "transparent",
        border: "1px solid #9A9A9A",
        "box-shadow": "none",
        color: "white",
        image: history,
      });
    } else if (e === "history") {
      setPopStyle({
        "backgroundColor": "transparent",
        border: "1px solid #FF9D00",
        "box-shadow": "none",
        image: fire_f,
      });
      setLtStyle({
        "backgroundColor": "transparent",
        "box-shadow": "none",
        color: "white",
        border: "1px solid #2EF04C",
        image: tri_latest_g,
      });
      setHisStyle({
        "backgroundColor": "#9A9A9A",
        border: "1px solid #9A9A9A",
        "box-shadow": "0px 0px 10px #9A9A9A",
        image: history_b,
      });
    }
  };

  const images = [
    sampleimg,
    sampleimg,
    sampleimg,
    sampleimg,
    sampleimg,
    sampleimg,
    sampleimg,
    sampleimg,
  ];

  const [slide, setSlide] = useState({
    transform: "translateX(0px)",
  });
  const [n, setN] = useState(1);
  var k = 1;

  const events = [];
  for (var i = 0; i < 10; i++) {
    events.push({
      name: "Live event" + (i + 1),
      img: images[k],
    });
    if (k === 7) {
      k = 0;
    } else {
      k++;
    }
  }

  const chunkSize = 2; // Set the number of events per row

  // Create an array of arrays, each containing chunkSize events
  const groupedEvents = Array.from(
    { length: Math.ceil(events.length / chunkSize) },
    (v, i) => events.slice(i * chunkSize, i * chunkSize + chunkSize)
  );
  

  const goToPrev = () => {
    const windowWidth = window.innerWidth;
    let trs = 0;
    let slideWidth = 0;
  
    // if (windowWidth === 320) {
    //   slideWidth = 340;
    // } else if (windowWidth === 375) {
    //   slideWidth = 385;
    // } else if (windowWidth === 426) {
    //   slideWidth = 400;
    // } else if (windowWidth >= 768) {
    //   slideWidth = 640;
    // }

switch (windowWidth) {
  case 320:
    slideWidth = 340;
    break;
  case 375:
    slideWidth = 385;
    break;
  case 426:
    slideWidth = 400;
    break;
  default:
    if (windowWidth >= 768) {
      slideWidth = 640;
    }
    break;
}

  
    trs = n === 1 ? 0 : (n - 2) * -slideWidth;
  
    setN(n === 1 ? 1 : n - 1);
  
    setSlide({
      transform: `translateX(${trs}px)`,
    });
  };
  
  const goToNext = () => {
    const windowWidth = window.innerWidth;
    console.log(windowWidth)
    let trs = 0;
    let slideWidth = 0;
  
    // if (windowWidth === 320) {
    //   slideWidth = 340;
    // } else if (windowWidth === 375) {
    //   slideWidth = 385;
    // } else if (windowWidth === 426) {
    //   slideWidth = 400;
    // } else if (windowWidth >= 768) {
    //   slideWidth = 640;
    // }


switch (windowWidth) {
  case 320:
    slideWidth = 340;
    break;
  case 375:
    slideWidth = 385;
    break;
  case 426:
    slideWidth = 400;
    break;
  default:
    if (windowWidth >= 768) {
      slideWidth = 640;
    }
    break;
}

    trs = n === Math.ceil(events.length / 3) ? (Math.ceil(events.length / 3) - 1) * -slideWidth : n * -slideWidth;
  
    setN(
      n === Math.ceil(events.length / 3) ? Math.ceil(events.length / 3) : n + 1
    );
  
    setSlide({
      transform: `translateX(${trs}px)`,
    });
  };
  

  console.log(n);
  console.log(Math.ceil(events.length / 5));
  return (
    <>
      <div className="lph lphNew">
        <div className="hrt"></div>
        <div className="me">
          {/* <h1 className="l-head">
          <strong>Event</strong> Listing
        </h1> */}
          <ul className="me-ev">
            <li style={ltStyle} onClick={() => handleLatestUp("latest")}>
              <div className="triangle_latest">
                <img src={ltStyle.image} alt="" />
              </div>
              <Link
                to={"/"}
                style={{
                  color: ltStyle.color === "white" ? "#2EF04C" : "#1B3C6E",
                }}
              >
                Latest Up
              </Link>

              {/* <div className="underline"></div> */}
            </li>
            <li style={popStyle} onClick={() => handleLatestUp("popular")}>
              <img src={popStyle.image} alt="" />
              <Link
                to={"/"}
                style={{
                  color: popStyle.color === "white" ? "#1B3C6E" : "#FF9D00",
                }}
              >
                Popular
              </Link>
              {/* <div className="underline" style={{width: "100%"}}></div> */}
            </li>
            <li style={hisStyle} onClick={() => handleLatestUp("history")}>
              <img src={hisStyle.image} alt="" />
              <Link
                to={"/"}
                style={{
                  color: hisStyle.color === "white" ? "#9A9A9A" : "#1B3C6E",
                }}
              >
                History
              </Link>
              {/* <div className="underline"></div> */}
            </li>
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
        <div className="elWindow">
          <div className="elEvents" style={slide}>
            {groupedEvents.map((group, rowIndex) => (
              <div key={rowIndex} className="eventRow">
                {group.map((eve, index) => (
                  <div className="elEve" key={index}>
                    {/* <div className="featured"> */}
                    <div className="fContent">
                      <img src={sampleimg} alt="" />
                      <div className="fTheory">
                        <i>Office lifestyle</i>
                        <h1>
                          “New Office Design” trends to follow closely in 2021
                        </h1>
                        <p>
                          Pipetech is delighted to present this year, our list
                          of famous new office design ideas that should not be
                          missed in 2021…
                        </p>
                      </div>
                    </div>
                    {/* </div> */}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="elVr"></div>
      </div>
    </>
  );
}

export default Lph;
