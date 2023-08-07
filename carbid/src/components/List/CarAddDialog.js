import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import { Controller, useForm } from "react-hook-form";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { addCar, editCar } from "Service";
import { BsFillTrashFill } from "react-icons/bs";
import { IconButton } from "@mui/material";

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
  const currencies = ["$", "€", "RON", "฿"];

  const [isCarEditingMode, setIsCarEditingMode] = useState(false);
  const today = new Date().toISOString().slice(0, 10);
  const [minDate, setMinDate] = useState(today);
  let [uploadedFiles, setUploadedFiles] = useState([]);

  const {
    formState: { errors },
    handleSubmit,
    watch,
    trigger,
    control,
    setValue,
  } = useForm({
    mode: "onChange",
  });

  const onSubmitForm = (car) => {
    if (!isCarEditingMode) {
      const uid =
        Math.random().toString().substr(14) +
        new Date().toISOString().toString();
      car.id = uid;
      car.bodyType = "";
      car.description = "";
      car.currentPrice = car.startingPrice;
      car.pictures = uploadedFiles;
      car.numberOfBids = 0;
      onSubmit(car);
    } else {
      car.id = props.car.id;
      car.pictures = uploadedFiles;
      car.numberOfBids = props.car.biddingInfo.numberOfBids;
      car.currentPrice = props.car.biddingInfo.currentPrice;
      car.bodyType = "";
      car.description = "";
      editCar(car).then(() => window.location.reload());
    }
  };

  function onSubmit(car) {
    addCar(car).then(() => window.location.reload());
  }

  const handleFileEvent = (e) => {
    const files = e.target.files;
    if (!files) {
      return;
    }

    const uploadFiles = Array.from(files).map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({
            name: file.name,
            file: reader.result,
          });
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(uploadFiles)
      .then((uploadedFiles) => {
        setUploadedFiles((prevUploadedFiles) => {
          if (prevUploadedFiles) {
            return [...prevUploadedFiles, ...uploadedFiles];
          } else {
            return uploadedFiles;
          }
        });
      })
      .catch((error) => {
        console.error("Error uploading files:", error);
      });
  };

  useEffect(() => {
    if (!!props.car) {
      setIsCarEditingMode(true);
      insertCarValuesInForm();
    }
    // console.log(uploadedFiles);
  }, []);

  const insertCarValuesInForm = () => {
    if (!props.car) {
      return;
    }
    setValue("brand", props.car.brand);
    setValue("model", props.car.model);
    setValue("fabricationYear", props.car.fabricationYear);
    setValue("fuelType", props.car.fuelType);
    setValue("transmissionType", props.car.transmissionType);
    setValue("mileage", props.car.mileage);
    setValue("power", props.car.power);
    setValue("engineSize", props.car.engineSize);
    setValue("numberOfSeats", props.car.numberOfSeats);
    setValue("color", props.car.color);
    setValue("startingPrice", props.car.biddingInfo.startingPrice);
    setValue("currency", props.car.biddingInfo.currency);
    setValue("listingTime", props.car.biddingInfo.listingTime);
    setValue("sellingTime", props.car.biddingInfo.sellingTime);
    setUploadedFiles(props.car.pictures);
  };

  function removePhoto(name) {
    setUploadedFiles(uploadedFiles.filter((f) => f.name !== name));
  }

  return (
    <>
      <Dialog
        open={props.open}
        onClose={handleCloseDialog}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "40vw",
            },
          },
        }}
      >
        <DialogTitle>{isCarEditingMode ? "Edit" : "Bid"} Car</DialogTitle>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <DialogContent>
            <DialogContentText>
              Please {isCarEditingMode ? "edit" : "add"} the car that you want
              to bid
            </DialogContentText>
            <Box
              component="div"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "45%" },
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
              <div className="fw-bold mt-3 ml-3">Bidding Info</div>
              <div>
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="standard"
                      label="Starting Price"
                      disabled={isCarEditingMode}
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
                      disabled={isCarEditingMode}
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
                      disabled={isCarEditingMode}
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
                      disabled={isCarEditingMode}
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

            <Button className="mt-3" component="label">
              Upload Photos
              <input onChange={handleFileEvent} type="file" multiple hidden />
            </Button>
            <div className="mt-4 d-flex w-100 flex-wrap">
              {uploadedFiles &&
                uploadedFiles.map((file, index) => (
                  <span key={file.name} className="d-flex flex-column">
                    <img style={{ height: 100, margin: 10 }} src={file.file} />
                    <div
                      className="text-center"
                      onClick={() => removePhoto(file.name)}
                    >
                      <IconButton
                        style={{ color: "red" }}
                        aria-label="delete"
                        size="small"
                      >
                        <BsFillTrashFill />
                      </IconButton>
                    </div>
                  </span>
                ))}
            </div>
          </DialogContent>
          <DialogActions style={{ padding: 20 }}>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleCloseDialog}
              type="submit"
              name="Submit"
            >
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default CarAddDialog;
