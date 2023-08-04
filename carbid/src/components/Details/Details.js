// @ts-nocheck
import React, { useEffect, useState, useRef } from "react";
import ImageGallery from "react-image-gallery";
import "./Details.css";
import { MdTimer } from "react-icons/md";
import { formatTime } from "Helpers";
import Button from "@mui/material/Button";
import { deleteCar, getCar } from "Service";
import { useNavigate, useParams } from "react-router-dom";
import CarAddDialog from "../List/CarAddDialog";

const Details = (props) => {
  const routeParams = useParams();
  const [openDialog, setOpenDialog] = useState(false);
  const [timer, setTimer] = useState("");
  const [car, setCar] = useState(null);
  const carRef = useRef(null);
  const navigate = useNavigate();

  const updateTimer = () => {
    if (carRef.current) {
      setTimer(formatTime(carRef.current.biddingInfo.sellingTime));
    }
  };

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const output = (data) => {
    // car has been edited
    console.log(data);
  };

  useEffect(() => {
    getCar(routeParams.id).then((r) => {
      setCar(r);
      carRef.current = r;
      updateTimer();
    });
    setInterval(updateTimer, 1000);
  }, [routeParams]);

  function handleDeleteCar() {
    if (window.confirm("Are you sure?")) {
      deleteCar(car.id).then(() => navigate("/list", { replace: true }));
    } else {
    }
  }

  return (
    <>
      {car === null ? (
        <div>Loading...</div>
      ) : (
        <>
          <h3 className="fw-bold d-flex justify-content-between">
            <span>
              {car.fabricationYear} {car.brand} {car.model}
            </span>
            <span>
              <Button
                onClick={handleClickOpenDialog}
                variant="contained"
                component="label"
              >
                Edit Car
              </Button>
              <CarAddDialog
                open={openDialog}
                setOpenDialog={setOpenDialog}
                car={car}
                func={output}
              />
              <Button
                onClick={handleDeleteCar}
                variant="contained"
                color="warning"
                component="label"
              >
                Delete Car
              </Button>
            </span>
          </h3>
          <div className="album mt-2">
            <CarGallery images={car.pictures} />
          </div>

          <div className="auction-bidbar mt-4">
            <span className="col-4 ml-4">
              <div className="d-flex  justify-content-around">
                <span>
                  <MdTimer />
                  {timer}
                </span>
                <span>${car.biddingInfo.currentPrice}</span>
                <span>Bids: {car.biddingInfo.numberOfBids}</span>
              </div>
            </span>
            <span className="col-4 text-center"></span>
            <span
              className="col-4"
              style={{ textAlign: "right", paddingRight: "30px" }}
            >
              <div>
                <input
                  type="number"
                  className="new-price"
                  defaultValue={car.biddingInfo.currentPrice}
                  step={50}
                ></input>
                <Button variant="contained">Bid</Button>
              </div>
            </span>
          </div>
          <h3 className="mt-4">Vehicle Details</h3>
          <table className="my-3">
            <tbody>
              <tr>
                <td>Brand</td>
                <td>{car.brand}</td>
                <td>Model</td>
                <td>{car.model}</td>
              </tr>
              <tr>
                <td>Fabrication Year</td>
                <td>{car.fabricationYear}</td>
                <td>Fuel Type</td>
                <td>{car.fuelType}</td>
              </tr>
              <tr>
                <td>Transmission</td>
                <td>{car.transmissionType}</td>
                <td>Mileage</td>
                <td>{car.mileage}</td>
              </tr>
              <tr>
                <td>Power</td>
                <td>{car.power}</td>
                <td>Engine Size</td>
                <td>{car.engineSize}</td>
              </tr>
              <tr>
                <td>Number Of Seats</td>
                <td>{car.numberOfSeats}</td>
                <td>Color</td>
                <td>{car.color}</td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

class CarGallery extends React.Component {
  render() {
    const { images } = this.props;

    return (
      <>
        {!images || images.length === 0 ? (
          <div>Please add photos of the car.</div>
        ) : (
          <ImageGallery
            items={images.map((image) => ({
              original: image.file,
              thumbnail: image.file,
            }))}
            thumbnailPosition="right"
            showBullets={true}
            showPlayButton={false}
          />
        )}
      </>
    );
  }
}

export default Details;
