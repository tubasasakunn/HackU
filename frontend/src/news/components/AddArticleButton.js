import React, { useState } from "react";
import { AddForm } from "./AddArticleForm";
import { Button, Dialog, DialogTitle, DialogActions } from "@mui/material/";

export const DialogButton = (prop) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    prop.refetch();
  };

  const tagStyle = {
    margin: "0 10px",
    color: "black",
  };

  return (
    <div style={prop.style}>
      <Button
        style={tagStyle}
        variant="contained"
        color="inherit"
        onClick={handleClickOpen}
      >
        +記事作成
      </Button>

      {/* ダイアログの作成 */}
      <Dialog
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        maxWidth="sm"
        onClick={handleClose}
      >
        {/* フォームの中身 */}
        <AddForm handleClose={handleClose} id={prop.id} />
        {/* <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
};
