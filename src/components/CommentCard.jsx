import React, { Component } from "react";
import Loading from "../utils/Loading";
import { dateFormat, timeFormat } from "../utils/utils";
import Card from "react-bootstrap/Card";

class CommentCard extends Component {
  state = {
    comment: {},
    isLoading: true
  };
  render() {
    const { comment, isLoading } = this.state;
    if (isLoading) return <Loading text="Loading comment..." />;
    return (
      <Card>
        <Card.Body>
          <Card.Title>{comment.author}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {dateFormat(comment.created_at)}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            {timeFormat(comment.created_at)}
          </Card.Subtitle>
          <Card.Text>{comment.body}</Card.Text>
          <Card.Link href="#">Vote {comment.votes}</Card.Link>
        </Card.Body>
      </Card>
    );
  }
  componentDidMount() {
    const { comment } = this.props;
    this.setState({ comment, isLoading: false });
  }
}

export default CommentCard;
