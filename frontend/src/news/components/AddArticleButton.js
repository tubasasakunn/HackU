import React, { useState, useCallback } from "react";
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
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

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
        <div onClick={stopPropagation} style={{ padding: "16px" }}>
          {/* フォームの中身 */}
          <AddForm handleClose={handleClose} id={prop.id} />
          {/* <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions> */}
        </div>
      </Dialog>
    </div>
  );
};
