import React, { Component } from "react";
import { Jumbotron, Button } from "react-bootstrap";
import Loading from "../utils/Loading";
import * as api from "../api";
import { dateFormat } from "../utils/utils";
import CommentList from "../components/CommentList";
import { Link, navigate } from "@reach/router";
import cooking from "../images/cooking.jpg";
import coding from "../images/coding.jpg";
import football from "../images/football.jpg";
import defaultTopic from "../images/defaultTopic.jpg";
import Voting from "../components/Voting";
import ErrorPage from "../pages/ErrorPage";

class ArticlePage extends Component {
  state = {
    article: {},
    isLoading: true,
    err: false,
    showComments: false
  };
  render() {
    const { article, isLoading, showComments, err } = this.state;
    const { loggedInUser } = this.props;
    const ref = {
      coding,
      cooking,
      football
    };
    if (err) return <ErrorPage err={err} />;
    if (isLoading) return <Loading text="Loading the article" />;
    return (
      <Jumbotron>
        {loggedInUser && loggedInUser === article.author && (
          <div className="articleButton">
            <Button variant="danger" onClick={this.handleDeleteArticle}>
              Delete article
            </Button>
          </div>
        )}
        <Link to={`/articles?${article.topic}`}>
          <img
            src={ref[article.topic] ? ref[article.topic] : defaultTopic}
            alt={`Card: ${article.topic} topic`}
          />
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
          <Button
            variant="secondary"
            value="showComments"
            onClick={this.handleShowComments}
          >
            {showComments ? "Hide comments" : "Show comments"}
          </Button>
          {showComments && (
            <CommentList
              article_id={article.article_id}
              author={article.author}
              loggedInUser={loggedInUser}
            />
          )}
        </div>
      </Jumbotron>
    );
  }
  componentDidMount() {
    this.fetchArticleById();
  }

  fetchArticleById = () => {
    const { article_id } = this.props;
    api
      .getArticleById(article_id)
      .then(({ article }) => {
        this.setState({ article, isLoading: false });
      })
      .catch(err => {
        this.setState({ err, isLoading: false });
      });
  };

  handleShowComments = () => {
    this.setState(currentState => {
      return { showComments: !currentState.showComments };
    });
  };

  handleDeleteArticle = () => {
    const { article_id } = this.props;
    api
      .deleteArticle(article_id)
      .then(() => {
        navigate("/");
      })
      .catch(err => {
        this.setState({ err, isLoading: false });
      });
  };
}

export default ArticlePage;
