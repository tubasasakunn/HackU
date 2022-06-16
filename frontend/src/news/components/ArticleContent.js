import React from "react";
import { Link } from "react-router-dom";

export const ArticleContent = (article) => {
  return (
    <div>
      <Link to={`/articles/${article.id}`}>
        <h1>{article.title}</h1>
      </Link>
    </div>
  );
};
