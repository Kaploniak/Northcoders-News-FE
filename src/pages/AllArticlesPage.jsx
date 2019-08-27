import React, { Component } from "react";
import ArticleList from "../components/ArticleList";
import ArticlePagination from "../components/ArticlePagination";

class AllArticlesPage extends Component {
  render() {
    return (
      <>
        <div className="allArticles">
          <h2>Articles</h2>
          <ArticleList />
          <ArticlePagination />
        </div>
      </>
    );
  }
}

export default AllArticlesPage;
