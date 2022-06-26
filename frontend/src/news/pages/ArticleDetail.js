import { useParams } from "react-router-dom";
import api from "../api/Requests";
import useAxios from "axios-hooks";

export const ArticleDetail = () => {
  const { id } = useParams();
  const query = new URLSearchParams({
    id: id,
  });
  console.log(api.getArticlesFromQuery.url(query));
  const [{ data, error, loading }] = useAxios({
    url: api.getArticlesFromQuery.url(query),
    method: api.getArticlesFromQuery.method,
  });

  if (loading || !data) return <h1>loading...</h1>;
  if (error) return <h1>Error!</h1>;

  return (
    <div>
      <h1>記事詳細</h1>
      {data.map((d) => JSON.stringify(d, null, 1))}
      {/* {JSON.stringify(data[0], null, 1)} */}
    </div>
  );
};
