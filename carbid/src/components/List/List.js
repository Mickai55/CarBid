
import "./List.css";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActions, LinearProgress, Pagination } from "@mui/material";
import { MdTimer } from "react-icons/md";
import CarAddDialog from "./CarAddDialog/CarAddDialog";
import { Link, useSearchParams } from "react-router-dom";
import { formatTime } from "Helpers";
import { getCars, getCarsCount, getFilters } from "ServiceCars";
import Filter from "./Filter/Filter";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import ImageGallery from "react-image-gallery";
import BidDialog from "./BidDialog/BidDialog";

const List = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tempTimers = [];
  const [pageLoading, setPageLoading] = useState(true);
  const [pageError, setPageError] = useState(true);

  const [cars, setCars] = useState([]);
  const [openCarDialog, setOpenCarDialog] = useState(false);
  const [openBidDialog, setOpenBidDialog] = useState(false);
  const [timers, setTimers] = useState([]);

  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [pageIndex, setPageIndex] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);

  const handleClickOpenCarDialog = () => {
    setOpenCarDialog(true);
  };

  const handleClickOpenBidDialog = () => {
    setOpenBidDialog(true);
  };

  const updateTimers = () => {
    const formattedTimers = [];
    for (let timer of tempTimers) {
      formattedTimers.push(formatTime(timer));
    }
    setTimers(formattedTimers);
  };

  function setPageFromUrl() {
    const page = searchParams.get("page");
    if (page) {
      setPageIndex(parseInt(page));
    }
    const perPage = searchParams.get("perPage");
    if (perPage) {
      setItemsPerPage(parseInt(perPage));
    }
  }

  useEffect(() => {
    fetchCars().then();
    setPageFromUrl();
    // every second update timer
    setInterval(updateTimers, 1000);
  }, []);

  const fetchCars = async () => {
    setPageLoading(true);
    await getCars(Object.fromEntries([...searchParams])).then((cars) => {
      setPageLoading(false);
      if (!cars) {
        return;
      }
      for (let car of cars) {
        tempTimers.push(car.biddingInfo.sellingTime);
      }
      updateTimers();
      setCars(cars);
    });
    getCarsCount().then((c) =>
      setNumberOfPages(Math.ceil(c.count / itemsPerPage))
    );
  };

  const carWasAddedEvent = () => {
    fetchCars().then();
  };

  const bidWasAddedEvent = () => {
    //asdf
  };

  const handleChangePagination = (e, p) => {
    setPageIndex(() => {
      setSearchParams({
        ...Object.fromEntries([...searchParams]),
        page: p.toString(),
      });
      return p;
    });
  };

  function changeItemsPerPage(p) {
    setItemsPerPage(() => {
      setSearchParams({
        ...Object.fromEntries([...searchParams]),
        perPage: p.toString(),
      });
      return p;
    });
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <div></div>
        <div className="h3 my-2">Auctions in progress</div>
        <Button
          onClick={handleClickOpenCarDialog}
          variant="contained"
          className="me-3"
        >
          Add Car
        </Button>
        <CarAddDialog
          open={openCarDialog}
          setOpenCarDialog={setOpenCarDialog}
          carWasAddedEvent={carWasAddedEvent}
        />
      </div>
      <Filter fetchCars={fetchCars} setPageIndex={setPageIndex} />
      {pageLoading ? (
        <div>
          <LinearProgress className="mb-3" />
        </div>
      ) : cars.length === 0 ? (
        <div>No cars found.</div>
      ) : (
        <>
          <div className="grid-container" data-testid="List">
            {cars.map((car, index) => (
              <Card
                key={car.id}
                sx={{
                  width: "19vw",
                  margin: 1,
                  justifyContent: "space-between",
                }}
                className="card"
              >
                <CardMedia>
                  <CarGallery images={car.pictures} />
                </CardMedia>
                <CardContent>
                  <Link to={`/details/${car.id}`} className="link">
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
                  </Link>
                </CardContent>
                <CardActions className="auction">
                  <div className="row w-100 align-items-center">
                    <span
                      className="col-4 text-center text-nowrap"
                      style={{ paddingLeft: 20 }}
                    >
                      <MdTimer />
                      {timers[index]}
                    </span>
                    <span className="col-4 text-center">
                      {car.biddingInfo.currentPrice}$
                    </span>
                    <span className="col-4" style={{ textAlign: "right" }}>
                      <Button
                        variant="outlined"
                        onClick={handleClickOpenBidDialog}
                      >
                        Bid
                      </Button>
                      <BidDialog
                        open={openBidDialog}
                        setOpenBidDialog={setOpenBidDialog}
                        bidWasAddedEvent={bidWasAddedEvent}
                        car={car}
                      />
                    </span>
                  </div>
                </CardActions>
              </Card>
            ))}
          </div>
        </>
      )}
      <div className="d-flex">
        <Pagination
          className="mt-3"
          variant="outlined"
          shape="rounded"
          count={numberOfPages}
          page={pageIndex ?? 1}
          showFirstButton
          showLastButton
          onChange={handleChangePagination}
        />
        <TextField
          select
          size="small"
          label="Items per Page"
          defaultValue="9"
          style={{ width: 100, marginTop: 9 }}
        >
          <MenuItem key={"3"} value={"3"} onClick={() => changeItemsPerPage(3)}>
            3
          </MenuItem>
          <MenuItem key={"9"} value={"9"} onClick={() => changeItemsPerPage(9)}>
            9
          </MenuItem>
          <MenuItem
            key={"18"}
            value={"18"}
            onClick={() => changeItemsPerPage(18)}
          >
            18
          </MenuItem>
          <MenuItem
            key={"27"}
            value={"27"}
            onClick={() => changeItemsPerPage(27)}
          >
            27
          </MenuItem>
        </TextField>
      </div>
    </>
  );
};

class CarGallery extends React.Component {
  render() {
    const { images } = this.props;

    return (
      <>
        {!images || images.length === 0 ? (
          // @ts-ignore
          <img alt="" src={require("./default-car.jpg")} height="220" />
        ) : (
          <ImageGallery
            items={images.map((image) => ({
              original: image.file,
            }))}
            showBullets={true}
            showPlayButton={false}
            showFullscreenButton={false}
          />
        )}
      </>
    );
  }
}

export default List;
