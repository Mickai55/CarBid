import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import cars from "./routes/carbid.mjs"

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({limit: '50mb'}));

app.use("/cars", cars);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
