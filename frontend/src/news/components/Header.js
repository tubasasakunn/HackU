import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";
import pic from "../../images/logo.png";

export const Header = (props) => {
  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Link to="/">
          <img src={pic} alt="Image" />
        </Link>
      </Toolbar>
    </React.Fragment>
  );
};
