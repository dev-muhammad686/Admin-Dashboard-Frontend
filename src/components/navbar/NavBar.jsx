import React, { useState } from "react";
import "./navbar.scss";
import SearchIcon from "@mui/icons-material/Search";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const NavBar = () => {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const adminImg = admin?.img;

  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchIcon className="icon" />
        </div>

        <div className="items">
          <div className="item">
            <MessageIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <NotificationsIcon className="icon" />
            <div className="counter">1</div>
          </div>

          <div className="item" onClick={handleToggle}>
            {isDarkMode ? (
              <LightModeIcon className="icon" />
            ) : (
              <DarkModeIcon className="icon" />
            )}
          </div>

          <div className="item">
            <img src={adminImg} alt="profile" className="avatar" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
