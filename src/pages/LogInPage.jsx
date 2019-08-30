import React, { Component } from "react";
import Loading from "../utils/Loading";
import * as api from "../api";
import { Form, Card, Button } from "react-bootstrap";
import { navigate } from "@reach/router";
import ErrorPage from "../pages/ErrorPage";
import ReactDOM from "react-dom";

class LogInPage extends Component {
  state = {
    users: [],
    isLoading: true,
    err: false,
    username: "",
    wrongLogin: false
  };
  render() {
    const { isLoading, err, wrongLogin } = this.state;
    if (err) return <ErrorPage err={err} />;
    if (isLoading) return <Loading text="Loading the article..." />;
    return (
      <Card>
        <Card.Body>
          <Form
            id="myForm"
            className="formAddArticle"
            ref={form => (this.messageForm = form)}
            onSubmit={this.onSubmit}
          >
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                placeholder="Username"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" disabled />
            </Form.Group>

            <Button
              variant="secondary"
              type="submit"
              onClick={this.handleSubmit}
            >
              Log In
            </Button>
            {wrongLogin && <p>Log In details incorrect.</p>}
          </Form>
        </Card.Body>
      </Card>
    );
  }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username, users } = this.state;
    const { setLoggedInUser } = this.props;

    const arrOfUsernames = users.map(user => {
      return user.username;
    });

    if (arrOfUsernames.includes(username)) {
      setLoggedInUser(username);
      navigate(`/`);
    } else {
      this.setState({ wrongLogin: true });
    }
    ReactDOM.findDOMNode(this.messageForm).reset();
  };

  componentDidMount() {
    this.fetchAllUsers();
  }

  fetchAllUsers = () => {
    api
      .getAllUsers()
      .then(({ users }) => {
        this.setState({ users, isLoading: false });
      })
      .catch(err => {
        this.setState({ err, isLoading: false });
      });
  };
}

export default LogInPage;
