import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Styles from "./NavComp.module.css";

const NavbarComp = () => {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Chat App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-end" style={{ width: "100%" }}>
              <NavLink className={Styles.navItem__Style} to="/chat">
                Chat
              </NavLink>
              <NavLink className={Styles.navItem__Style} to="/login">
                Login
              </NavLink>
              <NavLink className={Styles.navItem__Style} to="/register">
                Register
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComp;
