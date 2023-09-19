import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React from "react";
import { Link } from "react-router-dom";

const Login = () => (
  <div className="text-center">
    <div className="h3 my-2">Login</div>
    <div className="mb-2">
      <TextField id="standard-basic" label="Username" variant="standard" />
    </div>
    <div className="mb-4">
      <TextField id="standard-basic" label="Password" variant="standard" />
    </div>
    <div className="mb-2">
      <Button onClick={() => {}} variant="contained" className="">
        Login
      </Button>
    </div>
    <div>
      Or if you don't have an account <Link to="/register">Register</Link>
    </div>
  </div>
);

Login.propTypes = {};

Login.defaultProps = {};

export default Login;
