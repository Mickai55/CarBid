import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import React from "react";

const Register = () => {
    return (
        <>
        <div className="text-center">
          <div className="h3 my-2">Register</div>
          <div className="mb-2">
            <TextField id="standard-basic" label="Username" variant="standard" />
          </div>
          <div className="mb-4">
            <TextField id="standard-basic" label="Password" variant="standard" />
          </div>
          <div className="mb-2">
          <Button onClick={() => {}} variant="contained" className="">
            Register
          </Button>
          </div>
        </div>
        </>
    )
}

export default Register;