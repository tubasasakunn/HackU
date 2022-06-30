import api from "../api/Requests";
import useAxios from "axios-hooks";
import { useState } from "react";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { CircularProgress } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { Container, Grid, Box } from "@mui/material";

export const TagBox = (props) => {
  const [displayInput, setDisplayInput] = useState("none");

  /* 初期値*/
  const defaultValues = {
    tag: "",
  };

  /* Validationのルール*/
  const validationRules = {
    tag: {
      required: "タグ名を入力してください",
      validate: (val) => !tags.tags.includes(val) || "タグが既に存在します",
    },
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });

  // タグをポスト
  const [{ data }, postData] = useAxios(
    { method: api.postTag.method },
    { manulal: true }
  );

  // タグ名を取得
  const [{ data: tags, error, loading }, refetch] = useAxios({
    url: api.getTagsFromQuery.url(`outline=${props.value}`),
    method: api.getTags.method,
  });

  if (loading || !tags) return <CircularProgress />;
  if (error) return <h1>Error!</h1>;

  const onSubmit = (formDate) => {
    formDate.outline = props.value;
    console.log(formDate);
    const post_reload = async () => {
      // await setDisplayInput(displayInput === "none" ? "block" : "none");
      await postData({
        url: api.postTag.url(),
        data: formDate,
      });
      await refetch();
    };
    post_reload();
  };

  const clickButton = () => {
    setDisplayInput(displayInput === "none" ? "block" : "none");
  };

  const clickTag = (tag) => {
    props.selectTag(tag);
  };

  const getTagColors = () => {
    let colors = [];
    for (let i = 0; i < tags.tags.length; i++) {
      if (props.isSelectedTag(tags.tags[i])) {
        colors.push("neutral");
      } else {
        colors.push("inherit");
      }
    }
    return colors;
  };

  const getColor = (displayInput) => {
    if (displayInput === "none") {
      return "inherit";
    } else {
      return "neutral";
    }
  };

  const theme = createTheme({
    palette: {
      neutral: {
        main: "rgb(170, 170, 170)",
        contrastText: "black",
      },
    },
  });

  const tagStyle = {
    marginRight: "20px",
  };

  const tagBox = {
    borderTop: "solid 4px",
    borderColor: "rgb(120, 120, 120)",
    padding: "30px 20px",
    width: "95%",
    margin: "0 auto",
  };

  const inputBox = {
    display: displayInput,
    marginTop: "30px",
  };

  const fieldStyle = {
    marginRight: "20px",
    width: "200px",
  };

  return (
    <>
      <div style={tagBox}>
        <ThemeProvider theme={theme}>
          {/* 既存のタグのリストを表示 */}
          {tags.tags.map((tag) => (
            <Button
              onClick={() => clickTag(tag)}
              style={tagStyle}
              variant="contained"
              color={getTagColors()[tags.tags.indexOf(tag)]}
            >
              {tag}
            </Button>
          ))}
          {/* タグ追加ボタン */}
          <Button
            onClick={clickButton}
            style={tagStyle}
            variant="contained"
            color={getColor(displayInput)}
          >
            +新規タグ
          </Button>

          {/* タグ追加フォーム */}
          <div style={inputBox}>
            <Box
              container
              style={inputBox}
              component="form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Controller
                name="name"
                control={control}
                rules={validationRules.tag}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="text"
                    label="タグ名"
                    style={fieldStyle}
                    error={errors.name !== undefined}
                    helperText={errors.name?.message}
                    size="small"
                  />
                )}
              />

              <Button
                // onClick={onSubmit}
                style={tagStyle}
                variant="contained"
                color="inherit"
                type="submit"
              >
                送信
              </Button>
            </Box>
          </div>
        </ThemeProvider>
      </div>
    </>
  );
};
