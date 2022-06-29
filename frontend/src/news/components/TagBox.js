import api from "../api/Requests";
import useAxios from "axios-hooks";
import { useState } from "react";
import { useContext } from "react";
import { SelectedTagContext } from "./providers/selectedTagProvider";
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

export const TagBox = (props) => {
  const { selectedTag, setSelectedTag } = useContext(SelectedTagContext);
  const [displayInput, setDisplayInput] = useState("none");
  const [newTag, setNewTag] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [displayError, setDisplayError] = useState("none");
  const outlines = ["政治", "経済", "スポーツ", "芸能", "エンタメ"];

  const apiUrl = (outline) => {
    return (`http://127.0.0.1:8000/tags/?outline=${outline}`);
  }

  const [{ newData }, postData] = useAxios(
    { method: api.postTag.method },
    { manulal: true }
  );

  const [{ data, error, loading }] = useAxios({
    url: apiUrl(outlines[props.value]),
    method: api.getTags.method,
  });

  if (loading || !data) return <h1>loading...</h1>;
  if (error) return <h1>Error!</h1>;

  const handleChange = (event) => {
    setNewTag(event.target.value);
  }

  const onSubmit = () => {
    if (newTag == "") {
      setDisplayError("inline");
      setErrorMessage("タグ名を入力してください");
    } else if (data.tags.indexOf(newTag) >= 0) {
      setDisplayError("inline");
      setErrorMessage("タグがすでに存在します");
    } else {
      setDisplayError("none");
      postData({
        url: api.postTag.url(),
        data: {
          name: newTag,
          outline: outlines[props.value]
        },
      });
      window.location.reload();
    };
  };

  const clickButton = () => {
    setDisplayInput(() => {
      if (displayInput == "none") {
        return ("block");
      } else {
        return ("none");
      };
    })
  };

  const clickTag = (tag) => {
    if (selectedTag == tag) {
      setSelectedTag("");
    } else {
      setSelectedTag(tag);
    }
  }

  const getTagColors = () => {
    let colors = [];
    for (let i = 0; i < data.tags.length; i++) {
      if (data.tags[i] == selectedTag) {
        colors.push("neutral");
      } else {
        colors.push("inherit");
      }
    };
    return colors;
  }

  const getColor = (displayInput) => {
    if (displayInput == "none") {
      return ("inherit");
    } else {
      return ("neutral");
    }
  };

  const theme = createTheme({
    palette: {
      neutral: {
        main: 'rgb(170, 170, 170)',
        contrastText: 'black',
      },
    },
  });

  const tagStyle = {
    marginRight: "20px"
  };

  const tagBox = {
    borderTop: "solid 4px",
    borderColor: "rgb(120, 120, 120)",
    padding: "30px 20px",
    width: "95%",
    margin: "0 auto"
  };

  const inputBox = {
    display: displayInput,
    marginTop: "30px"
  };

  const fieldStyle = {
    marginRight: "20px",
    width: "200px"
  };

  const errorStyle = {
    display: displayError,
    color: "red",
    height: "20px"
  };

  return (
    <>
      <div style={tagBox}>
        <ThemeProvider theme={theme}>
          {data.tags.map((tag) => (
            <Button onClick={() => clickTag(tag)} style={tagStyle} variant="contained" color={getTagColors()[data.tags.indexOf(tag)]}>{tag}</Button>
          ))}
          <Button onClick={clickButton} style={tagStyle} variant="contained" color={getColor(displayInput)}>+新規タグ</Button>

          <div style={inputBox}>
            <TextField value={newTag} onChange={handleChange} style={fieldStyle} color="neutral" size="small" label="タグ名" variant="outlined" />
            <Button onClick={onSubmit} style={tagStyle} variant="contained" color="inherit">送信</Button>
            <p style={errorStyle}>{errorMessage}</p>
          </div>
        </ThemeProvider>
      </div>
    </>
  );
};