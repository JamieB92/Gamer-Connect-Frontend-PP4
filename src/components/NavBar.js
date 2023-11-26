import React from 'react'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import logo from "../assets/logo.png"

function NavBar() {
  return (
    <Navbar bg="light" expand="md" fixed="top">
      <Container> 
      <Navbar.Brand><img src={logo} alt="Logo" height={50}/> GamerConnect</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto text-right">
          <Nav.Link><i class="fa-solid fa-house-chimney"></i> Home</Nav.Link>
          <Nav.Link><i class="fa-solid fa-right-to-bracket"></i> Sign In</Nav.Link>
          <Nav.Link><i class="fa-solid fa-user-plus"></i> Sign Up</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      </Container> 
    </Navbar>
  );
}

export default NavBar