import React, { Component } from "react";
// import { Link } from "@reach/router";
import "bootstrap/dist/css/bootstrap.min.css";
import nc from "../images/nc-white-long.png";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button
} from "react-bootstrap";

class Navigation extends Component {
  render() {
    return (
      <Navbar
        className="navbar"
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        fixed="top"
      >
        <Navbar.Brand href="/">
          <img className="brandImg" src={nc} alt="northcoders logo." />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/articles">Articles</Nav.Link>
            <NavDropdown title="Topics" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/topics">
                Show all topics
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-secondary">Search</Button>
            </Form>
            <Nav.Link eventKey={2} href="#memes">
              Log in | Sign in
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navigation;
