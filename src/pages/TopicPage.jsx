import React from "react";
import ArticleList from "../components/ArticleList";

const TopicPage = props => {
  const { topic } = props;
  return (
    <div>
      <ArticleList topic={topic} />
    </div>
  );
};

export default TopicPage;
