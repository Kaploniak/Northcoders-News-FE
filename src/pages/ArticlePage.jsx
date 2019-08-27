import React, { Component } from "react";
import { Jumbotron, Button } from "react-bootstrap";
import Loading from "../utils/Loading";
import * as api from "../api";
import { dateFormat } from "../utils/utils";
import CommentList from "../components/CommentList";

class ArticlePage extends Component {
  state = {
    article: {},
    isLoading: true,
    showComments: false
  };
  render() {
    const { article, isLoading, showComments } = this.state;
    if (isLoading) return <Loading text="Loading the articles" />;
    return (
      <Jumbotron>
        <h2>{article.title}</h2>
        <h4 className="mb-2 text-muted">{dateFormat(article.created_at)}</h4>
        <h4 className="mb-2 text-muted">{article.author}</h4>
        <h4 className="mb-2 text-muted">#{article.topic}</h4>
        <h5>{article.body}</h5>
        <div className="articleButton">
          <Button variant="secondary" onClick={this.handleClick}>
            {showComments ? "Hide comments" : "Show comments"}
          </Button>
          {showComments && <CommentList article_id={article.article_id} />}
        </div>
        <div className="articleButton">
          <Button variant="secondary">Add comment</Button>
        </div>
      </Jumbotron>
    );
  }
  componentDidMount() {
    this.fetchArticleById();
  }

  fetchArticleById = () => {
    const { article_id } = this.props;
    api.getArticleById(article_id).then(({ article }) => {
      this.setState({ article, isLoading: false });
    });
  };

  handleClick = () => {
    this.setState(currentState => {
      return { showComments: !currentState.showComments };
    });
  };
}

export default ArticlePage;
