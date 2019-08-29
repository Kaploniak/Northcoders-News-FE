import React from "react";
import ArticleList from "../components/ArticleList";

const AllArticlesPage = props => {
  const { topic, author } = props;
  return (
    <>
      <div className="allArticles">
        <h2>Articles</h2>
        <ArticleList
          pagination="true"
          sortOption="true"
          topic={topic}
          author={author}
        />
      </div>
    </>
  );
};

export default AllArticlesPage;
