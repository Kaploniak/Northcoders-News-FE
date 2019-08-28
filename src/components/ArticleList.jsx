import React, { Component } from "react";
import Loading from "../utils/Loading";
import * as api from "../api";
import ArticleCard from "./ArticleCard";
import ArticlePagination from "./ArticlePagination";
import ArticleSort from "./ArticleSort";

class ArticleList extends Component {
  state = {
    articles: [],
    p: 1,
    total_count: 0,
    isLoading: true,
    pagination: null,
    sort: null,
    sort_by: null,
    topic: null,
    author: null,
    order: null
  };
  render() {
    const {
      articles,
      isLoading,
      pagination,
      total_count,
      p,
      sort
    } = this.state;
    if (isLoading) return <Loading text="Loading the articles" />;
    return (
      <>
        {pagination && (
          <ArticlePagination
            total_count={total_count}
            p={p}
            updatePage={this.updatePage}
          />
        )}
        {sort && (
          <ArticleSort className="articleSort" handleClick={this.handleClick} />
        )}
        <ul className="articleList">
          {articles.map(article => {
            return (
              <li key={article.article_id}>
                <ArticleCard article={article} />
              </li>
            );
          })}
        </ul>
        {pagination && (
          <ArticlePagination
            total_count={total_count}
            p={p}
            updatePage={this.updatePage}
          />
        )}
      </>
    );
  }

  handleClick = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    const { pagination, sort, topic, author } = this.props;
    this.fetchAllArticles();
    this.setState({ pagination, sort, topic, author });
  }

  componentDidUpdate(prevProps, prevState) {
    const { p, sort_by, order, topic, author } = this.state;

    if (
      prevState.p !== p ||
      prevState.sort_by !== sort_by ||
      prevState.order !== order ||
      prevState.author !== author ||
      prevState.topic !== topic
    ) {
      this.fetchAllArticles();
    }
  }

  fetchAllArticles = () => {
    const { limit, topic, author } = this.props;
    const { p, sort_by, order } = this.state;
    api
      .getAllArticles({ sort_by, order, limit, p, topic, author })
      .then(({ articles, total_count }) => {
        this.setState({ articles, total_count, isLoading: false });
      });
  };

  updatePage = p => {
    this.setState({ p });
  };
}

export default ArticleList;
