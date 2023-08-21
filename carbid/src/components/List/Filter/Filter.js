import React, { useEffect, useState } from "react";
import "./Filter.css";
import { popularCarCompanies } from "../../../Helpers";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";
import { getFilters } from "../../../Service";
import { Chip } from "@mui/material";

const Filter = () => {
  const [filters, setFilters] = useState({
    availableYears: [],
    availableBrands: [],
    availableTransmissions: [],
    availableEngineSizes: [],
  });
  const [chipList, setChipList] = useState(["asd", "dd"]);

  useEffect(() => {
    fetchFilters().then();
  }, []);

  const fetchFilters = () => {
    return getFilters().then((filters) => {
      setFilters(filters);
    });
  };

  function addFilter(x) {
    setChipList((current) => {
      console.log([...current, x]);
      return [...current, x];
    });
    console.log(chipList);
    return undefined;
  }

  return (
    <>
      <div className="filters">
        <div>Filters</div>
        {filters ? (
          <>
            <div className="ms-4">
              <TextField
                select
                label="Year"
                size="small"
                defaultValue=""
                style={{ width: 180 }}
              >
                {filters.availableYears.map((x) => (
                  <MenuItem key={x} value={x} onClick={() => addFilter(x)}>
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
                style={{ width: 180 }}
              >
                {filters.availableBrands.map((x) => (
                  <MenuItem key={x} value={x}>
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
                style={{ width: 180 }}
              >
                {filters.availableTransmissions.map((x) => (
                  <MenuItem key={x} value={x}>
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
                style={{ width: 180 }}
              >
                {filters.availableEngineSizes.map((x) => (
                  <MenuItem key={x} value={x}>
                    {x}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </>
        ) : (
          "Loading..."
        )}
      </div>
      <div className="bb">
        {chipList.map((chip) => (
          <Chip key={chip} label={chip} onDelete={() => {}} />
        ))}
      </div>
    </>
  );
};

export default Filter;
