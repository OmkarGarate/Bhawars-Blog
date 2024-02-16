// import React from "react";
import React, { useState } from "react";
import bhawar_logo from "../Images/Login/Images/bhawar_logo.png";
import view_pass from "../Images/Login/Images/view_pass.png";
import hide_pass from "../Images/Login/Images/hide_pass.png";
import google_icon from "../Images/Login/Images/google_icon.png";
import facebook_icon from "../Images/Login/Images/facebook_icon.png";
import sampleimg from "../Images/Login/Images/sampleimg.jpg";
import "../css/signin.css"
import '../css/user.css'
import { Link, useNavigate } from "react-router-dom";
import {useLoginUser} from '../hooks/useLoginUser.js'
import {useLoginAdmin} from '../hooks/useLoginAdmin.js'



function SignIn() {

  const navigate = useNavigate();
  const SingleRadioButton = () => {
    const [isChecked, setIsChecked] = useState(false);
  
    const handleOnClick = () => {
      setIsChecked(!isChecked);
    };
  
    return (
      <label onClick={handleOnClick}>
        <input
          type="radio"
          name="singleRadio"
          checked={isChecked}
          onChange={() => {}}
          className="custom-radio"
        />
          Stay signed in
      </label>
    );
  };

  const [isVisible, setIsVisible] = useState(true);

  const vClick = () => {
    setIsVisible(false);
  };

  const hClick = () => {
    setIsVisible(true);
  };

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userType, setUserType] = useState('')
  const [secretKey, setSecretKey] = useState('')
  // const [error, setError] = useState("");
  const [conf, setConf] = useState("");
  const {loginUser, errorU, isLoadingU} = useLoginUser()
  const {loginAdmin, error, isLoading} = useLoginAdmin()

  const handleSubmit = async (e)=>{
    e.preventDefault();

    if(userType === "User")
    {
      
      try{
        await loginUser(email, password)
        console.log('Successfully Logged in as an User', email, password);
        
       
      }catch(err){
        console.log(err);
      }
      if(!errorU)
       {
        setConf("Successfully Logged In as an User")
          setTimeout(() => {
            navigate('/');
          }, 2000);
        }
       
      
      
    } else{
      // const userData = {email, password, secretKey};

      try{
        await loginAdmin(email, password, secretKey)
        console.log('Successfully Logged in as an Admin', email, password, secretKey);
        
       
      }catch(err){
        console.log(err);
      }
      if(!error)
      {
        setConf("Successfully Logged In as an Admin")
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      }
      
    }
  }

  return (
    <>
      <div className="signIn">
        <div className="sil">
          <img src={bhawar_logo} alt="" />
        </div>
        <div className="sir">
            <img className="sirbgimg" src={sampleimg} alt="" />
          <form className="sif" onSubmit={handleSubmit}>
          <div className="fHeading">
              <h2>Sign in</h2>
            </div>
            <div className="fDesc">
              <span>New Member?</span><Link to={'/register'}> Create an account</Link>
            </div>
            <div className="RadioBtns">
              <div><input type="radio" name="userType" value="User" onChange={(e)=>setUserType(e.target.value)}/>User</div>
              <div><input type="radio" name="userType" value="Admin" onChange={(e)=>setUserType(e.target.value)}/>Admin</div>
            </div>
            {userType==="Admin"?
              <div className="fEmail fEmaill">
                <input type="text" placeholder="Secret key" onChange={(e)=>setSecretKey(e.target.value)}/>
              </div> : null
            }
            <div className="fEmail">
              <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="fPass">
              <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
              <div className="fPassimg">
                {isVisible ? (
                  <img
                    className="view"
                    src={view_pass}
                    alt=""
                    onClick={vClick}
                  />
                ) : (
                  <img
                    className="hide"
                    src={hide_pass}
                    alt=""
                    onClick={hClick}
                  />
                )}
              </div>
            </div>
            <div className="fRadioBtn">
              <SingleRadioButton />
            </div>
            <div className="fExpBtn">
                <button>Let's explore</button>
                {!error!= '' ?(<div className="success">{conf}</div>) : (<div className="error">{error}</div>) }
            </div>
            <div className="fOrTxt">
                <p>Or you can</p>
            </div>
            <div className="fGFBtns">
                <button className="fbtns" >
                    <img src={google_icon} alt="" />
                    <p>Continue with Google</p>
                </button>
                <button className="fbtns ffbtn" >
                    <img src={facebook_icon} alt="" />
                    <p>Continue with Facebook</p>
                </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignIn;
