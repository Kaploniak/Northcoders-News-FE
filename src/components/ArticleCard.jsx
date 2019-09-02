import React, { Component } from "react";
import Loading from "../utils/Loading";
import Card from "react-bootstrap/Card";
import { Link } from "@reach/router";
import { datePrettier } from "../utils/utils";
import cooking from "../images/cooking.jpg";
import coding from "../images/coding.jpg";
import football from "../images/football.jpg";

class ArticleCard extends Component {
  state = {
    article: {},
    isLoading: true
  };
  render() {
    const { article, isLoading } = this.state;
    const ref = {
      coding,
      cooking,
      football
    };
    if (isLoading) return <Loading text="Loading the article..." />;
    return (
      <Card style={{ width: "22rem", height: "34rem" }} className="card">
        <Card.Body>
          <Link to={`/articles/${article.topic}/topics`}>
            <Card.Img
              variant="top"
              src={ref[article.topic]}
              alt={`Card image: ${article.topic} topic`}
            />
          </Link>
          <Card.Title>
            {article.title.length > 50
              ? article.title.slice(0, 60) + " ..."
              : article.title}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {datePrettier(article.created_at)}
          </Card.Subtitle>
          <Link to={`/articles/${article.author}/authors`}>
            <Card.Subtitle className="mb-2 text-muted">
              {article.author}
            </Card.Subtitle>
          </Link>
          <Link to={`/articles/${article.topic}/topics`}>
            <Card.Subtitle className="mb-2 text-muted">
              #{article.topic}
            </Card.Subtitle>
          </Link>
          <Card.Text>
            {article.body.length > 100
              ? article.body.slice(0, 100) + " ..."
              : article.body}
          </Card.Text>
          <Card.Subtitle className="mb-2 text-muted">
            Likes: {article.votes}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            Comments: {article.comment_count}
          </Card.Subtitle>
          <Link className="card-link" to={`/article/${article.article_id}`}>
            Read more
          </Link>
        </Card.Body>
      </Card>
    );
  }

  componentDidMount() {
    const { article } = this.props;
    this.setState({ article, isLoading: false, type: article.type });
  }
}

export default ArticleCard;
