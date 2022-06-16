import api from "../api/Requests";
import useAxios from "axios-hooks";
import { useForm } from "react-hook-form";

export const AddArticle = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [{ data: tags, error, loading }] = useAxios({
    url: api.getTags.url(),
    method: api.getTags.method,
  });

  const [{ data }, postData] = useAxios(
    { method: api.postArticle.method },
    { manulal: true }
  );

  if (loading || !tags) return <h1>loading...</h1>;
  if (error) return <h1>Error!</h1>;

  const onSubmit = (formData) => {
    formData.tags = formData.tags.filter(Boolean);
    console.log(3);
    console.log(formData);
    postData({
      url: api.postArticle.url(),
      data: formData,
    });
    // alert(JSON.stringify(formData, null, 1));
  };

  if (data)
    return (
      <div>
        <h1>記事を追加しました</h1>;{JSON.stringify(data, null, 1)}
      </div>
    );
  console.log(watch(data));

  return (
    <div>
      <h1>記事を追加</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>タイトル</p>
        <input {...register("title", { required: true })} />
        {errors.title && <span>Title is required</span>}
        <p>記事本文</p>
        <textarea {...register("article", { required: true })}>
          ここに記事の内容を入力
        </textarea>
        {errors.article && <span>Article is required</span>}
        <p>タグ</p>
        {tags.tags.map((tag, idx) => {
          return (
            <label>
              <input
                type="checkbox"
                value={tag}
                {...register(`tags[${idx}]`)}
              />
              {tag}
            </label>
          );
        })}
        <p>コメント</p>
        <input type="checkbox" {...register("comment")} />
        <p>記事の日付</p>
        <input
          type="date"
          value="2022-06-01"
          {...register("timestamp", { required: true })}
        />
        {errors.timestamp && <span>Timestamp is required</span>}
        <br />
        <input type="submit" value="送信" />
      </form>
    </div>
  );
};
