import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "./loadEnvironment.mjs";
import cars from "./routes/cars.mjs"
import users from './routes/users.mjs'
import bids from './routes/bids.mjs'

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cookieParser());

app.use("/cars", cars);
app.use("/auth", users);
app.use("/bids", bids);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

process.on("unhandledRejection", err => {
  console.log(`An error occurred: ${err.message}`)
  process.exit(1);
})
