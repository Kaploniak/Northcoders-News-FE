import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Form, Card, Button } from "react-bootstrap";
import * as api from "../api";
import ErrorPage from "../pages/ErrorPage";
import Loading from "../utils/Loading";

class AddTopic extends Component {
  state = {
    slug: "",
    description: "",
    err: false,
    isLoading: false,
    errorMsg: null
  };
  render() {
    const { err, isLoading, errorMsg } = this.state;
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
              <Form.Group controlId="slug">
                <Form.Label>Topic name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder='e.g. "cars"'
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Topic description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder='e.g. "Everything about cars."'
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
            {errorMsg && errorMsg}
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
    const { slug, description } = this.state;
    const { fetchAllTopics } = this.props;
    if (slug.length < 3 && description.length < 5) {
      this.setState({ errorMsg: "Title or article too short." });
    } else {
      this.setState({ isLoading: true }, () => {
        api
          .postNewTopic({ slug, description })
          .then(() => {
            ReactDOM.findDOMNode(this.messageForm).reset();
            this.setState({ slug: "", description: "", isLoading: false });
            fetchAllTopics();
          })
          .catch(err => {
            this.setState({ err });
          });
      });
    }
  };
}

export default AddTopic;
