import React from "react";
import "./Filter.css";
import {popularCarCompanies} from "../../../Helpers";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import {Controller} from "react-hook-form";

const Filter = () => (
  <>
    <div className="filters">
      <div>Filters</div>
      <div className="ms-4">
        <TextField
          select
          label="Year"
          size="small"
          style={{width: 180}}
        >
          {[1000, 2000, 2010, 2030].map((x) => (
            <MenuItem key={x} value={x}>
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
          style={{width: 180}}
        >
          {popularCarCompanies.map((x) => (
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
          style={{width: 180}}
          label="Transmission Type"
        >
          <MenuItem key="Manual" value="Manual">
            Manual
          </MenuItem>
          <MenuItem key="Automatic" value="Automatic">
            Automatic
          </MenuItem>
        </TextField>
      </div>
      <div className="ms-2">
        <TextField
          select
          size="small"
          style={{width: 180}}
          label="Engine Size"
        >
          <MenuItem key="Manual" value="Manual">
            2.0
          </MenuItem>
          <MenuItem key="Automatic" value="Automatic">
            1.0
          </MenuItem>
        </TextField>
      </div>
    </div>
  </>);

export default Filter;
