import React, { Component } from "react";
import { Form, Col, Card, Button } from "react-bootstrap";
import * as api from "../api";
import ReactDOM from "react-dom";
import { navigate } from "@reach/router";

class SignInPage extends Component {
  state = {
    username: "",
    name: "",
    avatar_url:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  };
  render() {
    return (
      <div className="signInForm">
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
              <Form.Group controlId="name">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Full Name"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Row>
                <Form.Group as={Col} controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    disabled
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    disabled
                  />
                </Form.Group>
              </Form.Row>
              <Form.Group controlId="avatar_url" onChange={this.handleChange}>
                <Form.Label>Avatar</Form.Label>
                <Form.Control placeholder="Avatar URL" />
              </Form.Group>

              <Button
                variant="secondary"
                type="submit"
                onClick={this.handleSubmit}
              >
                Sign In
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username, name, avatar_url } = this.state;

    api
      .postNewUser({ username, name, avatar_url })
      .then(() => {
        ReactDOM.findDOMNode(this.messageForm).reset();
        this.setState({
          username: "",
          name: "",
          avatar_url:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        });
        navigate(`/login`);
      })
      .catch(err => {
        this.setState({ err, isLoading: false });
      });
  };
}

export default SignInPage;
