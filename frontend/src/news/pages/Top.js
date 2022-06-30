import { Link } from "react-router-dom";
import useAxios from "axios-hooks";
import { useState, useEffect } from "react";
import api from "../api/Requests";
import { TagBox } from "../components/TagBox";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DialogButton } from "../components/AddArticleButton";
import { Header } from "../components/Header";

export const Top = () => {
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedOutline, setSelectedOutline] = useState("");
  const [boxState, setBoxState] = useState("none");
  const [articleType, setArticleType] = useState("all");

  const clickButton = (outline) => {
    if (selectedOutline === outline) {
      setBoxState("none");
      setSelectedOutline("");
    } else {
      setBoxState("block");
      setSelectedOutline(outline);
    }
  };

  const handleChange = (event) => {
    setArticleType(event.target.value);
  };

  const apiUrl = (articleType, selectedTag) => {
    console.log(articleType, selectedTag);
    if (selectedTag === "") {
      if (articleType === "all") {
        return "";
      } else if (articleType === "fact") {
        return "comment=False";
      } else {
        return "comment=True";
      }
    } else {
      if (articleType === "all") {
        return `tag=${selectedTag}`;
      } else if (articleType === "fact") {
        return `tag=${selectedTag}&comment=False`;
      } else {
        return `tag=${selectedTag}&comment=True`;
      }
    }
  };
  useEffect(() => {
    // Update the document title using the browser API
    refetch();
  }, [selectedTag]);

  const [{ data: articles, error, loading }, refetch] = useAxios({
    url: api.getArticlesFromQuery.url(apiUrl(articleType, selectedTag)),
    method: api.getArticlesFromQuery.method,
  });
  if (loading || !articles) return <h1>loading...</h1>;
  if (error) return <h1>Error!</h1>;

  const selectTag = (tag) => {
    // console.log(selectedTag, tag);
    setSelectedTag(tag === selectedTag ? "" : tag);
  };

  const isSelectedtTag = (tag) => {
    return selectedTag === tag;
  };

  const getType = (num) => {
    if (num === 0) {
      return "事実";
    } else {
      return "評論";
    }
  };

  const outlines = ["政治", "経済", "スポーツ", "芸能", "エンタメ", "IT"];
  let colors = [
    "inherit",
    "inherit",
    "inherit",
    "inherit",
    "inherit",
    "inherit",
  ];
  if (boxState === "block") {
    colors.splice(outlines.indexOf(selectedOutline), 1, "neutral");
  }

  const theme = createTheme({
    palette: {
      neutral: {
        main: "rgb(170, 170, 170)",
        contrastText: "#fff",
      },
    },
  });

  const radios = [
    { value: "all", label: "全て" },
    { value: "fact", label: "事実" },
    { value: "comment", label: "評論" },
  ];

  const colomns = ["タグ", "種別", "ソース", "日付"];

  //css
  const tagStyle = {
    margin: "0 10px",
    color: "black",
  };

  const tableWrapper = {
    width: "95%",
    margin: "0 auto",
    paddingTop: "40px",
  };

  const tagContainer = {
    backgroundColor: "rgb(250, 250, 250)",
    display: boxState,
    width: "100%",
  };

  const radioButton = {
    marginLeft: "20px",
  };

  const articleLink = {
    color: "black",
  };

  const makeArticle = {
    float: "right",
    color: "black",
    textDecoration: "none",
  };

  //出力
  return (
    <>
      <Header />
      {/* <header>
        <img src={pic} alt="picture" /> */}
      {outlines.map((outline, idx) => (
        <ThemeProvider theme={theme}>
          <Button
            style={tagStyle}
            onClick={() => clickButton(outline)}
            variant="contained"
            color={colors[idx]}
          >
            {outline}
          </Button>
        </ThemeProvider>
      ))}
      <FormControl style={radioButton}>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={articleType}
          onChange={handleChange}
        >
          {radios.map((radio) => (
            <FormControlLabel
              value={radio.value}
              key={radio.value}
              control={<Radio color="default" />}
              label={radio.label}
            />
          ))}
        </RadioGroup>
      </FormControl>
      {/* トップページから追加した記事は全て根の記事 */}
      <DialogButton refetch={refetch} id={0} style={makeArticle} />
      {/* </header> */}
      <main>
        <div style={tagContainer}>
          <TagBox
            value={selectedOutline}
            selectTag={(val) => selectTag(val)}
            isSelectedTag={(val) => isSelectedtTag(val)}
          ></TagBox>
        </div>

        <div style={tableWrapper}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>タイトル</TableCell>
                  {colomns.map((colomn) => (
                    <TableCell align="right">{colomn}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {articles.map((article) => (
                  <TableRow
                    key={article.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Link
                        style={articleLink}
                        to={"/tree/" + article.id.toString()}
                      >
                        {article.title}
                      </Link>
                    </TableCell>
                    <TableCell align="right">{article.tags}</TableCell>
                    <TableCell align="right">
                      {getType(article.comment)}
                    </TableCell>
                    <TableCell align="right">{article.source}</TableCell>
                    <TableCell align="right">{article.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </main>
    </>
  );
};
