import "./List.css";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActions } from "@mui/material";
import { MdTimer } from "react-icons/md";
import CarAddDialog from "./CarAddDialog";
import { Link } from "react-router-dom";
import { formatTime } from "Helpers";

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

  const tempTimers = []

  for (let car of initialState) {
    tempTimers.push(car.biddingInfo.sellingTime);
  }

  for (let car of initialState) {
    car.id = Math.random();
  }

  const [cars, setCars] = useState(initialState);
  const [openDialog, setOpenDialog] = useState(false);
  const [timers, setTimers] = useState([]);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const updateTimers = () => {
    const formattedTimers = [];
    for (let timer of tempTimers) {
      formattedTimers.push(formatTime(timer));
    }
    setTimers(formattedTimers);
  }

  // every second update timer
  useEffect(() => {
    updateTimers();
    setInterval(updateTimers, 1000);
  }, []);

  const output = (data) => {
    // car has been added
    console.log(data);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <div></div>
        <div className="h3 my-2">Auctions in progress</div>
        <Button onClick={handleClickOpenDialog} variant="contained">
          Add Car
        </Button>
        <CarAddDialog
          open={openDialog}
          setOpenDialog={setOpenDialog}
          func={output}
        />
      </div>
      <div className="filters mx-2 my-3"> Filters</div>
      <div className="d-flex flex-wrap" data-testid="List">
        {cars.map((car, index) => (
          <Card key={car.id} sx={{ width: 390, margin: 1 }} className="card">
            <Link to="/details" className="link">
              <CardMedia
                sx={{ height: 200 }}
                image="https://ruswagen.ro/wp-content/uploads/2023/03/331535315_130289899726177_8514068368407989318_n-876x535.jpg"
                title={car.brand}
              />
              <CardContent>
                <Typography className="fw-bold" gutterBottom component="div">
                  {car.fabricationYear} {car.brand} {car.model}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {car.fuelType}, {car.engineSize}, {car.fabricationYear},{" "}
                  {car.transmissionType}, {car.power}, {car.numberOfSeats}{" "}
                  seats, {car.color}
                </Typography>
              </CardContent>
            </Link>
            <CardActions className="auction">
              <div className="row w-100 align-items-center">
                <span className="col-4 text-center">
                  <MdTimer />
                  {timers[index]}
                </span>
                <span className="col-4 text-center">
                  {car.biddingInfo.currentPrice}$
                </span>
                <span className="col-4 text-center" style={{ paddingLeft: 60 }}>
                  <Button variant="outlined">Bid</Button>
                </span>
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
    listingTime: "2023-07-22",
    sellingTime: "2023-07-28"
  },
};

List.propTypes = {};

List.defaultProps = {};

export default List;
