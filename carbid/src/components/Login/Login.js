import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { apiLogin } from "ServiceUsers";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const login = () => {
    apiLogin(username, password);
  }
  return (
    <div className="text-center">
      <div className="h3 my-4">Login</div>
      <div className="mb-4">
          <TextField label="Username" variant="standard" onChange={(event) => setUsername(event.target.value)} />
      </div>
      <div className="mb-4">
          <TextField type='password' label="Password" variant="standard" onChange={(event) => setPassword(event.target.value)} />
      </div>
      <div className="mb-4">
        <Button disabled={!username || !password} onClick={() => {login()}} variant="contained" className="">
          Login
        </Button>
      </div>
      <div>
        Or if you don't have an account <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

Login.propTypes = {};

Login.defaultProps = {};

export default Login;
