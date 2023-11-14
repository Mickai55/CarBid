import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { apiAddBid, apiRaiseBid } from "services/ServiceBids";

const BidDialog = (props) => {
  const [newPrice, setNewPrice] = useState(
    props.newPrice || parseInt(props.car.biddingInfo.currentPrice) + 50
  );

  const handleCloseDialog = (confirmed) => {
    if (confirmed === true) {
      const bid = {
        id: props.car.id + new Date().toISOString(),
        carId: props.car.id,
        carName: `${props.car.fabricationYear} ${props.car.brand} ${props.car.model}`,
        user: localStorage.user,
        price: newPrice,
        date: new Date().toISOString(),
      }
      apiAddBid(bid).then(() => {
        apiRaiseBid(bid.carId, bid.price).then((ok) => {
          if (!ok) {
            return;
          }
          if (document.URL.includes('details')) {
            props.fetchCar();
          } else {
            props.fetchCars();
          }
          props.bidWasAddedEvent(parseInt(newPrice));
        })
      })
    }
    props.setOpenBidDialog(false);
  };

  return (
    <>
      <Dialog
        open={props.open}
        onClose={() => handleCloseDialog(false)}
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
            <TextField
              type="number"
              inputProps={{
                step: "50",
              }}
              defaultValue={
                props.newPrice || newPrice
              }
              onChange={(c) => setNewPrice(c.target.value)}
            ></TextField>
          </div>
          <div className="mt-3">
            {newPrice <= props.car.biddingInfo.currentPrice && (
              <div style={{ color: "red" }}>
                The new sum must be larger than the one before
              </div>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseDialog(false)}>Cancel</Button>
          <Button
            disabled={newPrice <= props.car.biddingInfo.currentPrice}
            onClick={() => handleCloseDialog(true)}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BidDialog;
