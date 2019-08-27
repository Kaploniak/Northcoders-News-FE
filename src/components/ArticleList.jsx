import React, { Component } from "react";
import Loading from "../utils/Loading";
import * as api from "../api";
import ArticleCard from "./ArticleCard";

class ArticleList extends Component {
  state = {
    articles: [],
    page: 1,
    total_count: 0,
    isLoading: true
  };
  render() {
    const { articles, isLoading } = this.state;
    if (isLoading) return <Loading text="Loading the articles" />;
    return (
      <ul className="articleList">
        {articles.map(article => {
          return (
            <li key={article.article_id}>
              <ArticleCard article={article} />
            </li>
          );
        })}
      </ul>
    );
  }

  componentDidMount() {
    this.fetchAllArticles();
  }

  fetchAllArticles = () => {
    const { sort_by, order, author, topic, limit, page } = this.props;
    api
      .getAllArticles({ sort_by, order, author, topic, limit, page })
      .then(({ articles, total_count }) => {
        console.log(total_count);
        this.setState({ articles, total_count, isLoading: false });
      });
  };
}

export default ArticleList;
