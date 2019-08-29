import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Form, Card, Button } from "react-bootstrap";
import * as api from "../api";

class AddTopic extends Component {
  state = {
    slug: "",
    description: ""
  };
  render() {
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
                <Form.Label>Topic slug</Form.Label>
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
    const { slug, description } = this.state;
    const { fetchAllTopics } = this.props;
    api
      .postNewTopic({ slug, description })
      .then(() => {
        ReactDOM.findDOMNode(this.messageForm).reset();
        this.setState({ slug: "", description: "" });
        fetchAllTopics();
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export default AddTopic;
