import "./List.css";
import React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActions } from "@mui/material";
import { MdTimer } from "react-icons/md";

const List = () => (
  <>
    <div className="h3">Auctions in progress</div>
    <div className="d-flex flex-wrap" data-testid="List">
      {cars.map((car) => (
        <Card key={car.id} sx={{ width: 390, margin: 1 }}>
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
            <div>
              <MdTimer />
              {Math.ceil(car.biddingInfo.timeLeftSeconds / 3600)}:
              {car.biddingInfo.timeLeftSeconds % 60}:
              {23}
            </div>
            <div>{car.biddingInfo.currentPrice}$</div>
            <Button variant="outlined">Bid</Button>
          </CardActions>
        </Card>
      ))}
    </div>
  </>
);

const cars = [
  {
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
      listingTime: "14.07.2023",
      timeLeftSeconds: 100000,
    },
  },
  {
    id: 2,
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
      listingTime: "14.07.2023",
      timeLeftSeconds: 100000,
    },
  },
  {
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
      listingTime: "14.07.2023",
      timeLeftSeconds: 100000,
    },
  },
  {
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
      listingTime: "14.07.2023",
      timeLeftSeconds: 100000,
    },
  },
  {
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
      listingTime: "14.07.2023",
      timeLeftSeconds: 100000,
    },
  },
];

List.propTypes = {};

List.defaultProps = {};

export default List;
