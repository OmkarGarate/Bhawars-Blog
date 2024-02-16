import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Sidebar() {
  const [sdText, setSdText] = useState('2ds')
  const handleSdT = (e)=>{
    setSdText(e);
  }
  return (
    <>
    <div className="sidebar">
        <Link onClick={()=>handleSdT("2ds")} style={{color: sdText==="2ds"? "white": "#A1B5D5"}} to={'/'}>2D solution</Link>    
        <Link onClick={()=>handleSdT("asb")} style={{color: sdText==="asb"? "white": "#A1B5D5"}} to={'/asbuilt'}>As-Built</Link>    
        <Link onClick={()=>handleSdT("pre")} style={{color: sdText==="pre"? "white": "#A1B5D5"}} to={'/procegg'}>Process Engineering</Link>    
        <Link onClick={()=>handleSdT("3dm")} style={{color: sdText==="3dm"? "white": "#A1B5D5"}} to={'/model3d'}>3D Modelling</Link>    
        <Link onClick={()=>handleSdT("crp")} style={{color: sdText==="crp"? "white": "#A1B5D5"}} to={'/corp'}>Corporate</Link>    
        <Link onClick={()=>handleSdT("mis")} style={{color: sdText==="mis"? "white": "#A1B5D5"}} to={'/misc'}>Miscellaneous</Link>    
        <Link onClick={()=>handleSdT("rev")} style={{color: sdText==="rev"? "white": "#A1B5D5"}} to={'/reverse'}>Reverse</Link>    
        <Link onClick={()=>handleSdT("ana")} style={{color: sdText==="ana"? "white": "#A1B5D5"}} to={'/analysis'}>Analysis</Link>    
        <Link onClick={()=>handleSdT("dtd")} style={{color: sdText==="dtd"? "white": "#A1B5D5"}} to={'/detdes'}>Detailed Design</Link>    
        <Link onClick={()=>handleSdT("ofl")} style={{color: sdText==="ofl"? "white": "#A1B5D5"}} to={'/officelife'}>Office Lifestyle</Link>    
    </div>
    </>
  )
}

export default Sidebar