import React from 'react'
import {Navbar, Nav, NavItem} from 'reactstrap'
import {NavLink, useNavigate} from 'react-router-dom'


interface logoutProps {
  logout: () => void;
  user: string;
}

const NavigationBar = ({user, logout}: logoutProps) => {
  
  const navigate = useNavigate();

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
              <a href='/' onClick={(e) => handleLogout(e)} className="me-3">Logout</a>
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
