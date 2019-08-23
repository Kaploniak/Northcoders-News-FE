import React, { Component } from "react";
import Loading from "../utils/Loading";
import * as api from "../api";

class ArticleList extends Component {
  state = {
    articles: [],
    page: 1,
    isLoading: true
  };
  render() {
    const { articles, isLoading } = this.state;
    if (isLoading) return <Loading text="Loading the articles" />;
    return (
      <ul className="articleList">
        {articles.map(article => {
          return <li key={article.article_id}>{article.title}</li>;
        })}
      </ul>
    );
  }

  componentDidMount() {
    this.fetchAllArticles();
  }

  fetchAllArticles = () => {
    api.getAllArticles().then(({ articles }) => {
      this.setState({ articles, isLoading: false });
    });
  };
}

export default ArticleList;
