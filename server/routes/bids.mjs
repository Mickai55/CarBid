import express from "express";
import db from "../db/conn.mjs";
import { userAuth } from "./users.mjs";

const router = express.Router();

router.get("/:user", userAuth, async (req, res) => {
  const username = req.params.user;
  if (!username) {
    return res
    .status(400)
    .json({ message: "An error occurred user is not logged in" });
  }
  let bidsCollection = await db.collection("bids");
  let queryUser = {user: req.params.user};
  let bids = await bidsCollection.find(queryUser).toArray();

  res.send(bids).status(200);
});

router.post("/", userAuth, async (req, res) => {
  let newDocument = {
    id: req.body.id,
    carId: req.body.carId,
    carName: req.body.carName,
    user: req.body.user,
    price: req.body.price,
    date: req.body.date,
  }
  let collection = await db.collection("bids");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

export default router;
