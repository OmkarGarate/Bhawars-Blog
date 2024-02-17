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
import { useAuthContext } from '../hooks/useAuthContext';


function AdminLogin() {
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
          className="custom-radio"
        />
          Stay signed in
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
  const [password, setPassword] = useState('')
  const [userType, setUserType] = useState('User')
  const [secretKey, setSecretKey] = useState('')
  const [errorM, setErrorM] = useState('');
  const [conf, setConf] = useState("");
  const {loginUser, errorU, isLoadingU} = useLoginUser()
  const {loginAdmin, error, isLoading} = useLoginAdmin()
  const { user } = useAuthContext();
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // if (userType === "Admin") {
        await loginAdmin(email, password, secretKey);
        if (error === null && email && password && secretKey) {
          // console.log('Exploring in as an Admin', email, password, secretKey);
          setConf("Exploring In as an Admin");
          setErrorM(false)
          setTimeout(() => {
            navigate('/dashboard');
          }, 2000);
        } else if(!email || !password || !secretKey) {
          setErrorM('All Fields must be filled')
        }else{
            setErrorM(error)
            // console.log('Credentials not matching', error);
        }
    //   }
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
              <h2>Admin Sign in</h2>
            </div>
            <div className="fDesc">
              <span>New Member?</span><Link to={'/adminsignup'}> Create an account</Link>
            </div>
            {/* <div className="RadioBtns">
              <div><input type="radio" name="userType" value="Admin" onChange={(e)=>setUserType(e.target.value)}/>Admin</div>
            </div> */}
            {/* {userType==="Admin"? */}
              <div className="fEmail fEmaill">
                <input type="text" placeholder="Secret key" onChange={(e)=>setSecretKey(e.target.value)}/>
              </div> 
            {/* } */}
            <div className="fEmail">
              <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="fPass">
              <input type={passInput} placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
              <div className="fPassimg">
                {isVisible ? (
                  <img
                  className="view"
                  src={view_pass}
                  alt="view_pass"
                  onClick={vClick}
                />
                ) : (
                  <img
                  className="hide"
                  src={hide_pass}
                  alt="hide_pass"
                  onClick={hClick}
                />
                )}
              </div>
            </div>
            {/* <div className="fRadioBtn">
              <SingleRadioButton />
            </div> */}
            <div className="fExpBtn">
                <button>Let's explore</button>
                {!errorM!= '' ?(<div className="success">{conf}</div>) : (<div className="error">{errorM}</div>) }
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

export default AdminLogin;
