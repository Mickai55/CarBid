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
  let pageLoading = true;
  let pageError = false;

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
      if (!cars) {
        return;
      }
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
      {cars === null || cars.length === 0 ? (
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
          <div className="grid-container" data-testid="List">
            {cars.map((car, index) => (
              <Card
                key={car.id}
                sx={{
                  width: "auto",
                  margin: 1,
                  justifyContent: "space-between",
                }}
                className="card"
              >
                <Link to={`/details/${car.id}`} className="link">
                  <CardMedia
                    sx={{ height: 200 }}
                    image={
                      car.pictures[0]?.file ??
                      "https://static.vecteezy.com/system/resources/previews/007/626/807/original/toy-car-for-2d-cartoon-animation-city-cars-and-vehicles-transport-free-vector.jpg"
                    }
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
                    <span className="col-4" style={{ textAlign: "right" }}>
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
