import { useForm, Controller } from "react-hook-form";
import useAxios from "axios-hooks";
import api from "../api/Requests";
import { useState } from "react";
import {
  Stack,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  Switch,
  Grid,
  Box,
  Container,
} from "@mui/material/";

export const InputReactHookFormTextField = () => {
  /* 初期値*/
  const defaultValues = {
    title: "タイトル",
    article: "ここに記事の内容を入力してください",
    tags: [],
    outline: "",
    comment: false,
    source: "ネットニュース",
  };

  /* Validationのルール*/
  const validationRules = {
    title: {
      required: "タイトルを入力してください",
      minLength: { value: 4, message: "4文字以上で入力してください。" },
    },
    article: {
      required: "記事の内容を入力してください",
      minLength: { value: 10, message: "10文字以上で入力してください。" },
    },
    outline: {
      validate: (value) => value !== "" || "いずれかを選択してください。",
    },
    source: {
      required: "ソースを入力してください",
    },
  };

  const [open, setOpen] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });

  /* タグ選択用にタグ一覧を取得　*/
  const [{ data: tags, error: tagGetError, loading: tagGetLoading }] = useAxios(
    {
      url: api.getTags.url(),
      method: api.getTags.method,
    }
  );

  /* 大枠選択用に大枠一覧を取得　*/
  const [
    { data: outlines, error: outlineGetError, loading: outlineGetLoading },
  ] = useAxios({
    url: api.getOutlines.url(),
    method: api.getOutlines.method,
  });

  const [{ data }, postData] = useAxios(
    { method: api.postArticle.method },
    { manulal: true }
  );

  if (tagGetLoading || outlineGetLoading || !tags || !outlines)
    return <h1>loading...</h1>;
  if (tagGetError || outlineGetError) return <h1>Error!</h1>;

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  /* フォーム初期化の動作*/
  const handleClear = () => {
    reset();
  };

  /* 送信時の動作*/
  const onSubmit = (formData) => {
    // console.log(`submit: ${formData.title}`);
    // console.log(`submit: ${formData.article}`);
    // console.log(`submit: ${formData.comment}`);

    formData.tags = formData.tags.filter(Boolean);
    formData.parent = 1;
    formData.timestamp = "2022-06-01";
    postData({
      url: api.postArticle.url(),
      data: formData,
    });
    // alert(JSON.stringify(formData, null, 1));
    alert(`記事を作成しました\n ${JSON.stringify(formData, null, 1)}  `);
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        記事の作成
      </Button>

      {/* ダイアログの作成 */}
      {/* <LocalizationProvider dateAdapter={AdapterDateFns} locale={ja}> */}
      <Dialog
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        maxWidth="sm"
      >
        {/* ダイアログのタイトル */}
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {"記事の追加"}
        </DialogTitle>

        <Container
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* タイトル */}
          <Controller
            name="title"
            control={control}
            rules={validationRules.title}
            render={({ field }) => (
              <TextField
                {...field}
                type="text"
                label="タイトル"
                error={errors.title !== undefined}
                helperText={errors.title?.message}
              />
            )}
          />
          {/* 記事本文 */}
          <Controller
            name="article"
            control={control}
            rules={validationRules.article}
            render={({ field }) => (
              <TextField
                {...field}
                type="text"
                label="記事本文"
                multiline
                rows={5}
                fullWidth
                error={errors.article !== undefined}
                helperText={errors.article?.message}
              />
            )}
          />
          {/* タグ */}
          <FormControl fullWidth>
            <span>タグ</span>

            <FormGroup>
              {tags.tags.map((tag, idx) => {
                return (
                  <Controller
                    name={`tags[${idx}]`}
                    control={control}
                    // rules={validationRules.checks}
                    render={({ field }) => (
                      <FormControlLabel
                        label={tag}
                        control={<Checkbox {...field} checked={field.value} />}
                      />
                    )}
                  />
                );
              })}
            </FormGroup>
            <FormHelperText>{errors.checkerr?.message}</FormHelperText>
          </FormControl>
          {/* 大枠 */}
          <Controller
            name="outline"
            control={control}
            rules={validationRules.outline}
            render={({ field, fieldState }) => (
              <FormControl fullWidth error={fieldState.invalid}>
                <InputLabel id="outline-label">大枠</InputLabel>
                <Select
                  labelId="outline-label"
                  label="大枠" // フォーカスを外した時のラベルの部分これを指定しないとラベルとコントロール線が被る
                  {...field}
                >
                  <MenuItem value="" sx={{ color: "gray" }}>
                    未選択
                  </MenuItem>
                  {outlines.outlines.map((outline) => {
                    return <MenuItem value={outline}>{outline}</MenuItem>;
                  })}
                </Select>
                <FormHelperText>{fieldState.error?.message}</FormHelperText>
              </FormControl>
            )}
          />

          {/* 記事 or コメント */}
          <Controller
            name="comment"
            control={control}
            rules={validationRules.comment}
            render={({ field }) => (
              <FormGroup>
                <FormControlLabel
                  control={<Switch {...field} defaultChecked />}
                  label="コメント or 事実"
                />
              </FormGroup>
            )}
          />

          {/* ソース */}
          <Controller
            name="source"
            control={control}
            rules={validationRules.source}
            render={({ field }) => (
              <TextField
                {...field}
                type="text"
                label="ソース"
                error={errors.source !== undefined}
                helperText={errors.source?.message}
              />
            )}
          />
          {/* 日時 */}
          {/* <Controller
              name="inputValue"
              control={control}
              defaultValue={datetimeLabel}
              render={({ field }) => {
                return (
                  <DatePicker
                    {...field}
                    label="DatePicker"
                    inputFormat="yyyy/MM/dd HH:mm:ss"
                    mask="____/__/__ __:__:__"
                    renderInput={(params) => <TextField {...params} />}
                    onChange={(newValue) => {
                      setValue("inputValue", newValue);
                    }}
                  />
                );
              }}
            /> */}
          <br />
          <Button variant="contained" type="submit">
            送信する
          </Button>
        </Container>
        <DialogActions>
          <Button onClick={handleClear}>Clear</Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      {/* </LocalizationProvider> */}
    </div>
  );
};
