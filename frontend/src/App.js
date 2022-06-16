import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Top } from "./news/pages/Top";
import { ArticleList } from "./news/pages/ArticleList";
import { ArticleDetail } from "./news/pages/ArticleDetail";
import { AddArticle } from "./news/pages/AddArticle";
import { TagList } from "./news/pages/TagList";
import { TagArticleList } from "./news/pages/TagArticleList";
import { AddTag } from "./news/pages/AddTag";
import { NotFound } from "./news/pages/NotFound";

import "./css/index.css";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Top />} />
            <Route path="/articles" element={<ArticleList />} />
            <Route path="/articles/:id" element={<ArticleDetail />} />
            <Route path="/addArticle" element={<AddArticle />} />
            <Route path="/tags" element={<TagList />} />
            <Route path="/addTag" element={<AddTag />} />
            <Route path="/tags/:tag" element={<TagArticleList />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
