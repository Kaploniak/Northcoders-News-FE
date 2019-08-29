import React, { Component } from "react";
import Loading from "../utils/Loading";
import * as api from "../api";
import Button from "react-bootstrap/Button";
import CommentCard from "../components/CommentCard";
import CommentSort from "./CommentSort";
import AddComment from "./AddComment";
import ErrorPage from "../pages/ErrorPage";

class CommentList extends Component {
  state = {
    comments: [],
    sort_by: null,
    order: null,
    showAddCommentForm: false,
    isLoading: true,
    err: false
  };
  render() {
    const { comments, isLoading, showAddCommentForm, err } = this.state;
    const { loggedInUser, article_id, author } = this.props;

    if (err) return <ErrorPage err={err} />;
    if (isLoading) return <Loading text="Loading the comments" />;
    return (
      <div className="main-commentList">
        <CommentSort handleClick={this.handleClick} />
        <ul className="commentList">
          {comments.map(comment => {
            return (
              <li key={comment.comment_id}>
                <CommentCard
                  comment={comment}
                  loggedInUser={loggedInUser}
                  fetchAllCommentsByArticleId={this.fetchAllCommentsByArticleId}
                />
              </li>
            );
          })}
        </ul>
        {loggedInUser && (
          <div className="articleButton">
            <Button variant="secondary" onClick={this.handleShowAddCommentForm}>
              Add comment
            </Button>
          </div>
        )}
        {showAddCommentForm && (
          <AddComment
            loggedInUser={loggedInUser}
            article_id={article_id}
            username={author}
            fetchAllCommentsByArticleId={this.fetchAllCommentsByArticleId}
          />
        )}
      </div>
    );
  }

  handleClick = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidUpdate(prevProps, prevState) {
    const { sort_by, order } = this.state;
    if (prevState.sort_by !== sort_by || prevState.order !== order) {
      this.fetchAllCommentsByArticleId();
    }
  }

  componentDidMount() {
    this.fetchAllCommentsByArticleId();
  }

  fetchAllCommentsByArticleId = () => {
    const { article_id } = this.props;
    const { sort_by, order } = this.state;
    api
      .getAllCommentsByArticleId({ article_id, sort_by, order })
      .then(({ comments }) => {
        this.setState({ comments, isLoading: false });
      })
      .catch(err => {
        this.setState({ err, isLoading: false });
      });
  };

  handleShowAddCommentForm = () => {
    this.setState(currentState => {
      return { showAddCommentForm: !currentState.showAddCommentForm };
    });
  };
}

export default CommentList;
