// import React from 'react'
import React, { useState } from "react";
import bhawar_logo from "../Images/Login/Images/bhawar_logo.png";
import view_pass from "../Images/Login/Images/view_pass.png";
import hide_pass from "../Images/Login/Images/hide_pass.png";
import "../css/signin.css";
import sampleimg from "../Images/Login/Images/sampleimg.jpg";
import CountrySelector from "./CountrySelector";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useSignup from "../hooks/useSignup";
import '../css/createacmq.css';

function AdminSignup() {
    const [passInput, setPassInput] = useState('password')
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
          className="custom_radio"
        />
        <p>
          I have read and accepted the <span>Terms and condition.</span>
        </p>
      </label>
    );
  };
  
  const DoubleRadioButton = () => {
    const [isCheckedd, setIsCheckedd] = useState(false);
  
    const onClick = () => {
      setIsCheckedd(!isCheckedd);
    };
  
    return (
      <label onClick={onClick}>
        <input
          type="radio"
          name="doubleRadio"
          checked={isCheckedd}
          onChange={() => {}}
          className="custom_radio"
        />
        <p>
          The <span>BEPL</span> may keep me informed with personalized emails
          about products and services.
        </p>
      </label>
    );
  };
  const [isVisible, setIsVisible] = useState(false);

  const vClick = () => {
    setIsVisible(false);
    setPassInput("password")
  };

  const hClick = () => {
    setIsVisible(true);
    setPassInput("text")
  };

  const [email, setEmail] = useState('')
  const [firstName, setFName] = useState('')
  const [lastName, setLName] = useState('')
  const [password, setPassword] = useState('')
  const [userType, setUserType] = useState('Admin')
  const [secretKey, setSecretKey] = useState(null)
  const [likes, setLikes] = useState({})
  const [conf, setConf] = useState("");
  
   

  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e)=>{
    e.preventDefault();
    
    await signup(email, firstName, lastName, password, userType, secretKey);

    if(!error){
      setConf("Successfully Registered!!")
    }

  }

  return (
    <>
      <div className="createAc">
        <div className="sil sill">
          <img src={bhawar_logo} alt="bhawar_logo" />
        </div>
        <div className="sir sirr">
          <img className="sirbgimg" src={sampleimg} alt="" />
          <form className="sif siff" onSubmit={handleSubmit}>
            <div className="fHeading">
              <h2>Create an account for Admin</h2>
            </div>
            <div className="fDesc fDescc">
              <span>Already Member?</span>
              <Link to={'/adminlogin'}>Sign in</Link>
            </div>
            {/* <div className="RadioBtns">
              <div><input type="radio" name="userType" value="User" onChange={(e)=>setUserType(e.target.value)}/>User</div>
              <div><input type="radio" name="userType" value="Admin" onChange={(e)=>setUserType(e.target.value)}/>Admin</div>
            </div> */}
            {userType==="Admin"?
              <div className="fEmail fEmaill">
                <input type="text" placeholder="Secret key" onChange={(e)=>setSecretKey(e.target.value)}/>
              </div> : null
            }
            <div className="fEmail fEmaill">
              <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="fEmail fEmaill">
              <input type="textl" placeholder="First name" onChange={(e)=>setFName(e.target.value)}/>
            </div>
            <div className="fEmail fEmaill">
              <input type="text" placeholder="Last name" onChange={(e)=>setLName(e.target.value)}/>
            </div>
            <div className="fPass fpasss">
              <input type={passInput} placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
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
            {/* <div className="fCountry">
              <p>Country/Region</p>
              <CountrySelector onCountryChange={setCountry}/>
            </div> */}
            <div className="fradiobtnhead">
              <p>By clicking Create account, I agree that:</p>
            </div>
            <div className="fRadioBtn1">
              <SingleRadioButton />
            </div>
            <div className="fRadioBtn1">
              <DoubleRadioButton />
            </div>
            <div className="fradiobtnhead">
              <p>
                See our <span>Privacy Policy</span> for more details or to
                opt-out at any time.
              </p>
            </div>
            <div className="fExpBtn fExpBtn1">
              <button>Create Account</button>
              {!error && error!= '' ?(<div className="success">{conf}</div>) : (<div className="error">{error}</div>) }
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminSignup;