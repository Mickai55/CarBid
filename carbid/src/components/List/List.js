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
import { getCars } from "Service";

const List = () => {
  const tempTimers = [];

  const [cars, setCars] = useState([]);
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
  };

  useEffect(() => {
    getCars().then((cars) => {
      console.log(cars);
      for (let car of cars) {
        tempTimers.push(car.biddingInfo.sellingTime);
      }
      updateTimers();
      setCars(cars);
    });
    // every second update timer
    setInterval(updateTimers, 1000);
  }, []);

  const output = (data) => {
    // car has been added
    console.log(data);
  };

  return (
    <>
      {cars.length === 0 ? (
        <div>Loading...</div>
      ) : (
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
              <Card
                key={car.id}
                sx={{ width: 390, margin: 1, justifyContent: "space-between" }}
                className="card"
              >
                <Link to={`/details/${car.id}`} className="link">
                  <CardMedia
                    sx={{ height: 200 }}
                    image="https://ruswagen.ro/wp-content/uploads/2023/03/331535315_130289899726177_8514068368407989318_n-876x535.jpg"
                    title={car.brand}
                  />
                  <CardContent>
                    <Typography
                      className="fw-bold"
                      gutterBottom
                      component="div"
                    >
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
                    <span
                      className="col-4 text-center"
                      style={{ paddingLeft: 60 }}
                    >
                      <Button variant="outlined">Bid</Button>
                    </span>
                  </div>
                </CardActions>
              </Card>
            ))}
          </div>
        </>
      )}
    </>
  );
};

List.propTypes = {};

List.defaultProps = {};

export default List;
