import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import MenuItem from "@mui/material/MenuItem";
import { Controller, useForm } from "react-hook-form";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import {useState} from "react";
import React from "react";
import { addCar } from "Service";

const CarAddDialog = (props) => {
  const handleCloseDialog = () => {
    props.setOpenDialog(false);
  };
  const popularCarCompanies = [
    "Toyota",
    "Ford",
    "Honda",
    "Volkswagen",
    "Chevrolet",
    "Nissan",
    "Hyundai",
    "BMW",
    "Mercedes-Benz",
    "Audi",
  ];

  const currencies = ['$', "€", 'RON', "฿"];

  const today = new Date().toISOString().slice(0, 10);
  const [minDate, setMinDate] = useState(today);

  const {
    formState: { errors },
    handleSubmit,
    watch,
    trigger,
    control,
  } = useForm({
    mode: "onChange",
  });

  const onSubmitForm = (car) => {
    const uid = Math.random().toString().substr(14) + new Date().toISOString().toString();
    car.id = uid;
    car.currentPrice = car.startingPrice;
    car.pictures = [];
    car.numberOfBids = 0;
    onSubmitTest(car);
  };

  function onSubmitTest(car) {
    console.log(car);
    addCar(car);
  }

  return (
    <>
      <Dialog open={props.open} onClose={handleCloseDialog}>
        <DialogTitle>Bid Car</DialogTitle>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <DialogContent>
            <DialogContentText>
              Please add the car that you want to bid
            </DialogContentText>
            <Box
              component="div"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
            >
              <div>
                <Controller
                  render={({ field }) => (
                    <TextField
                      select
                      label="Brand"
                      variant="standard"
                      {...field}
                    >
                      {popularCarCompanies.map((x) => (
                        <MenuItem key={x} value={x}>
                          {x}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                  name="brand"
                  control={control}
                  defaultValue=""
                />
                <Controller
                  render={({ field }) => (
                    <TextField {...field} variant="standard" label="Model" />
                  )}
                  name="model"
                  control={control}
                  defaultValue=""
                />
              </div>
              <div>
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Fabrication Year"
                      type="number"
                      variant="standard"
                    />
                  )}
                  name="fabricationYear"
                  control={control}
                  defaultValue=""
                />
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Fuel Type"
                      variant="standard"
                    >
                      <MenuItem key="Diesel" value="Diesel">
                        Diesel
                      </MenuItem>
                      <MenuItem key="Petrol" value="Petrol">
                        Petrol
                      </MenuItem>
                      <MenuItem key="Hybrid" value="Hybrid">
                        Hybrid
                      </MenuItem>
                      <MenuItem key="Electric" value="Electric">
                        Electric
                      </MenuItem>
                    </TextField>
                  )}
                  name="fuelType"
                  control={control}
                  defaultValue=""
                />
              </div>
              <div>
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      variant="standard"
                      label="Transmission Type"
                    >
                      <MenuItem key="Manual" value="Manual">
                        Manual
                      </MenuItem>
                      <MenuItem key="Automatic" value="Automatic">
                        Automatic
                      </MenuItem>
                    </TextField>
                  )}
                  name="transmissionType"
                  control={control}
                  defaultValue=""
                />
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="standard"
                      label="Mileage"
                      type="number"
                    />
                  )}
                  name="mileage"
                  control={control}
                  defaultValue=""
                />
              </div>
              <div>
                <Controller
                  render={({ field }) => (
                    <TextField {...field} variant="standard" label="Power" />
                  )}
                  name="power"
                  control={control}
                  defaultValue=""
                />
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="standard"
                      label="Engine Size"
                    />
                  )}
                  name="engineSize"
                  control={control}
                  defaultValue=""
                />
              </div>
              <div>
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="standard"
                      label="Number Of Seats"
                      type="number"
                    />
                  )}
                  name="numberOfSeats"
                  control={control}
                  defaultValue=""
                />
                <Controller
                  render={({ field }) => (
                    <TextField {...field} variant="standard" label="Color" />
                  )}
                  name="color"
                  control={control}
                  defaultValue=""
                />
              </div>
              <div className="m-3">Bidding Info</div>
              <div>
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="standard"
                      label="Starting Price"
                      type="number"
                    />
                  )}
                  name="startingPrice"
                  control={control}
                  defaultValue=""
                />
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      variant="standard"
                      defaultValue="EUR"
                      label="Currency"
                    >
                      {currencies.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                  name="currency"
                  control={control}
                  defaultValue=""
                />
              </div>
              <div>
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      InputLabelProps={{ shrink: true }}
                      variant="standard"
                      label="Listing Time"
                      type="date"
                      InputProps={{ inputProps: { min: today } }}
                      onChange={(e) => {
                        setMinDate(e.target.value);
                        field.onChange(e.target.value);
                      }}
                    />
                  )}
                  name="listingTime"
                  control={control}
                  defaultValue={today}
                />
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      InputLabelProps={{ shrink: true }}
                      variant="standard"
                      label="Selling Time"
                      type="date"
                      onChange={(e) => field.onChange(e.target.value)}
                      InputProps={{ inputProps: { min: minDate } }}
                    />
                  )}
                  name="sellingTime"
                  control={control}
                  defaultValue=""
                />
              </div>
            </Box>
          </DialogContent>
          <DialogActions >
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit" name="Submit">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default CarAddDialog;
