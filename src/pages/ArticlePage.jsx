import React, { Component } from "react";
import { Jumbotron, Button } from "react-bootstrap";
import Loading from "../utils/Loading";
import * as api from "../api";
import { dateFormat } from "../utils/utils";
import CommentList from "../components/CommentList";
import { Link } from "@reach/router";
import cooking from "../images/cooking.jpg";
import coding from "../images/coding.jpg";
import football from "../images/football.jpg";
import Voting from "../components/Voting";

class ArticlePage extends Component {
  state = {
    article: {},
    isLoading: true,
    showComments: false
  };
  render() {
    const { article, isLoading, showComments } = this.state;
    const { loggedInUser } = this.props;
    const ref = {
      coding,
      cooking,
      football
    };
    if (isLoading) return <Loading text="Loading the articles" />;
    return (
      <Jumbotron>
        {loggedInUser && loggedInUser === article.author && (
          <div className="articleButton">
            <Button variant="danger">Delete article</Button>
          </div>
        )}
        <Link to={`/articles?${article.topic}`}>
          <img src={ref[article.topic]} alt={`Card: ${article.topic} topic`} />
        </Link>
        <h2>{article.title}</h2>
        <h4 className="mb-2 text-muted">{dateFormat(article.created_at)}</h4>
        <Link to={`/articles/${article.author}/authors`}>
          <h4 className="mb-2 text-muted">{article.author}</h4>
        </Link>
        <Link to={`/articles/${article.topic}/topics`}>
          <h4 className="mb-2 text-muted">#{article.topic}</h4>
        </Link>
        <h5>{article.body}</h5>
        {loggedInUser && (
          <div className="votingComponent">
            <Voting votes={article.votes} article_id={article.article_id} />
          </div>
        )}
        <div className="articleButton">
          <Button variant="secondary" onClick={this.handleClick}>
            {showComments ? "Hide comments" : "Show comments"}
          </Button>
          {showComments && (
            <CommentList
              article_id={article.article_id}
              loggedInUser={loggedInUser}
            />
          )}
        </div>
        {loggedInUser && (
          <div className="articleButton">
            <Button variant="secondary">Add comment</Button>
          </div>
        )}
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
