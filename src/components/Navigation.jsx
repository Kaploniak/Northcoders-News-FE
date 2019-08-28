import React, { Component } from "react";
import nc from "../images/nc-white-long.png";
import * as api from "../api";
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
              {topics.map(topic => {
                return (
                  <NavDropdown.Item
                    href={`/articles/${topic.slug}`}
                    key={topic.slug}
                  >
                    {topic.slug}
                  </NavDropdown.Item>
                );
              })}
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
            {this.props.user ? (
              <Nav.Link href={`/users/${this.props.user}`}>
                {this.props.user}
              </Nav.Link>
            ) : (
              <Nav.Link eventKey={2} href="#memes">
                Log in | Sign in
              </Nav.Link>
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
