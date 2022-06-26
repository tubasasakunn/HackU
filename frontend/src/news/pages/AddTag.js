import api from "../api/Requests";
import useAxios from "axios-hooks";
import { useForm } from "react-hook-form";

export const AddTag = () => {
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

  const [{ data }, postData] = useAxios(
    { method: api.postTag.method },
    { manulal: true }
  );

  const onSubmit = (formData) => {
    postData({
      url: api.postTag.url(),
      data: formData,
    });
    // alert(JSON.stringify(formData, null, 1));
  };

  if (data) return <h1>'{data.name}'タグを追加しました</h1>;
  console.log(watch(data));

  return (
    <div>
      <h1>タグを追加</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        タグ名
        <br />
        <input {...register("name", { required: true })} />
        {errors.name && <span>Name is required</span>}
        <br />
        大枠
        <br />
        <input {...register("outline", { required: true })} />
        {errors.outline && <span>outline is required</span>}
        <br />
        <input type="submit" />
      </form>
    </div>
  );
};
