import React, { Component } from "react";
import Loading from "../utils/Loading";
import * as api from "../api";
import { Dropdown, DropdownButton } from "react-bootstrap";
import CommentCard from "../components/CommentCard";

class CommentList extends Component {
  state = {
    comments: [],
    sort_by: null,
    order: null,
    isLoading: true
  };
  render() {
    const { comments, isLoading } = this.state;
    if (isLoading) return <Loading text="Loading the comments" />;
    return (
      <div className="main-commentList">
        <DropdownButton
          className="dropdownSort"
          id="dropdown-item-button"
          title="Sort"
          variant="secondary"
        >
          <Dropdown.Item
            as="button"
            name="sort_by"
            value="author"
            onClick={this.handleClick}
          >
            by author
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            name="sort_by"
            value="votes"
            onClick={this.handleClick}
          >
            by votes
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            name="sort_by"
            value="created_at"
            onClick={this.handleClick}
          >
            by create time
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            name="order"
            value="asc"
            onClick={this.handleClick}
          >
            ascending
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            name="order"
            value="desc"
            onClick={this.handleClick}
          >
            descending
          </Dropdown.Item>
        </DropdownButton>
        <ul className="commentList">
          {comments.map(comment => {
            return (
              <li key={comment.comment_id}>
                <CommentCard comment={comment} />
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
      });
  };
}

export default CommentList;
