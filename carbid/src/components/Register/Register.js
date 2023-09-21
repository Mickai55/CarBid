import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { apiRegister } from "ServiceUsers";
import React, { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const register = () => {
    apiRegister(username, password);
  };
  return (
    <>
      <div className="text-center">
        <div className="h3 my-4">Register</div>
        <div className="mb-4">
          <TextField label="Username" variant="standard" onChange={(event) => setUsername(event.target.value)} />
        </div>
        <div className="mb-4">
          <TextField type='password' label="Password" variant="standard" onChange={(event) => setPassword(event.target.value)} />
        </div>
        <div className="mb-4">
          <TextField type='password' label="Confirm Password" variant="standard" onChange={(event) => setConfirmPassword(event.target.value)} />
        </div> 
        <div className="mb-4">
          <Button disabled={!username || !password || !confirmPassword} onClick={() => register()} variant="contained" className="">
            Register
          </Button>
        </div>
      </div>
    </>
  );
};

export default Register;
