import React, { Component } from "react";
import nc from "../images/nc-white-long.png";
import * as api from "../api";
import { Link } from "@reach/router";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button
} from "react-bootstrap";

class Navigation extends Component {
  state = {
    topics: []
  };
  render() {
    const { topics } = this.state;
    const { loggedInUser } = this.props;
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
            <Link className="nav-link" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/articles">
              Articles
            </Link>
            <Link className="nav-link" to="/users">
              Users
            </Link>
            <NavDropdown title="Topics" id="collasible-nav-dropdown">
              {topics.map(topic => {
                return (
                  <NavDropdown.Item
                    to={`/articles/${topic.slug}/topics`}
                    key={topic.slug}
                  >
                    {topic.slug}
                  </NavDropdown.Item>
                );
              })}
              <NavDropdown.Divider />
              <NavDropdown.Item to="/topics">Show all topics</NavDropdown.Item>
            </NavDropdown>
            <Link className="nav-link" to="/article/form">
              Add Article
            </Link>
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
            {loggedInUser ? (
              <Link className="nav-link" to={`/users/${loggedInUser}`}>
                {loggedInUser}
              </Link>
            ) : (
              <Link className="nav-link" eventKey={2} to="#memes">
                Log in | Sign in
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }

  componentDidMount() {
    this.fetchAllTopics();
  }

  fetchAllTopics = () => {
    api.getAllTopics().then(({ topics }) => {
      this.setState({ topics, isLoading: false });
    });
  };
}

export default Navigation;
