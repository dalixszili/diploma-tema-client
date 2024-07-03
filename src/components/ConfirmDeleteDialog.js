import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

function ConfirmDeleteDialog({ open, handleClose, handleDelete }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Törlés visszaigazolása</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Biztosan törölni szeretné ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Nem
        </Button>
        <Button variant="contained" onClick={handleDelete} autoFocus>
          Igen
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDeleteDialog;
