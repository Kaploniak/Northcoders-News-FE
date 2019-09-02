import React, { Component } from "react";
import nc from "../images/nc-white-long.png";
import * as api from "../api";
import { Link, navigate } from "@reach/router";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";

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
            <Nav.Link eventKey="1" as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link eventKey="2" as={Link} to="/articles">
              Articles
            </Nav.Link>
            <Nav.Link eventKey="3" as={Link} to="/users">
              Users
            </Nav.Link>
            <NavDropdown title="Topics" id="collasible-nav-dropdown">
              {topics.map((topic, i) => {
                return (
                  <NavDropdown.Item
                    eventKey={9 + i}
                    as={Link}
                    to={`/articles/${topic.slug}/topics`}
                    key={topic.slug}
                  >
                    {topic.slug}
                  </NavDropdown.Item>
                );
              })}
              <NavDropdown.Divider />
              <NavDropdown.Item eventKey="9" as={Link} to="/topics">
                Show all topics
              </NavDropdown.Item>
            </NavDropdown>
            {loggedInUser && (
              <Nav.Link eventKey="5" as={Link} to="/article/form">
                Add Article
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            {loggedInUser ? (
              <Nav.Link eventKey="6" as={Link} to={`/users/${loggedInUser}`}>
                Logged in as: {loggedInUser}
              </Nav.Link>
            ) : (
              <>
                <Nav.Link eventKey="7" as={Link} to={`/signin`}>
                  Sign In
                </Nav.Link>
                <Nav.Link eventKey="8" as={Link} to={`/login`}>
                  Log In
                </Nav.Link>
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
