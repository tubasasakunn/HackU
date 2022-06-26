import api from "../api/Requests";
import useAxios from "axios-hooks";
import { useForm } from "react-hook-form";

export const AddTag = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

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
        <input {...register("name", { required: true })} />
        {/* エラーハンドリング */}
        {errors.exampleRequired && <span>This field is required</span>}
        <input type="submit" />
      </form>
    </div>
  );
};
