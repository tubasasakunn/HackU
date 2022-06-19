import api from "../api/Requests";
import useAxios from "axios-hooks";
import { TagContent } from "../components/TagContent";

export const TagList = () => {
  const [{ data, error, loading }] = useAxios({
    url: api.getTags.url(),
    method: api.getTags.method,
  });

  if (loading || !data) return <h1>loading...</h1>;
  if (error) return <h1>Error!</h1>;

  return (
    <div>
      <h1>タグ一覧</h1>
      {data.tags.map((tag, idx) => (
        <TagContent key={idx} tag={tag} />
      ))}
    </div>
  );
};
