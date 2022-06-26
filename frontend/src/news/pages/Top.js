import { Link } from "react-router-dom";
import { DialogSample } from "../components/DialogSample";
import { InputReactHookFormTextField } from "../components/AddArticleForm";
import { FormDialog } from "../components/FormDialog";

export const Top = () => {
  return (
    <div>
      <h1>News App</h1>
      <ol>
        <li>
          <Link to="/addArticle">記事作成 </Link>
        </li>
        <li>
          <Link to="/articles">記事一覧</Link>
        </li>
        <li>
          <Link to="/addTag">タグ作成 </Link>
        </li>
        <li>
          <Link to="/tags">タグ一覧</Link>
        </li>
      </ol>
      <dir>
        {/* <DialogSample /> */}
        <FormDialog />
      </dir>
    </div>
  );
};
