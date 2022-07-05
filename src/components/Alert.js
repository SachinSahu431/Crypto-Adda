import { Snackbar } from "@material-ui/core";
import React from "react";
import { CryptoState } from "../Context";
import MuiAlert from "@material-ui/lab/Alert";

const Alert = () => {
  const { alert, setAlert } = CryptoState();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ opened: false });
  };
  return (
    <Snackbar open={alert.opened} autoHideDuration={3000} onClose={handleClose}>
      <MuiAlert
        onClose={handleClose}
        elevation={10}
        variant="filled"
        severity={alert.type}
      >
        {alert.message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;
