import { useState } from "react";
import { AddForm } from "./AddArticleForm";
import { Button, Dialog, DialogTitle, DialogActions } from "@mui/material/";

export const DialogButton = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        記事の作成
      </Button>

      {/* ダイアログの作成 */}
      <Dialog
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        maxWidth="sm"
      >
        {/* フォームの中身 */}
        <AddForm handleClose={() => handleClose()} />
        {/* <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
};
