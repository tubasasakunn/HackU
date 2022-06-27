import { Link } from "react-router-dom";
import useAxios from "axios-hooks";
import { useState } from "react";
import { useContext } from "react";
import api from "../api/Requests";
import { TagBox } from "../components/TagBox"
import { SelectedTagContext } from "../components/providers/selectedTagProvider";
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const Top = () => {
  const { selectedTag } = useContext(SelectedTagContext);

  const [outlineIndex, setOutlineIndex] = useState();
  const [boxState, setBoxState] = useState("none");

  const clickButton = (clickedIndex) => {
    setBoxState(() => {
      if (clickedIndex == outlineIndex) {
        if (boxState == "none") {
          return("block");
        }else {
          return("none");
        }
      }else {
        return("block");
      }
    })
    setOutlineIndex(clickedIndex);
  }

  const [articleType, setArticleType] = useState("all");

  const handleChange = (event) => {
    setArticleType(event.target.value);
  };

  const apiUrl = (articleType, selectedTag) => {
    const defaultUrl = "http://127.0.0.1:8000/articles/";
    if (selectedTag == "") {
      if (articleType == "all") {
        return(defaultUrl);
      }else if (articleType == "fact") {
        return(defaultUrl+"?comment=False");
      }else {
        return(defaultUrl+"?comment=True");
      }
    }else {
      if (articleType == "all") {
        return(defaultUrl+`?tag=${selectedTag}`);
      }else if (articleType == "fact") {
        return(defaultUrl+`?tag=${selectedTag}&comment=False`);
      }else {
        return(defaultUrl+`?tag=${selectedTag}&comment=True`);
      }
    }
  };

  const [{ data, error, loading }] = useAxios({
    url: apiUrl(articleType, selectedTag),
    method: api.getArticles.method,
  });
  if (loading || !data) return <h1>loading...</h1>;
  if (error) return <h1>Error!</h1>;

  const getType = (num) => {
    if (num === 0) {
      return("事実");
    }else{
      return("評論");
    }
  };

  let colors = ["inherit", "inherit", "inherit", "inherit", "inherit"];
  if (boxState == "block") {
    colors.splice(outlineIndex, 1, "neutral");
  }

  const theme = createTheme({
    palette: {
      neutral: {
        main: 'rgb(170, 170, 170)',
        contrastText: '#fff',
      },
    },
  });

  const outlines = [
    {name: "政治", color: colors[0]},
    {name: "経済", color: colors[1]},
    {name: "スポーツ", color: colors[2]},
    {name: "芸能", color: colors[3]},
    {name: "エンタメ", color: colors[4]},
  ];

  const radios = [
    {value: "all", label: "全て"},
    {value: "fact", label: "事実"},
    {value: "comment", label: "評論"}
  ];

  const colomns = ["タグ", "種別", "ソース", "日付"];

  //css
  const tagStyle = {
    margin: "0 10px",
    color: "black"
  };

  const tableWrapper = {
    width: "95%",
    margin: "0 auto",
    paddingTop: "40px"
  }

  const tagContainer = {
    backgroundColor: "rgb(250, 250, 250)",
    display: boxState,
    width: "100%",
  }

  const makeArticle = {
    float: "right",
    color: "black",
    textDecoration: "none"
  }
 
  const radioButton = {
    marginLeft: "20px"
  }

  const articleLink = {
    color: "black"
  }

  //出力
  return (
    <>
      <header>
        <h1>News App</h1>
        {outlines.map((outline) => (
          <ThemeProvider theme={theme}>
            <Button style={tagStyle} onClick={() => clickButton(outlines.indexOf(outline))} variant="contained" color={outline.color}>{outline.name}</Button>
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
              <FormControlLabel value={radio.value} control={<Radio color="default"/>} label={radio.label} />
            ))}
          </RadioGroup>
        </FormControl>

        <Link to="/addArticle" style={makeArticle}>
          <Button style={tagStyle} variant="contained" color="inherit">+記事作成</Button>
        </Link>
      </header>

      <main>
        <div style={tagContainer}>
          <TagBox value={outlineIndex}></TagBox>
        </div>
      
        <div style = {tableWrapper}>
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
                {data.map((data) => (
                  <TableRow
                    key={data.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Link style={articleLink} to={"/tree/:" + data.id.toString()}>{data.title}</Link>
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
      </main>
    </>
  );
};
