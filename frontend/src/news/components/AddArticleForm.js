import { useForm, Controller } from "react-hook-form";
import useAxios from "axios-hooks";
import api from "../api/Requests";
import { MultipleSelectChip } from "./MultiSelect";
import { format } from "date-fns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React from "react";
import {
  TextField,
  Button,
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
} from "@mui/material/";

export const AddForm = (props) => {
  /* 初期値*/
  const defaultValues = {
    title: "タイトル",
    article: "ここに記事の内容を入力してください",
    tags: [],
    outline: "",
    comment: false,
    source: "ネットニュース",
    timestamp: new Date(),
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

  const {
    control,
    handleSubmit,
    getValues,
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

  /* 送信時の動作*/
  const onSubmit = (formData) => {
    // 整形
    // formData.tags = formData.tags.filter(Boolean);
    formData.timestamp = format(formData.timestamp, "yyyy-MM-dd");
    formData.parent = 1;
    console.log(formData.timestamp);
    postData({
      url: api.postArticle.url(),
      data: formData,
    });
    // alert(`記事を作成しました\n ${JSON.stringify(formData, null, 1)}  `);
    props.handleClose();
  };

  // チェックボックス選択時の動作
  // const checkCheckBox = (checkedTag) => {
  //   const { tags } = getValues();
  //   const new_tags = tags.includes(checkedTag)
  //     ? tags.filter((tag) => tag !== checkedTag)
  //     : [...tags, checkedTag];

  //   return new_tags;
  // };

  return (
    <React.Fragment>
      <Grid
        container
        component="form"
        ustify="center"
        direction="column"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid item>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
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
            </Grid>

            <Grid item xs={12} sm={6}>
              {/* 日時 */}
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Controller
                  name="timestamp"
                  control={control}
                  render={({ field }) => {
                    return (
                      <DatePicker
                        {...field}
                        label="日付"
                        inputFormat="yyyy-MM-dd"
                        mask="____-__-__"
                        renderInput={(params) => <TextField {...params} />}
                      />
                    );
                  }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
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
        </Grid>
        <Grid item xs={12}>
          {/* タグ */}
          {/* <FormControl fullWidth>
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
          </FormControl> */}
          {/* <FormControl>
            <span>タグ</span>
            <Controller
              name="tags"
              render={(field) =>
                tags.tags.map((tag, idx) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={() => field.onChange(checkCheckBox(tag))}
                      />
                    }
                    key={idx}
                    label={tag}
                  />
                ))
              }
              control={control}
            />
          </FormControl> */}

          <MultipleSelectChip
            name="tags"
            control={control}
            rules={validationRules.tags}
            tags={tags.tags}
          />
        </Grid>

        {/* 大枠 */}
        <Grid item xs={12}>
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
                    return (
                      <MenuItem key={outline} value={outline}>
                        {outline}
                      </MenuItem>
                    );
                  })}
                </Select>
                <FormHelperText>{fieldState.error?.message}</FormHelperText>
              </FormControl>
            )}
          />
        </Grid>

        <Grid item>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
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
            </Grid>

            {/* ソース */}
            <Grid item xs={12} sm={6}>
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
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" type="submit">
            送信する
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
