import React, { useEffect, useState } from "react";
import "./Filter.css";
import { popularCarCompanies } from "../../../Helpers";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getFilters } from "../../../Service";
import { Chip } from "@mui/material";
import Button from "@mui/material/Button";

const Filter = (props) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterYear, setFilterYear] = useState([]);
  const [filterBrand, setFilterBrand] = useState([]);
  const [filterTransmission, setFilterTransmission] = useState([]);
  const [filterEngineSize, setFilterEngineSize] = useState([]);
  const [filters, setFilters] = useState({
    availableYears: [],
    availableBrands: [],
    availableTransmissions: [],
    availableEngineSizes: [],
  });

  useEffect(() => {
    fetchFilters().then();
    setChipsFromUrl();
    props.fetchCars();
  }, [searchParams]);

  const fetchFilters = () => {
    return getFilters().then((filters) => {
      setFilters(filters);
    });
  };

  function setChipsFromUrl() {
    const years = searchParams.get("years");
    if (years) {
      setFilterYear(years.split(","));
    }
    const brands = searchParams.get("brands");
    if (brands) {
      setFilterBrand(brands.split(","));
    }
    const transmissions = searchParams.get("transmissions");
    if (transmissions) {
      setFilterTransmission(transmissions.split(","));
    }
    const engineSizes = searchParams.get("engineSizes");
    if (engineSizes) {
      setFilterEngineSize(engineSizes.split(","));
    }
  }

  function addFilter(type, value) {
    switch (type) {
      case "year":
        setFilterYear((current) => {
          setSearchParams({
            ...Object.fromEntries([...searchParams]),
            years: [...filterYear, value].toString(),
          });
          return [...current, value];
        });
        break;
      case "brand":
        setFilterBrand((current) => {
          setSearchParams({
            ...Object.fromEntries([...searchParams]),
            brands: [...filterBrand, value].toString(),
          });
          return [...current, value];
        });
        break;
      case "transmission":
        setFilterTransmission((current) => {
          setSearchParams({
            ...Object.fromEntries([...searchParams]),
            transmissions: [...filterTransmission, value].toString(),
          });
          return [...current, value];
        });
        break;
      case "engineSize":
        setFilterEngineSize((current) => {
          setSearchParams({
            ...Object.fromEntries([...searchParams]),
            engineSizes: [...filterEngineSize, value].toString(),
          });
          return [...current, value];
        });
        break;
      default:
        break;
    }
  }

  const removeFilter = (type, value) => {
    switch (type) {
      case "year":
        setFilterYear((current) => {
          setSearchParams({
            ...Object.fromEntries([...searchParams]),
            years: [...filterYear.filter((el) => el !== value)].toString(),
          });
          return [...current.filter((el) => el !== value)];
        });
        break;
      case "brand":
        setFilterBrand((current) => {
          setSearchParams({
            ...Object.fromEntries([...searchParams]),
            brands: [...filterBrand.filter((el) => el !== value)].toString(),
          });
          return [...current.filter((el) => el !== value)];
        });
        break;
      case "transmission":
        setFilterTransmission((current) => {
          setSearchParams({
            ...Object.fromEntries([...searchParams]),
            transmissions: [
              ...filterTransmission.filter((el) => el !== value),
            ].toString(),
          });
          return [...current.filter((el) => el !== value)];
        });
        break;
      case "engineSize":
        setFilterEngineSize((current) => {
          setSearchParams({
            ...Object.fromEntries([...searchParams]),
            engineSizes: [
              ...filterEngineSize.filter((el) => el !== value),
            ].toString(),
          });
          return [...current.filter((el) => el !== value)];
        });
        break;
      default:
        break;
    }
  };

  function clearAllFilters() {
    setSearchParams({});
    setFilterYear([]);
    setFilterBrand([]);
    setFilterTransmission([]);
    setFilterEngineSize([]);
  }

  const [yearVal, setYearVal] = useState("");
  const [brandVal, setBrandVal] = useState("");
  const [transVal, setTransVal] = useState("");
  const [engineSizeVal, setEngineSizeVal] = useState("");
  return (
    <>
      <div className="filters">
        <div>Filters</div>
        {filters ? (
          <>
            <div className="d-flex">
              <div className="ms-4">
                <TextField
                  select
                  label="Year"
                  size="small"
                  defaultValue=""
                  value={yearVal}
                  onChange={() => setYearVal("")}
                  style={{ width: 180 }}
                >
                  {filters.availableYears.map((x) => (
                    <MenuItem
                      key={x}
                      value={x}
                      onClick={() => addFilter("year", x)}
                    >
                      {x}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="ms-2">
                <TextField
                  select
                  label="Brand"
                  size="small"
                  defaultValue=""
                  value={brandVal}
                  onChange={() => setBrandVal("")}
                  style={{ width: 180 }}
                >
                  {filters.availableBrands.map((x) => (
                    <MenuItem
                      key={x}
                      value={x}
                      onClick={() => addFilter("brand", x)}
                    >
                      {x}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="ms-2">
                <TextField
                  select
                  label="Transmission Type"
                  size="small"
                  defaultValue=""
                  value={transVal}
                  onChange={() => setTransVal("")}
                  style={{ width: 180 }}
                >
                  {filters.availableTransmissions.map((x) => (
                    <MenuItem
                      key={x}
                      value={x}
                      onClick={() => addFilter("transmission", x)}
                    >
                      {x}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="ms-2">
                <TextField
                  select
                  size="small"
                  label="Engine Size"
                  defaultValue=""
                  value={engineSizeVal}
                  onChange={() => setEngineSizeVal("")}
                  style={{ width: 180 }}
                >
                  {filters.availableEngineSizes.map((x) => (
                    <MenuItem
                      key={x}
                      value={x}
                      onClick={() => addFilter("engineSize", x)}
                    >
                      {x}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>

            <Button
              onClick={clearAllFilters}
              variant="contained"
              style={{ backgroundColor: "red" }}
              component="label"
            >
              Clear All Filters
            </Button>
          </>
        ) : (
          "Loading..."
        )}
      </div>
      {filterYear.length +
        filterBrand.length +
        filterTransmission.length +
        filterEngineSize.length !==
        0 && (
        <div className="bb">
          {filterYear.map((chip, index) => (
            <Chip
              className="me-2"
              key={chip + index}
              label={chip}
              onDelete={() => removeFilter("year", chip)}
            />
          ))}
          {filterBrand.map((chip, index) => (
            <Chip
              className="me-2"
              key={chip + index}
              label={chip}
              onDelete={() => removeFilter("brand", chip)}
            />
          ))}
          {filterTransmission.map((chip, index) => (
            <Chip
              className="me-2"
              key={chip + index}
              label={chip}
              onDelete={() => removeFilter("transmission", chip)}
            />
          ))}
          {filterEngineSize.map((chip, index) => (
            <Chip
              className="me-2"
              key={chip + index}
              label={chip}
              onDelete={() => removeFilter("engineSize", chip)}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Filter;
