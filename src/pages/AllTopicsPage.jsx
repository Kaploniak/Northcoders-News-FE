import React, { Component } from "react";
import Loading from "../utils/Loading";
import * as api from "../api";
import { Card, Button } from "react-bootstrap";
import { Link } from "@reach/router";
import cooking from "../images/cooking.jpg";
import coding from "../images/coding.jpg";
import football from "../images/football.jpg";

class AllTopicsPage extends Component {
  state = {
    topics: [],
    isLoading: true
  };
  render() {
    const { topics, isLoading } = this.state;
    const ref = {
      coding,
      cooking,
      football
    };
    if (isLoading) return <Loading text="Loading the article..." />;
    return (
      <>
        <div className="topicsList">
          {topics.map(topic => {
            return (
              <Card
                style={{ width: "18rem" }}
                className="card"
                key={topic.slug}
              >
                <Card.Body>
                  <Link to={`/articles/${topic.slug}`}>
                    <Card.Img
                      variant="top"
                      src={ref[topic.slug]}
                      alt={`Card image: ${topic.slug} topic`}
                    />
                  </Link>
                  <Card.Title>#{topic.slug}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {topic.description}
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            );
          })}
        </div>
        <Button variant="secondary">Add topic</Button>
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
}

export default AllTopicsPage;
