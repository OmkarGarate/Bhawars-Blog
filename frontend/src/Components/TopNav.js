import React from 'react';
import logo from '../Images/logo.png';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout'
import { useNavigate } from 'react-router-dom'

function TopNav() {
  const {logout} = useLogout()
  const { user } = useAuthContext();
  const navigate = useNavigate()

  const handleClick = () => {
    logout();
    localStorage.removeItem("user"); // Remove the user item from localStorage
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };
  

  {user?console.log(user.user.email): console.log("hellow")}
  
  return (
    <div className='topNav'>
        <img src={logo} alt="logo" className='logo'/>
        {user ? ( <div className="snr">
        <p>{user.user.email}</p>
        <button className="logout" onClick={handleClick}>
            Log out
            </button>
        </div>) : (<Link to={'/register'} className='sinr'>SignIn/Register</Link>)}
        
    </div>
  );
}

export default TopNav;
