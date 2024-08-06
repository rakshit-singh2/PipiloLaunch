import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import "./Navbar.css";
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { FaRocket, FaRegDotCircle } from 'react-icons/fa';
import { IoMdLock, IoIosInformationCircleOutline } from "react-icons/io";
import { MdOutlineMenuBook } from "react-icons/md";



const Navbar = () => {
function myFunction() {
  $(document).ready(function () {
  const hamburger = $(".hamburger");
  const navlink = $(".nav-link");
  const layerWindow = $(".layer-window");

  hamburger.on("click", function () {
    hamburger.toggleClass("active");
    if (hamburger.hasClass("active")) {
      layerWindow.css("display", "block");
      navlink.css("height", navlink.prop("scrollHeight") + "px");
    } else {
      layerWindow.css("display", "none");
      navlink.css("height", "0px");
    }
  });

  layerWindow.on("click", function () {
    hamburger.removeClass("active");
    layerWindow.css("display", "none");
    navlink.css("height", "0px");
  });
});
}
    return (
	

	<div className="container-fluids">
	
        <nav className="topnav navbar navbar-expand-lg navbar-dark bg-dark fixed-top mainmenu" id="myTopnav">
            
                <div className="collapse navbar-collapse" id="navbarNav">
                    <Link to="/" className="navbar-brand">
                        <img src="/logo.png" alt="Logo" className="d-inline-block align-text-top" style={{ width: '12rem'}} />
                    </Link>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            
                        </li>
                    </ul>
					
					
					
                    <DropdownButton className="dropdown" id="dropdown-basic-button" title={<><FaRocket className="text-xl" /> Launchpads</>}>
                        <Dropdown.Item href="/launchpads/launchpad">Create a launchpad</Dropdown.Item>
                        <Dropdown.Item href="/launchpads/fairlaunch">Create a fairlaunch</Dropdown.Item>
                        <Dropdown.Item href="/launchpads/launchpad-list">Launchpads List</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton className="dropbtn" id="dropdown-basic-button" title={
                        <>
                            <IoMdLock className="text-xl" /> Lock
                        </>
                    }>
                        <Dropdown.Item href="/lock/create">Create a Lock</Dropdown.Item>
                        <Dropdown.Item href="/lock/lock-list">Lock List</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton className="dropbtn" id="dropdown-basic-button" title={
                        <>
                            <FaRegDotCircle className="text-xl" /> Token
                        </>
                    }>
                        <Dropdown.Item href="/token">Create a Token</Dropdown.Item>
                    </DropdownButton>
                    <Button href="/kyc"><IoIosInformationCircleOutline /> KYC</Button>
                    <Button href="/documents"><MdOutlineMenuBook /> Documents</Button>
                </div>
                <div className="d-flex connectionbutton">
                    <ConnectButton />
                </div>
				
           
        </nav>
		 </div>
    );
};



export default Navbar;
