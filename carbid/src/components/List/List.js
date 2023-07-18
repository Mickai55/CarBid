import "./List.css";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActions } from "@mui/material";
import { MdTimer } from "react-icons/md";

const List = () => {
  // initiate cars
  const initialState = [
    { ...car, biddingInfo: { ...car.biddingInfo } },
    { ...car, biddingInfo: { ...car.biddingInfo } },
    { ...car, biddingInfo: { ...car.biddingInfo } },
    { ...car, biddingInfo: { ...car.biddingInfo } },
    { ...car, biddingInfo: { ...car.biddingInfo } },
    { ...car, biddingInfo: { ...car.biddingInfo } },
  ];

  for (let car of initialState) {
    car.id = Math.random();
    car.biddingInfo.timeLeftSeconds = Math.floor(Math.random() * 10000 + 1000);
  }

  const [cars, setCars] = useState(initialState);

  // every second update timer
  useEffect(() => {
    const interval = setInterval(() => {
      setCars([...cars].map(x => {
        x.biddingInfo.timeLeftSeconds--;
        return x;
      }));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className="h3 text-center my-2">Auctions in progress</div>
      <div className="filters mx-2 my-3"> Filters</div>
      <div className="d-flex flex-wrap" data-testid="List">
        {cars.map((car) => (
          <Card key={car.id} sx={{ width: 394, margin: 1 }}>
            <CardMedia
              sx={{ height: 200 }}
              image="https://ruswagen.ro/wp-content/uploads/2023/03/331535315_130289899726177_8514068368407989318_n-876x535.jpg"
              title={car.brand}
            />
            <CardContent>
              <Typography className="fw-bold" gutterBottom component="div">
                {car.fabricationYear} {car.brand} {car.type}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {car.fuelType}, {car.engineSize}, {car.fabricationYear},{" "}
                {car.transmissionType}, {car.power}, {car.numberOfSeats} seats,{" "}
                {car.color}
              </Typography>
            </CardContent>
            <CardActions className="auction">
              <div className="row w-100 align-items-center">
              <span className="col-4 text-center">
                <MdTimer />
                {formatTime(car.biddingInfo.timeLeftSeconds)}
              </span>
              <span className="col-4 text-center">{car.biddingInfo.currentPrice}$</span>
              <span className="col-4 text-center" style={{paddingLeft: 60}}><Button variant="outlined">Bid</Button></span>
              </div>
            </CardActions>
          </Card>
        ))}
      </div>
    </>
  );
};

const car = {
  id: 1,
  brand: "Ford",
  type: "Focus",
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
    listingTime: "17.07.2023 18:00:00",
    timeLeftSeconds: 10000,
  },
};

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

List.propTypes = {};

List.defaultProps = {};

export default List;
