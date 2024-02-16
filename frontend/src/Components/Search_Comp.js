import React from 'react'
import "../css/frontend.css"
import search from '../Images/search.png'

function Search_Comp() {
  return (
    <>
    <div className="search_comp">
        <h1>From the new gen experts</h1>
        <i>Get the best of engineering experience at one place!</i>
        <div className="searchbar">
            <img src={search} alt="" />
            <input type="text" placeholder='Search by any keyword!' />
        </div>
    </div>
    </>
  )
}

export default Search_Comp