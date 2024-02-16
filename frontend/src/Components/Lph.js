// import React from 'react'
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

function Lph() {
  return (
    <>
      <div className="lph lphNew">
        <div className="hrt"></div>
        <Outlet/>
        <div className="elVr"></div>
      </div>
    </>
  );
}

export default Lph;
