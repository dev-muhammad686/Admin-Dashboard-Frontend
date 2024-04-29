import React from 'react'
import './sidebar.scss'
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import HelpIcon from '@mui/icons-material/Help';
import { Link, useNavigate } from 'react-router-dom';

const SideBar = () => {

  const navigate = useNavigate()

  // const SignOut = () => {
  //   return new Promise((resolve) => {
  //     localStorage.removeItem("admin");
  //     setTimeout(() => {
  //       resolve();
  //     }, 0);
  //   });
  // };

  // const handleSignOut = async ()=>{
  //   // await SignOut();
  //   localStorage.removeItem("admin");
  //   navigate('/login')
  // }

  return (
    <div className='sidebar'>

      <div className='top'> 

      <Link to="/" style={{textDecoration:"none", textAlign:"center"}}> 
      <img src='images/college-logo.png' alt='logo' className='logo'/>  
      <span className='name'>Information Management System</span>
      </Link>

      </div>

      <hr/>

      <div className='center'>

        <ul>
        <p className='title'>MAIN</p>

        <Link to="/" style={{textDecoration:"none"}}>
          <li>
          <DashboardIcon className='icon'/>
           <span>Dashboard</span> 
          </li>
          </Link>

          <Link to="/calender" style={{textDecoration:"none"}}> 
          <li>
          <CalendarMonthIcon className='icon'/>
          <span>Calender</span> 
          </li>
          </Link>

          <Link to="/appointments" style={{textDecoration:"none"}}>
          <li>
          <ContentPasteIcon className='icon'/>
          <span>Appointments</span>
          </li>
          </Link>

          <li>
          <SchoolIcon className='icon'/>
          <span>Tutors</span>
          </li>

          <li>
          <PeopleIcon className='icon'/>
          <span>Students</span>
          </li>

          <li>
          <LaptopChromebookIcon className='icon'/>
          <span>Services</span>
          </li>

          <li>
          <RequestQuoteIcon className='icon'/>
          <span>Finance</span>
          </li>
          
          <li>
          <SettingsIcon className='icon'/>
          <span>Settings</span>
          </li>

        </ul>

      </div>

      <div className='bottom'>

      <ul>
      <p className='title'>MORE OPTIONS</p>
        <li>
        <LogoutIcon className='icon'/>
          {/* <span onClick={handleSignOut}>Sign Out</span> */}
          <span>Sign Out</span>
        </li>
        <li>
        <HelpIcon className='icon'/>
          <span>Help</span>
        </li>
      </ul>

      </div>
      
    </div>
  )
}

export default SideBar