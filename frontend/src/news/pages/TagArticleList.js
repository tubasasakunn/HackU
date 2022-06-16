import api from "../api/Requests";
import useAxios from "axios-hooks";
import { useParams } from "react-router-dom";
import { ArticleContent } from "../components/ArticleContent";

export const TagArticleList = () => {
  const { tag } = useParams();
  const query = new URLSearchParams({
    tag: tag,
  });
  const [{ data, error, loading }] = useAxios({
    url: api.getArticlesFromQuery.url(query),
    method: api.getArticlesFromQuery.method,
  });

  if (loading || !data) return <h1>loading...</h1>;
  if (error) return <h1>Error!</h1>;

  return (
    <div>
      <h1>'{tag}'タグがついている記事一覧</h1>
      {data.map((d, idx) => (
        <ArticleContent key={idx} {...d} />
      ))}
    </div>
  );
};
