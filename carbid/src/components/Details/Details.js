// @ts-nocheck
import React, { useEffect, useState, useRef } from "react";
import ImageGallery from "react-image-gallery";
import "./Details.css";
import { MdTimer } from "react-icons/md";
import { formatTime } from "Helpers";
import Button from "@mui/material/Button";
import { getCar } from "Service";
import { useParams } from "react-router-dom";

const Details = (props) => {
  const routeParams = useParams();
  const [timer, setTimer] = useState("");
  const [car, setCar] = useState(null);
  const carRef = useRef(null);

  const updateTimer = () => {
    console.log(carRef);
    if (carRef.current) {
      setTimer(formatTime(carRef.current.biddingInfo.sellingTime));
    }
  };

  useEffect(() => {
    console.log(routeParams);
    getCar(routeParams.id).then((r) => {
      setCar(r);
      carRef.current = r;
      updateTimer();
    });
    setInterval(updateTimer, 1000);
  }, [routeParams]);

  return (
    <>
      {car === null ? (
        <div>Loading...</div>
      ) : (
        <>
          <h3 className="fw-bold">
            {car.fabricationYear} {car.brand} {car.model}
          </h3>
          <div className="album mt-2">
            <CarGallery />
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

const images = [
  {
    original:
      "https://ruswagen.ro/wp-content/uploads/2023/03/331535315_130289899726177_8514068368407989318_n-876x535.jpg",
    thumbnail:
      "https://ruswagen.ro/wp-content/uploads/2023/03/331535315_130289899726177_8514068368407989318_n-876x535.jpg",
  },
  {
    original:
      "https://ruswagen.ro/wp-content/uploads/2023/03/331535315_130289899726177_8514068368407989318_n-876x535.jpg",
    thumbnail:
      "https://ruswagen.ro/wp-content/uploads/2023/03/331535315_130289899726177_8514068368407989318_n-876x535.jpg",
  },
  {
    original:
      "https://ruswagen.ro/wp-content/uploads/2023/03/331535315_130289899726177_8514068368407989318_n-876x535.jpg",
    thumbnail:
      "https://ruswagen.ro/wp-content/uploads/2023/03/331535315_130289899726177_8514068368407989318_n-876x535.jpg",
  },
];

class CarGallery extends React.Component {
  render() {
    return (
      <ImageGallery
        items={images}
        thumbnailPosition="right"
        showBullets={true}
        showPlayButton={false}
      />
    );
  }
}

export default Details;
