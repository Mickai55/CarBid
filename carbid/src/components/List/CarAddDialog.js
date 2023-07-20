import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import MenuItem from "@mui/material/MenuItem";
import { Controller, useForm } from "react-hook-form";

const { default: Button } = require("@mui/material/Button");
const { default: Dialog } = require("@mui/material/Dialog");
const { default: DialogActions } = require("@mui/material/DialogActions");
const { default: DialogContent } = require("@mui/material/DialogContent");
const {
  default: DialogContentText,
} = require("@mui/material/DialogContentText");
const { default: DialogTitle } = require("@mui/material/DialogTitle");
const { default: TextField } = require("@mui/material/TextField");
const { default: React } = require("react");

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

  const currencies = [
    {
      value: "USD",
      label: "$",
    },
    {
      value: "EUR",
      label: "€",
    },
    {
      value: "BTC",
      label: "฿",
    },
    {
      value: "JPY",
      label: "¥",
    },
  ];

  const {
    formState: { errors },
    handleSubmit,
    watch,
    trigger,
    control,
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <Dialog open={props.open} onClose={handleCloseDialog}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please add the car that you want to bid
          </DialogContentText>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                  name="year"
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
                  name="fuel"
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
                  name="transmission"
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
                  name="seats"
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
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                  name="currency"
                  control={control}
                  defaultValue=""
                />
              </div>
              <div></div>
            </Box>
            <input type="submit" name="Submit" />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleCloseDialog}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CarAddDialog;
