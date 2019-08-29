import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Form, Card, Button } from "react-bootstrap";
import * as api from "../api";

class AddArticlePage extends Component {
  state = {
    topics: [],
    title: "",
    body: "",
    topic: null,
    slug: null,
    description: null,
    addTopic: false
  };
  render() {
    const {
      title,
      body,
      topic,
      slug,
      description,
      addTopic,
      topics
    } = this.state;
    return (
      <>
        <h2>Add new article</h2>
        <div className="addArticleForm">
          <Card>
            <Card.Body>
              <Form
                id="myForm"
                className="formAddArticle"
                ref={form => (this.messageForm = form)}
                onSubmit={this.onSubmit}
              >
                <Form.Group controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder='e.g. "Running a Node App"'
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="topic">
                  <Form.Label>Topic</Form.Label>
                  <Form.Control as="select" onChange={this.handleChange}>
                    {topics.map(topic => {
                      return <option key={topic.slug}>{topic.slug}</option>;
                    })}
                  </Form.Control>
                </Form.Group>
                <Button
                  variant="secondary"
                  className="addTopicButton"
                  onClick={this.handleShowTopicForm}
                >
                  {addTopic ? "Hide Form" : "Add New Topic"}
                </Button>
                {addTopic && (
                  <>
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
                  </>
                )}
                <Form.Group controlId="body">
                  <Form.Label>Article:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="4"
                    placeholder="Yours article here...."
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
      </>
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

  handleShowTopicForm = e => {
    this.setState(currentState => {
      return { addTopic: !currentState.addTopic };
    });
  };

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

export default AddArticlePage;
