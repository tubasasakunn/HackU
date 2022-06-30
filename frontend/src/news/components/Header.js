import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";
import pic from "../../images/logo.png";

export const Header = (props) => {
  return (
    <React.Fragment>
      <Link to="/">
        <img src={pic} alt="Image" />
      </Link>
    </React.Fragment>
  );
};
