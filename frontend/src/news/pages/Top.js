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
import { LinearProgress } from "@mui/material";
import axios from "axios";

export const Top = () => {
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedOutline, setSelectedOutline] = useState("");
  const [selectedArticleType, setSelectedArticleType] = useState("all");
  // const [tagObj, setTagObj] = useState({});
  const [boxState, setBoxState] = useState("none");

  // let selectedOutline = "";
  // let selectedTag = "";
  // let selectedArticleType = "all";
  // const setSelectedArticleType = (articletype) => {
  //   selectedArticleType = articletype;
  // };
  // const setSelectedOutline = (outline) => {
  //   selectedOutline = outline;
  // };
  // const setSelectedTag = (tag) => {
  //   selectedTag = tag;
  // };

  const clickButton = (outline) => {
    if (selectedOutline === outline) {
      setBoxState("none");
      setSelectedOutline("");
    } else {
      setBoxState("block");
      setSelectedOutline(outline);
    }
  };

  const outlines = ["政治", "経済", "スポーツ", "芸能", "エンタメ", "IT"];

  const handleChange = (event) => {
    setSelectedArticleType(event.target.value);
  };

  useEffect(() => {
    refetch();
    // }, [selectedOutline, selectedArticleType, selectedTag]);
    // }, [selectedArticleType, selectedOutline]);
    // async function fetchTag(outline) {
    //   const res = await axios.get(
    //     api.getTagsFromQuery.url(`outline=${outline}`)
    //   );
    //   setTagObj({ ...tagObj, [outline]: res.data.tags });
    // }
    // async function fetchOutline() {
    //   for (const outline of outlines) {
    //     await fetchTag(outline);
    //   }
    // }
    // fetchOutline();
  }, [selectedTag]);

  /* 記事を取得 */
  const [{ data: articles, error, loading }, refetch] = useAxios({
    url: api.getArticles.url(),
    method: api.getArticles.method,
  });

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

  // const radios = [
  //   { value: "all", label: "全て" },
  //   { value: "fact", label: "事実" },
  //   { value: "comment", label: "評論" },
  // ];
  // const radios = { all: "全て", fact: "事実", comment: "評論" };
  const radios = { 全て: "all", 事実: "fact", 評論: "comment" };
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
  // console.log(tagObj);

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
          value={selectedArticleType}
          onChange={handleChange}
        >
          {Object.keys(radios).map((key) => (
            <FormControlLabel
              value={radios[key]}
              key={radios[key]}
              control={<Radio color="default" />}
              label={key}
            />
          ))}
        </RadioGroup>
      </FormControl>
      {/* トップページから追加した記事は全て根の記事 */}
      <DialogButton refetch={refetch} parent_id={0} style={makeArticle} />
      {/* </header> */}
      <main>
        <div style={tagContainer}>
          <TagBox
            value={selectedOutline}
            selectTag={(val) => selectTag(val)}
            isSelectedTag={(val) => isSelectedtTag(val)}
          ></TagBox>
        </div>

        {loading ? (
          <LinearProgress />
        ) : (
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
                  {articles
                    .filter((article) => {
                      // console.log(
                      //   article.comment,
                      //   radios[article.comment],
                      //   selectedArticleType
                      // );
                      return (
                        (selectedArticleType === "all" ||
                          radios[getType(article.comment)] ===
                            selectedArticleType) &&
                        (selectedOutline === "" ||
                          article.outline === selectedOutline) &&
                        (selectedTag === "" ||
                          article.tags.includes(selectedTag))
                      );
                    })
                    .map((article) => (
                      <TableRow
                        key={article.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
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
                  {/* {articles.map((article) => (
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
                  ))} */}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </main>
    </>
  );
};
