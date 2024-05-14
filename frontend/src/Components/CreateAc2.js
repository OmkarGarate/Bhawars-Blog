// import React from 'react'
import React, { useState } from "react";
import bhawar_logo from "../Images/bhawar_logo.png";
import view_pass from "../Images/view_pass.png";
import hide_pass from "../Images/hide_pass.png";
// import "../css/frontend.css";
import '../css/createacmq.css';
import sampleimg from "../Images/sampleimg.png";
import CountrySelector from "./CountrySelector";

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

function CreateAc2() {
  const [isVisible, setIsVisible] = useState(true);

  const vClick = () => {
    setIsVisible(false);
  };

  const hClick = () => {
    setIsVisible(true);
  };

  return (
    <>
      <div className="createAc">
        <div className="sil sill">
          <img src={bhawar_logo} alt="" />
        </div>
        <div className="sir sirr">
          <img className="sirbgimg" src={sampleimg} alt="" />
          <form className="sif siff">
            <div className="fHeading">
              <h2>Create an account</h2>
            </div>
            <div className="fDesc fDescc">
              <span>Already Member?</span>
              <p>Sign in</p>
            </div>
            <div className="RadioBtns">
              <div><input type="radio" name="userType" value="User"/>User</div>
              <div><input type="radio" name="userType" value="Admin"/>Admin</div>
            </div>
            <div className="fEmail fEmaill">
              <input type="email" placeholder="Email" />
            </div>
            <div className="fEmail fEmaill">
              <input type="textl" placeholder="First name" />
            </div>
            <div className="fEmail fEmaill">
              <input type="text" placeholder="Last name" />
            </div>
            <div className="fPass fpasss">
              <input type="password" placeholder="Password" />
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
              <CountrySelector />
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
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateAc2;
