import { useForm, Controller } from "react-hook-form";
import useAxios from "axios-hooks";
import api from "../api/Requests";
import { MultipleSelectChip } from "../components/MultiSelect";
import { format } from "date-fns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LinearProgress } from "@mui/material";
import React from "react";
import {
  TextField,
  Button,
  FormControl,
  FormGroup,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  Switch,
  Grid,
  CssBaseline,
  Container,
  Box,
  Typography,
} from "@mui/material/";

// import { LockOutlinedIcon } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export const AddForm = (props) => {
  /* 初期値*/
  const defaultValues = {
    title: "",
    article: "",
    tags: [],
    outline: "",
    comment: false,
    source: "",
    timestamp: new Date(),
  };

  /* Validationのルール*/
  const validationRules = {
    title: {
      required: "タイトルを入力してください",
    },
    article: {
      required: "記事の内容を入力してください",
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
  // const [
  //   { data: outlines, error: outlineGetError, loading: outlineGetLoading },
  // ] = useAxios({
  //   url: api.getOutlines.url(),
  //   method: api.getOutlines.method,
  // });
  const outlines = {
    outlines: ["政治", "経済", "スポーツ", "芸能", "エンタメ", "IT"],
  };

  const [{ data }, postData] = useAxios(
    { method: api.postArticle.method },
    { manulal: true }
  );

  // if (tagGetLoading || outlineGetLoading || !tags || !outlines)
  //   return <h1>loading...</h1>;
  // if (tagGetError || outlineGetError) return <h1>Error!</h1>;
  // if (tagGetLoading || !tags) return <h1>loading...</h1>;
  // if (tagGetError) return <h1>Error!</h1>;

  if (tagGetLoading || !tags) return <LinearProgress />;
  if (tagGetError) return <h1>Error!</h1>;

  /* 送信時の動作*/
  const onSubmit = (formData) => {
    // 整形
    // formData.tags = formData.tags.filter(Boolean);
    // console.log(formData.comment);
    formData.timestamp = format(formData.timestamp, "yyyy-MM-dd");
    formData.parent = props.parent_id;
    // formData.parent = 1;
    // console.log(formData);
    const post_reload = async () => {
      await postData({
        url: api.postArticle.url(),
        data: formData,
      });
      // alert(`記事を作成しました\n ${JSON.stringify(formData, null, 1)}  `);
      await props.handleClose();
    };
    post_reload();
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="container_main">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              新規記事
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 3 }}
            >
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
                        fullWidth
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
                            renderInput={(params) => (
                              <TextField fullWidth {...params} />
                            )}
                            fullWidth
                          />
                        );
                      }}
                    />
                  </LocalizationProvider>
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
                        minRows={7}
                        fullWidth
                        error={errors.article !== undefined}
                        helperText={errors.article?.message}
                      />
                    )}
                  />
                </Grid>
                {/* 大枠 */}
                <Grid item xs={12} sm={6}>
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
                          fullWidth
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
                        <FormHelperText>
                          {fieldState.error?.message}
                        </FormHelperText>
                      </FormControl>
                    )}
                  />
                </Grid>
                {/* タグ */}
                <Grid item xs={12} sm={6}>
                  <MultipleSelectChip
                    name="tags"
                    control={control}
                    rules={validationRules.tags}
                    tags={tags.tags}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  {/* 記事 or コメント */}
                  <Controller
                    name="comment"
                    control={control}
                    rules={validationRules.comment}
                    render={({ field }) => (
                      <FormGroup>
                        <FormControlLabel
                          control={<Switch {...field} fullWidth />}
                          label="事実"
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
                        fullWidth
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    新規作成
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};
