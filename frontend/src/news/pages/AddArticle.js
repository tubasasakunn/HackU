import api from "../api/Requests";
import useAxios from "axios-hooks";
import { useForm } from "react-hook-form";

export const AddArticle = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange", // フォーム入力時にバリデーションを実行する
    criteriaMode: "all", // 全てのエラーを表示
    shoudleFocusErro: "false;", // Validationに失敗したところにフォーカスが移動しない
  });

  /* タグ選択用にタグ一覧を取得　*/
  const [{ data: tags, error: tagGetError, loading: tagGetLoading }] = useAxios(
    {
      url: api.getTags.url(),
      method: api.getTags.method,
    }
  );

  const [{ data }, postData] = useAxios(
    { method: api.postArticle.method },
    { manulal: true }
  );

  if (tagGetLoading || !tags) return <h1>loading...</h1>;
  if (tagGetError) return <h1>Error!</h1>;

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
        <h1>記事を追加しました</h1>
        {JSON.stringify(data, null, 1)}
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
        <p>ソース</p>
        <input {...register("source", { required: true })} />
        {errors.source && <span>Source is required</span>}
        <p>親子関係</p>
        <input
          {...register("parent", { required: true, pattern: /^[0-9]+$/ })}
        />
        {errors.parent?.types.required && <span>Parent is required</span>}
        {errors.parent?.types.pattern && <span>Please input Num</span>}
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
