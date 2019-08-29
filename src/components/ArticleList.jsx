import React, { Component } from "react";
import Loading from "../utils/Loading";
import * as api from "../api";
import ArticleCard from "./ArticleCard";
import ArticlePagination from "./ArticlePagination";
import ArticleSort from "./ArticleSort";
import ErrorPage from "../pages/ErrorPage";

class ArticleList extends Component {
  state = {
    articles: [],
    p: 1,
    total_count: 0,
    isLoading: true,
    err: false,
    pagination: null,
    sort: null,
    sort_by: null,
    order: null
  };
  render() {
    const {
      articles,
      isLoading,
      err,
      pagination,
      total_count,
      p,
      sort
    } = this.state;
    if (err) return <ErrorPage err={err} />;
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
    const { pagination, sort } = this.props;
    this.fetchAllArticles();
    this.setState({ pagination, sort });
  }

  componentDidUpdate(prevProps, prevState) {
    const { p, sort_by, order } = this.state;
    const { author, topic } = this.props;

    if (
      prevState.p !== p ||
      prevState.sort_by !== sort_by ||
      prevState.order !== order ||
      prevProps.author !== author ||
      prevProps.topic !== topic
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
      })
      .catch(err => {
        this.setState({ err, isLoading: false });
      });
  };

  updatePage = p => {
    this.setState({ p });
  };
}

export default ArticleList;
