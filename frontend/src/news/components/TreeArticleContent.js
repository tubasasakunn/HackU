import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReactMarkdown from "react-markdown";
import { DialogButton } from "./AddArticleButton";
const path = "../tree/";

// export class TreeArticleContent extends React.Component {
export const TreeArticleContent = (props) => {
  let rate, defaultExpanded;
  switch (props.class) {
    case "parent":
      rate = 0.0;
      defaultExpanded = false;
      break;
    case "child":
      rate = 0.4;
      defaultExpanded = false;
      break;
    case "bro":
      rate = 0.2;
      defaultExpanded = false;
      break;
    case "self":
      rate = 0.2;
      defaultExpanded = true;
      break;
    default:
      rate = 1.0;
      defaultExpanded = false;
  }

  let titlecolor, titlebackgroundColor, articlecolor, articlebackgroundColor;
  if (props.comment) {
    titlebackgroundColor = {
      backgroundColor: "#a4bbf3",
    };
    articlebackgroundColor = {
      backgroundColor: "#bbccf6",
    };
    titlecolor = "black";
    articlecolor = "black";
  } else {
    titlebackgroundColor = {
      backgroundColor: "#a9afbd",
    };
    articlebackgroundColor = {
      backgroundColor: "#bfc3ce",
    };
    titlecolor = "black";
    articlecolor = "black";
  }

  const x = document.body.scrollWidth;
  const y = document.body.scrollHeight;
  const sx = {
    width: x * (1 - rate),
    height: 0,
    ml: (x * rate) / 8,
    //pt:(props.num-1)*y/8
  };

  return (
    <Accordion
      defaultExpanded={defaultExpanded}
      id={String(props.id)}
      onChange={props.onClick}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        sx={titlebackgroundColor}
        id={String(props.id) + "top"}
      >
        <Typography color={titlecolor}>
          <a href={path + String(props.id)}>{props.title}</a>
        </Typography>
      </AccordionSummary>

      <AccordionDetails
        sx={articlebackgroundColor}
        id={String(props.id) + "buttom"}
      >
        <Typography color={articlecolor}>
          <ReactMarkdown>{props.article}</ReactMarkdown>
        </Typography>
        <DialogButton
          id={props.id}
          refetch={props.refetch}
          style={props.style}
        />
      </AccordionDetails>
    </Accordion>
  );
};
