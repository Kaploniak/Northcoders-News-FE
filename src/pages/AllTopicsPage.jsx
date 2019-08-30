import React, { Component } from "react";
import Loading from "../utils/Loading";
import * as api from "../api";
import { Card, Button } from "react-bootstrap";
import { Link } from "@reach/router";
import cooking from "../images/cooking.jpg";
import coding from "../images/coding.jpg";
import football from "../images/football.jpg";
import defaultTopic from "../images/defaultTopic.jpg";
import TopicAdder from "../components/TopicAdder";
import ErrorPage from "../pages/ErrorPage";

class AllTopicsPage extends Component {
  state = {
    topics: [],
    isLoading: true,
    err: false,
    addTopic: false
  };
  render() {
    const { topics, isLoading, addTopic, err } = this.state;
    const { loggedInUser } = this.props;
    const ref = {
      coding,
      cooking,
      football
    };
    if (err) return <ErrorPage err={err} />;
    if (isLoading) return <Loading text="Loading the article..." />;
    return (
      <>
        <div className="topicsList">
          {topics.map(topic => {
            return (
              <Link to={`/articles/${topic.slug}/topics`} key={topic.slug}>
                <Card style={{ width: "18rem" }} className="card">
                  <Card.Body>
                    <Card.Img
                      variant="top"
                      src={ref[topic.slug] ? ref[topic.slug] : defaultTopic}
                      alt={`Card image: ${topic.slug} topic`}
                    />
                    <Card.Title>#{topic.slug}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {topic.description}
                    </Card.Subtitle>
                  </Card.Body>
                </Card>
              </Link>
            );
          })}
        </div>
        {loggedInUser && (
          <Button
            className="addTopicButton"
            variant="secondary"
            onClick={this.handleClick}
          >
            {addTopic ? "Close" : "Add topic"}
          </Button>
        )}
        {addTopic ? <TopicAdder fetchAllTopics={this.fetchAllTopics} /> : null}
      </>
    );
  }

  componentDidMount() {
    this.fetchAllTopics();
  }

  fetchAllTopics = () => {
    api
      .getAllTopics()
      .then(({ topics }) => {
        this.setState({ topics, isLoading: false });
      })
      .catch(err => {
        this.setState({ err, isLoading: false });
      });
  };

  handleClick = () => {
    this.setState(currentState => {
      return { addTopic: !currentState.addTopic };
    });
  };
}

export default AllTopicsPage;
