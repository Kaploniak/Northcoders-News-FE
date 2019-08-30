import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Form, Card, Button } from "react-bootstrap";
import * as api from "../api";
import ErrorPage from "../pages/ErrorPage";

class AddComment extends Component {
  state = {
    body: "",
    err: false
  };
  render() {
    const { err } = this.state;
    if (err) return <ErrorPage err={err} />;
    return (
      <div className="addTopicForm">
        <Card>
          <Card.Body>
            <Form
              id="myForm"
              className="form"
              ref={form => (this.messageForm = form)}
              onSubmit={this.onSubmit}
            >
              <Form.Group controlId="body">
                <Form.Label>Comment:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="4"
                  placeholder="Add yours comment...."
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Button
                variant="secondary"
                type="submit"
                onClick={this.handleSubmit}
              >
                Submit
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
    const { body } = this.state;
    const { article_id, loggedInUser } = this.props;
    api
      .postNewComment(article_id, { body, username: loggedInUser })
      .then(() => {
        ReactDOM.findDOMNode(this.messageForm).reset();
        this.setState({ body: "" });
        this.props.fetchAllCommentsByArticleId();
      })
      .catch(err => {
        this.setState({ err });
      });
  };
}

export default AddComment;
