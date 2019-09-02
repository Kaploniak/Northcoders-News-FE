import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Form, Card, Button } from "react-bootstrap";
import * as api from "../api";
import ErrorPage from "../pages/ErrorPage";
import Loading from "../utils/Loading";
class AddComment extends Component {
  state = {
    body: "",
    err: false,
    isLoading: false,
    validation: false
  };
  render() {
    const { err, isLoading, validation } = this.state;
    if (err) return <ErrorPage err={err} />;
    return (
      <div className="addCommentForm">
        <Card>
          <Card.Body>
            <Form
              id="myForm"
              required
              className="form"
              ref={form => (this.messageForm = form)}
              onSubmit={this.onSubmit}
            >
              <Form.Group controlId="body">
                <Form.Label>Comment:</Form.Label>
                <Form.Control
                  as="input"
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
              {isLoading && <Loading />}
            </Form>
            {validation && "Comment too short"}
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
    const { article_id, loggedInUser, comentsUpdate } = this.props;
    if (body.length < 2 || body === undefined) {
      this.setState({ validation: true });
    } else {
      this.setState({ isLoading: true }, () => {
        api
          .postNewComment(article_id, { body, username: loggedInUser })
          .then(comment => {
            ReactDOM.findDOMNode(this.messageForm).reset();
            this.setState({ body: "", isLoading: false, validation: false });
            comentsUpdate(comment);
          })
          .catch(err => {
            this.setState({ err });
          });
      });
    }
  };
}

export default AddComment;
