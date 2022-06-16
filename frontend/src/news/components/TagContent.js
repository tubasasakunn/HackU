import React from "react";
import { Link } from "react-router-dom";

export const TagContent = ({ tag }) => {
  return (
    <div>
      <Link to={`/tags/${tag}`}>
        <h1>{tag}</h1>
      </Link>
    </div>
  );
};
