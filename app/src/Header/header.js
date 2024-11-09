import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link,useMatch } from 'react-router-dom';
import { useState } from 'react'
import {PersonFill} from 'react-bootstrap-icons'
import './header.css'
import logo from '../images/BullForceLogo.png'
import slogon from '../images/BullForceLogoName.png'
const Header = () => {
    const dashboard=useMatch('/dashboard')
    const [showEmail, setShowEmail] = useState(false);
    const email = localStorage.getItem('email');

    const handleIconClick = () => {
        setShowEmail((prev) => !prev);
    };
    const handleLogout=()=>{
        localStorage.removeItem('email');
        localStorage.removeItem('loginTime')
    }
    return (
        <Navbar expand="lg" className="custom-header">
            <Container>
                <Navbar.Brand href="#home">
                    <img
                    src={logo}
                    alt="logo"x
                    className="header-logo"
                    />
                    <img
                    src={slogon}
                    alt="slogon"
                    className="header-slogon"
                    />
                </Navbar.Brand>
                {dashboard && (
          <div className="d-flex align-items-center">
            <div className="person-icon-container" style={{ marginRight: '15px' }}>
              <PersonFill
                size={24}
                onClick={handleIconClick}
                className="person-icon"
                style={{ color: 'white', cursor: 'pointer' }}
              />
              {showEmail && <p className="email-display" style={{ color: 'white' }}>{email}</p>}
            </div>

            <Nav.Link as={Link} to="/" onClick={handleLogout} style={{ color: 'white' }}>
              Logout
            </Nav.Link>
          </div>
        )}
                
            </Container>
        </Navbar>
    );
};

export default Header;
