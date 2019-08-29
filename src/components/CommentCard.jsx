import React, { Component } from "react";
import Loading from "../utils/Loading";
import { dateFormat, timeFormat } from "../utils/utils";
import { Card, Button } from "react-bootstrap";
import Voting from "./Voting";
import * as api from "../api";
// to do
class CommentCard extends Component {
  state = {
    comment: {},
    isLoading: true
  };
  render() {
    const { comment, isLoading } = this.state;
    const { loggedInUser } = this.props;

    if (isLoading) return <Loading text="Loading comment..." />;
    return (
      <Card>
        <Card.Body>
          {loggedInUser && loggedInUser === comment.author && (
            <div className="articleButton">
              <Button variant="danger" onClick={this.handleDeleteComment}>
                Delete comment
              </Button>
            </div>
          )}
          <Card.Title>{comment.author}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {dateFormat(comment.created_at)}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            {timeFormat(comment.created_at)}
          </Card.Subtitle>
          <Card.Text>{comment.body}</Card.Text>
          {loggedInUser && (
            <Voting votes={comment.votes} comment_id={comment.comment_id} />
          )}
        </Card.Body>
      </Card>
    );
  }
  componentDidMount() {
    const { comment } = this.props;
    this.setState({ comment, isLoading: false });
  }

  handleDeleteComment = () => {
    const { comment } = this.props;
    api.deleteComment(comment.comment_id).then(() => {
      this.props.fetchAllCommentsByArticleId();
      console.log("succesfuly deleted comment");
    });
  };
}

export default CommentCard;
