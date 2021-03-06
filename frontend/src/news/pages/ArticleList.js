import { Link } from "react-router-dom";
import useAxios from "axios-hooks";
import { useState } from "react";
import { useContext } from "react";
import api from "../api/Requests";
import { TagBox } from "../components/TagBox";
import { SelectedTagContext } from "../components/providers/selectedTagProvider";
import pic from "../../images/logo.png";
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

export const Top = () => {
  const { selectedTag } = useContext(SelectedTagContext);
  const [outlineIndex, setOutlineIndex] = useState();
  const [boxState, setBoxState] = useState("none");
  const [articleType, setArticleType] = useState("all");

  const clickButton = (clickedIndex) => {
    setBoxState(() => {
      if (clickedIndex === outlineIndex) {
        if (boxState === "none") {
          return "block";
        } else {
          return "none";
        }
      } else {
        return "block";
      }
    });
    setOutlineIndex(clickedIndex);
  };

  const handleChange = (event) => {
    setArticleType(event.target.value);
  };

  const apiUrl = (articleType, selectedTag) => {
    const defaultUrl = "http://127.0.0.1:8000/articles/";
    if (selectedTag === "") {
      if (articleType === "all") {
        return defaultUrl;
      } else if (articleType === "fact") {
        return defaultUrl + "?comment=False";
      } else {
        return defaultUrl + "?comment=True";
      }
    } else {
      if (articleType === "all") {
        return defaultUrl + `?tag=${selectedTag}`;
      } else if (articleType === "fact") {
        return defaultUrl + `?tag=${selectedTag}&comment=False`;
      } else {
        return defaultUrl + `?tag=${selectedTag}&comment=True`;
      }
    }
  };

  const [{ data, error, loading }, refetch] = useAxios({
    url: apiUrl(articleType, selectedTag),
    method: api.getArticles.method,
  });
  if (loading || !data) return <h1>loading...</h1>;
  if (error) return <h1>Error!</h1>;

  const getType = (num) => {
    if (num === 0) {
      return "??????";
    } else {
      return "??????";
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
    colors.splice(outlineIndex, 1, "neutral");
  }

  const colomns = ["??????", "??????", "?????????", "??????"];

  //css
  const tableWrapper = {
    width: "95%",
    margin: "0 auto",
    paddingTop: "40px",
  };

  const articleLink = {
    color: "black",
  };

  //??????
  return (
    <>
      <div style={tableWrapper}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>????????????</TableCell>
                {colomns.map((colomn) => (
                  <TableCell align="right">{colomn}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((data) => (
                <TableRow
                  key={data.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Link
                      style={articleLink}
                      to={"/tree/" + data.id.toString()}
                    >
                      {data.title}
                    </Link>
                  </TableCell>
                  <TableCell align="right">{data.tags}</TableCell>
                  <TableCell align="right">{getType(data.comment)}</TableCell>
                  <TableCell align="right">{data.source}</TableCell>
                  <TableCell align="right">{data.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};
