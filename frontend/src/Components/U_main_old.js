import React,{useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import TopNav from './TopNav'
// import '../css/user.css'
import '../css/footer.css'
import "../css/frontend.css"
import "../css/lph.css";
// import "../css/umainmq.css"
import searchIcon from '../Images/search.png'
import BlogPage from './BlogPage'
import FnP from './FnP'
import BlogSlider from './BlogSlider'
import RandomRead from './RandomRead'
import BFooter from './BFooter'
import { useAuthContext } from '../hooks/useAuthContext';

function U_main() {
  const [blogs, setBlogs]=useState(null)
  const [searchQuery, setSearchQuery] = useState('');
  const [seStyle, setSeStyle] = useState({
    'height':'0'
  })
  const { user } = useAuthContext();

    useEffect(() => {
        const fetchBlogs = async ()=>{
        const response = await fetch("/blogs")
            const json = await response.json()

            if(response.ok){
                setBlogs(json)
            }
        }
          fetchBlogs()  
    }, [])
    console.log(searchQuery)
  

    const filteredItems = Array.isArray(blogs) ? blogs.filter((item) =>
    searchQuery === '' || !item.blogHead ? false : item.blogHead.toLowerCase().includes(searchQuery.toLowerCase())
) : [];

console.log(filteredItems)
    
const handleSearch = (e) => {
  setSearchQuery(e.target.value);
  setSeStyle({
    height: "max-content"
  })
};
return (
  <div className='u_Main'>
    <TopNav/>
    <div className="search_comp">
      <h1>From the new gen Experts</h1>
      <i>Get the best of engineering experience at one place!</i>
      <div className="searchbar">
        <img src={searchIcon} alt="searchIcon" />
        <input type="text" placeholder='Search by any keyword!' value={searchQuery || ''}
          onChange={handleSearch}/>
      </div>
      <ul className='searchedEle' style={seStyle}>
        {filteredItems.map((item) => (
          <Link key={item?._id} to={`/user/blog/${item?._id}`}>
            <li>
              {item?.blogHead}
            </li>
          </Link>
        ))}
      </ul>
    </div>
    {/* <div className="blogPage"> */}
      {/* <BlogPage/> */}
      <FnP/>
      <BlogSlider/>
      <RandomRead/>
      <BFooter/>
    {/* </div> */}
  </div>
);

}

export default U_main