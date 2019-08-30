import React, { Component } from "react";
import nc from "../images/nc-white-long.png";
import * as api from "../api";
import { Link, navigate } from "@reach/router";
import {
  Navbar,
  Nav,
  NavDropdown,
  // Form,
  // FormControl,
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
        <Link to="/">
          <Navbar.Brand>
            <img className="brandImg" src={nc} alt="northcoders logo." />
          </Navbar.Brand>
        </Link>
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
                  <Link
                    className="dropdown-item"
                    to={`/articles/${topic.slug}/topics`}
                    key={topic.slug}
                  >
                    {topic.slug}
                  </Link>
                );
              })}
              <NavDropdown.Divider />
              <Link className="dropdown-item" to="/topics">
                Show all topics
              </Link>
            </NavDropdown>
            {loggedInUser && (
              <Link className="nav-link" to="/article/form">
                Add Article
              </Link>
            )}
          </Nav>
          <Nav>
            {/* <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-secondary">Search</Button>
            </Form> */}
            {loggedInUser ? (
              <Link className="nav-link" to={`/users/${loggedInUser}`}>
                {loggedInUser}
              </Link>
            ) : (
              <>
                <Link className="nav-link" to={`/signin`}>
                  Sign In
                </Link>
                <Link className="nav-link" to={`/login`}>
                  Log In
                </Link>
              </>
            )}
            {loggedInUser && (
              <Button
                id="logoutBtn"
                className="nav-link"
                variant="secondary"
                size="sm"
                onClick={this.handleLogOutUser}
              >
                Log Out
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }

  handleLogOutUser = () => {
    const { setLoggedInUser } = this.props;
    setLoggedInUser(null);
    navigate("/logout");
  };

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
