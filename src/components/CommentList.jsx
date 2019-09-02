import React, { Component } from "react";
import Loading from "../utils/Loading";
import * as api from "../api";
import Button from "react-bootstrap/Button";
import CommentCard from "../components/CommentCard";
import CommentAdder from "./CommentAdder";
import ErrorPage from "../pages/ErrorPage";
import Sort from "./Sort";

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
    const { loggedInUser, article_id } = this.props;

    if (err) return <ErrorPage err={err} />;
    if (isLoading) return <Loading text="Loading the comments" />;
    return (
      <div className="main-commentList">
        <Sort handleClick={this.handleClick} />
        {loggedInUser && (
          <div className="articleButton">
            <Button variant="secondary" onClick={this.handleShowAddCommentForm}>
              Add comment
            </Button>
          </div>
        )}
        {showAddCommentForm && (
          <CommentAdder
            loggedInUser={loggedInUser}
            article_id={article_id}
            comentsUpdate={this.comentsUpdate}
          />
        )}
        <ul className="commentList">
          {comments.map(comment => {
            return (
              <li key={comment.comment_id}>
                <CommentCard
                  comment={comment}
                  loggedInUser={loggedInUser}
                  commentDelete={this.commentDelete}
                />
              </li>
            );
          })}
        </ul>
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

  comentsUpdate = ({ comment }) => {
    this.setState(currentState => {
      const { comments } = currentState;
      return { comments: [comment, ...comments] };
    });
  };

  commentDelete = comment_id => {
    this.setState(currentState => {
      const { comments } = currentState;
      const updatedComments = comments.filter(comment => {
        return comment.comment_id !== comment_id;
      });
      return { comments: updatedComments };
    });
  };

  handleShowAddCommentForm = () => {
    this.setState(currentState => {
      return { showAddCommentForm: !currentState.showAddCommentForm };
    });
  };
}

export default CommentList;
