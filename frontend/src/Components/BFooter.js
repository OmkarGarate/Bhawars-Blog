import React from 'react'
import footerimg from '../Images/footerimg.png';
import { AuthContext } from '../context/AuthContext';
import { useAuthContext } from '../hooks/useAuthContext';

function BFooter() {

    const {user} = useAuthContext()

    return (
        <div className='UfooterMain'>
            <div className="ftop">
            </div>
            <div className="footCon">
                <div className="fc fcs">
                    <div className="pipe-logo">
                        <img src={footerimg} alt="footerimg" />
                        {/* <div className="blog-btn">
                            BLOG
                        </div> */}
                    </div> 
                    <div className="border"></div>
                    <div className="nlew">
                        
                        <p>Newsletter every week</p>
                        {user?(
                            <label className="switch">
                            <input type="checkbox"/>
                            <span className="slider round"></span>
                        </label>
                        ):(
                            <div className="lct">
                            <button id='lct-btn'>Sign In</button>
                        </div>
                        )}
                        
                        
                        
                    </div>
                </div>
                <div className="footer_content">
                <div className="fc">
                    <h2>About</h2>
                    <a href="/">Bhawars</a>
                    <a href="/">Blog</a>
                </div>
                <div className="fc">
                    <h2>Community</h2>
                    <a href="/">Join the blog team</a>
                </div>
                <div className="fc">
                    <h2>Social</h2>
                    <a href="/">Instagram</a>
                    <a href="/">Facebook</a>
                </div>
                </div>
            </div>
        </div>
      )
}

export default BFooter