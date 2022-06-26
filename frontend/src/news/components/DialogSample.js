import { useState } from "react";
import { AddForm } from "./AddForm";
import { Button, Dialog, DialogTitle, DialogActions } from "@mui/material/";

export const DialogSample = () => {
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
      {/* <LocalizationProvider dateAdapter={AdapterDateFns} locale={ja}> */}
      <Dialog
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        maxWidth="sm"
      >
        {/* ダイアログのタイトル */}
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {"記事の追加"}
        </DialogTitle>
        {/* フォームの中身 */}
        <AddForm />
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      {/* </LocalizationProvider> */}
    </div>
  );
};
