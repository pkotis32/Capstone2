import React from 'react'
import {Navbar, Nav, NavItem} from 'reactstrap'
import {NavLink, useNavigate} from 'react-router-dom'
import './Navbar.css'


interface logoutProps {
  logout: () => void;
  user: string;
}


// navbar component
const NavigationBar = ({user, logout}: logoutProps) => {
  
  const navigate = useNavigate();

  // logout function for when the logout link is clicked
  const handleLogout = (e: any) => {
    e.preventDefault();
    logout();
    navigate('/', {state: {message: "You successfully logged out!"}});
  }


  return (
    <Navbar color="light" expand="md" className="w-100">
      <NavLink to="/" className="navbar-brand ms-3">Tennis Pal Finder</NavLink>
      <Nav className="ml-auto">

        {user ? (
          <>
            <NavItem>
              <NavLink to="/users" className="me-5 tab">Find Pals</NavLink>
            </NavItem>
            <NavItem>
              <a href='/' onClick={(e) => handleLogout(e)} className="me-3">Logout {user}</a>
            </NavItem>
          </>
        ): (
          <>
            <NavItem>
              <NavLink to="/login" className="me-5">Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/signup" className="me-5">Signup</NavLink>
            </NavItem>
          </>
        )}

      </Nav>

    </Navbar>
  )
}

export default NavigationBar
