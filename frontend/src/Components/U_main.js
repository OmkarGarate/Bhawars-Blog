import React from 'react'
import '../css/footer.css'
import "../css/frontend.css"
import "../css/lph.css";
import "../css/umainmq.css"
import TopNav from './TopNav'
import Search_Comp from './Search_Comp'
import FnP from './FnP'
import BlogSlider from './BlogSlider'
import RandomRead from './RandomRead'
import BFooter from './BFooter'

function U_Main() {
  return (
    <div className="u_Main">
        <TopNav/>
        <Search_Comp/>
        <FnP/>
        <BlogSlider/>
        <RandomRead/>
        <BFooter/>
    </div>
  )
}

export default U_Main