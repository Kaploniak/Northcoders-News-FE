import React, { Component } from "react";
import { dateFormat, timeFormat } from "../utils/utils";
import { Card, Button } from "react-bootstrap";
import Voting from "./Voting";
import * as api from "../api";
import ErrorPage from "../pages/ErrorPage";

class CommentCard extends Component {
  state = {
    err: false
  };
  render() {
    const { err } = this.state;
    const { comment, loggedInUser } = this.props;

    if (err) return <ErrorPage err={err} />;

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

  handleDeleteComment = () => {
    const { comment } = this.props;
    api
      .deleteComment(comment.comment_id)
      .then(() => {
        this.props.fetchAllCommentsByArticleId();
      })
      .catch(err => {
        this.setState({ err, isLoading: false });
      });
  };
}

export default CommentCard;
