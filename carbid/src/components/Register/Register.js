import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { apiLogin, apiRegister } from "ServiceUsers";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = (props) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const register = () => {
    apiRegister(username, password).then((ok) => {
      if (ok) {
        props.setOpenRegisterSnack(true);
        navigate("/login", { replace: true });
      } else {
        // setUsername("");
        // setPassword("");
        // setConfirmPassword("");
      }
    });
  };
  return (
    <>
      <div className="text-center">
        <div className="h3 my-4">Register</div>
        <div className="mb-2">
          <TextField
            label="Username"
            variant="standard"
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="mb-2">
          <TextField
            type="password"
            label="Password"
            variant="standard"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="mb-4">
          <TextField
            type="password"
            label="Confirm Password"
            variant="standard"
            onChange={(event) => setConfirmPassword(event.target.value)}
            onKeyDown={(event) => event.keyCode === 13 && register()}
          />
        </div>
        <div className="mb-4">
          <Button
            disabled={!username || !password || !confirmPassword}
            onClick={() => register()}
            variant="contained"
            className=""
          >
            Register
          </Button>
        </div>
      </div>
    </>
  );
};

export default Register;
