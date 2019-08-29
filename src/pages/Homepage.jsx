import React from "react";
import ArticleList from "../components/ArticleList";

const Homepage = () => {
  return (
    <>
      <div className="newArticles">
        <h2>Fresh Articles</h2>
        <ArticleList limit="4" />
      </div>
      <div className="bestArticles">
        <h2>Top Articles</h2>
        <ArticleList sort="votes" limit="4" />
      </div>
    </>
  );
};

export default Homepage;
