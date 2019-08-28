import React, { Component } from "react";
import ArticleList from "../components/ArticleList";

class AllArticlesPage extends Component {
  state = {
    article: {},
    isLoading: true,
    showComments: false
  };

  render() {
    const { query } = this.props;
    console.log(query, "<<<< query");
    return (
      <>
        <div className="allArticles">
          <h2>Articles</h2>
          <ArticleList pagination="true" sort="true" topic={query} />
        </div>
      </>
    );
  }
}

export default AllArticlesPage;
