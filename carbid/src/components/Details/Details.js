import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import "./Details.css";
import { MdTimer } from "react-icons/md";
import { formatTime } from "Helpers";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const Details = (props) => {
  const [timer, setTimer] = useState("");

  const updateTimer = () => {
    setTimer(formatTime(car.biddingInfo.sellingTime));
  };

  useEffect(() => {
    updateTimer();
    setInterval(updateTimer, 1000);
  }, []);

  return (
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

const car = {
  id: 1,
  brand: "Ford",
  model: "Focus",
  fabricationYear: "2013",
  fuelType: "diesel",
  transmissionType: "automatic",
  mileage: "210000 km",
  power: "120 kW (163 Hp)",
  engineSize: "1,995 cc",
  bodyType: "hatchback",
  description: "",
  pictures: [],
  numberOfSeats: 5,
  color: "Grey",
  biddingInfo: {
    startingPrice: 5000,
    currentPrice: 6000,
    currency: '$',
    numberOfBids: 7,
    listingTime: "2023-07-22",
    sellingTime: "2023-07-28",
  },
};

export default Details;
