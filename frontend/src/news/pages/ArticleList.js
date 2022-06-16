import api from "../api/Requests";
import useAxios from "axios-hooks";
import { ArticleContent } from "../components/ArticleContent";

export const ArticleList = () => {
  const [{ data, error, loading }] = useAxios({
    url: api.getArticles.url(),
    method: api.getArticles.method,
  });

  if (loading || !data) return <h1>loading...</h1>;
  if (error) return <h1>Error!</h1>;

  return (
    <div>
      <h1>記事一覧</h1>
      {data.map((d, idx) => (
        <ArticleContent key={idx} {...d} />
      ))}
    </div>
  );
};
