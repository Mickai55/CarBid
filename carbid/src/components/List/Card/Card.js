import {
  CardContent,
  Typography,
  CardActions,
  Card as CardUI,
  Button,
} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import React, { useEffect, useState } from "react";
import { MdTimer } from "react-icons/md";
import { Link } from "react-router-dom";
import BidDialog from "../BidDialog/BidDialog";
import ImageGallery from "react-image-gallery";
import { formatTime } from "Helpers";

const Card = (props) => {
  const [openBidDialog, setOpenBidDialog] = useState(false);
  const [timer, setTimer] = useState("");
  const carSellingTime = JSON.stringify(props.car.biddingInfo.sellingTime);

  const handleClickOpenBidDialog = () => {
    setOpenBidDialog(true);
  };

  const bidWasAddedEvent = (sum) => {
    props.setOpenBidWasAddedSnack(true);
  };

  const updateTimer = () => {
    setTimer(formatTime(carSellingTime));
  };

  useEffect(() => {
    updateTimer();
    setInterval(updateTimer, 1000);
  }, []);

  return (
    <CardUI
      sx={{
        width: "19vw",
        margin: 1,
        justifyContent: "space-between",
      }}
      className="card"
    >
      <CardMedia>
        <CarGallery images={props.car.pictures} />
      </CardMedia>
      <CardContent>
        <Link to={`/details/${props.car.id}`} className="link">
          <Typography className="fw-bold" gutterBottom component="div">
            {props.car.fabricationYear} {props.car.brand} {props.car.model}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.car.fuelType}, {props.car.engineSize},{" "}
            {props.car.fabricationYear}, {props.car.transmissionType},{" "}
            {props.car.power}, {props.car.numberOfSeats} seats,{" "}
            {props.car.color}
          </Typography>
        </Link>
      </CardContent>
      <CardActions className="auction">
        <div className="row w-100 align-items-center">
          <span
            className="col-4 text-center text-nowrap"
            style={{ paddingLeft: 20 }}
          >
            <MdTimer />
            {timer}
          </span>
          <span className="col-4 text-center">
            {props.car.biddingInfo.currentPrice}$
          </span>
          <span className="col-4" style={{ textAlign: "right" }}>
            <Button variant="outlined" onClick={handleClickOpenBidDialog}>
              Bid
            </Button>
            {openBidDialog && (
              <BidDialog
                open={openBidDialog}
                setOpenBidDialog={setOpenBidDialog}
                bidWasAddedEvent={bidWasAddedEvent}
                car={props.car}
              />
            )}
          </span>
        </div>
      </CardActions>
    </CardUI>
  );
};

class CarGallery extends React.Component {
  render() {
    const { images } = this.props;

    return (
      <>
        {!images || images.length === 0 ? (
          // @ts-ignore
          <img alt="" src={require("./default-car.jpg")} height="220" />
        ) : (
          <ImageGallery
            items={images.map((image) => ({
              original: image.file,
            }))}
            showBullets={true}
            showPlayButton={false}
            showFullscreenButton={false}
          />
        )}
      </>
    );
  }
}

export default Card;
