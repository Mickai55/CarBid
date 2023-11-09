import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React, { useState } from "react";

const Notifications = (props) => {
  const handleCloseRegisterSnack = (event, reason) => {
    props.setOpenRegisterSnack(false);
  };
  const handleCloseLogoutSnack = (event, reason) => {
    props.setOpenLogoutSnack(false);
  };
  const handleCloseLoginSnack = (event, reason) => {
    props.setOpenLoginSnack(false);
  };
  const handleCloseCarWasAddedSnack = (event, reason) => {
    props.setOpenCarWasAddedSnack(false);
  };
  const handleCloseCarWasEditedSnack = (event, reason) => {
    props.setOpenCarWasEditedSnack(false);
  };
  const handleCloseCarWasDeletedSnack = (event, reason) => {
    props.setOpenCarWasDeletedSnack(false);
  };
  const handleCloseBidWasAddedSnack = (event, reason) => {
    props.setOpenBidWasAddedSnack(false);
  };

  return (
    <>
      <Snackbar
        open={props.openRegisterSnack}
        autoHideDuration={6000}
        onClose={handleCloseRegisterSnack}
      >
        <Alert severity="success">Register successful!</Alert>
      </Snackbar>
      <Snackbar
        open={props.openLogoutSnack}
        autoHideDuration={6000}
        onClose={handleCloseLogoutSnack}
      >
        <Alert severity="info">Logout successful!</Alert>
      </Snackbar>
      <Snackbar
        open={props.openLoginSnack}
        autoHideDuration={6000}
        onClose={handleCloseLoginSnack}
      >
        <Alert severity="info">Login successful!</Alert>
      </Snackbar>
      <Snackbar
        open={props.openCarWasAddedSnack}
        autoHideDuration={6000}
        onClose={handleCloseCarWasAddedSnack}
      >
        <Alert severity="success">Car was added!</Alert>
      </Snackbar>
      <Snackbar
        open={props.openCarWasEditedSnack}
        autoHideDuration={6000}
        onClose={handleCloseCarWasEditedSnack}
      >
        <Alert severity="success">Car was edited!</Alert>
      </Snackbar>
      <Snackbar
        open={props.openCarWasDeletedSnack}
        autoHideDuration={6000}
        onClose={handleCloseCarWasDeletedSnack}
      >
        <Alert severity="success">Car was deleted!</Alert>
      </Snackbar>
      <Snackbar
        open={props.openBidWasAddedSnack}
        autoHideDuration={6000}
        onClose={handleCloseBidWasAddedSnack}
      >
        <Alert severity="success">Bid was added!</Alert>
      </Snackbar>
    </>
  );
};

export default Notifications;
