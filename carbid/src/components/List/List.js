import "./List.css";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { LinearProgress, Pagination } from "@mui/material";
import CarAddDialog from "./CarAddDialog/CarAddDialog";
import { useSearchParams } from "react-router-dom";
import { apiGetCars, apiGetCarsCount, apiGetFilters } from "services/ServiceCars";
import Filter from "./Filter/Filter";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Card from "./Card/Card";

const List = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageLoading, setPageLoading] = useState(true);
  const [pageError, setPageError] = useState(true);

  const [cars, setCars] = useState([]);
  const [openCarDialog, setOpenCarDialog] = useState(false);

  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [pageIndex, setPageIndex] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);

  const handleClickOpenCarDialog = () => {
    setOpenCarDialog(true);
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
  }, []);

  const fetchCars = async () => {
    setPageLoading(true);
    await apiGetCars(Object.fromEntries([...searchParams])).then((cars) => {
      setPageLoading(false);
      if (!cars) {
        return;
      }
      setCars(cars);
    });
    apiGetCarsCount().then((c) =>
      setNumberOfPages(Math.ceil(c.count / itemsPerPage))
    );
  };

  const carWasAddedEvent = () => {
    fetchCars().then(() => {
      props.setOpenCarWasAddedSnack(true);
    });
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
              <Card key={car.id} car={car} setOpenBidWasAddedSnack={props.setOpenBidWasAddedSnack} />
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

export default List;
