const baseURL = "http://127.0.0.1:8000";
const api = {
  getArticles: { url: () => `${baseURL}/articles`, method: "GET" },
  getArticlesFromQuery: {
    url: (q) => `${baseURL}/articles/?${q}`,
    method: "GET",
  },
  getRelationsFromQuery: {
    url: (q) => `${baseURL}/articles/relation_articles/?${q}`,
    method: "GET",
  },
  getOutlines: { url: () => `${baseURL}/outlines`, method: "GET" },
  getTagsFromQuery: {
    url: (q) => `${baseURL}/tags/?${q}`,
    method: "GET",
  },

  postArticle: { url: () => `${baseURL}/articles`, method: "POST" },
  getTags: { url: () => `${baseURL}/tags`, method: "GET" },
  postTag: { url: () => `${baseURL}/tags`, method: "POST" },
};

export default api;
