import React, { Component } from "react";
import { dateFormat, timeFormat } from "../utils/utils";
import { Card, Button } from "react-bootstrap";
import Voting from "./Voting";
import * as api from "../api";
import ErrorPage from "../pages/ErrorPage";
import Loading from "../utils/Loading";

class CommentCard extends Component {
  state = {
    err: false,
    isLoading: false
  };
  render() {
    const { err, isLoading } = this.state;
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
              {isLoading && <Loading />}
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
    const { comment, commentDelete } = this.props;
    this.setState({ isLoading: true }, () => {
      api
        .deleteComment(comment.comment_id)
        .then(() => {
          this.setState({ isLoading: false });
          commentDelete(comment.comment_id);
        })
        .catch(err => {
          this.setState({ err });
        });
    });
  };
}

export default CommentCard;
