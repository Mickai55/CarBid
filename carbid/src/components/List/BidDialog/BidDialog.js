import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";

const BidDialog = (props) => {
  const handleCloseDialog = () => {
    props.setOpenBidDialog(false);
  };

  return (
    <>
      <Dialog
        open={props.open}
        onClose={handleCloseDialog}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "25vw",
            },
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">
          Bid Vehicle{" "}
          <span className="fw-bold">
            {props.car.fabricationYear} {props.car.brand} {props.car.model}
          </span>
        </DialogTitle>
        <DialogContent>
          <div>Are you sure you want to make the bid?</div>
          <div className="mt-3">
            <TextField defaultValue={props.newPrice || props.car.biddingInfo.currentPrice}></TextField>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleCloseDialog} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BidDialog;
