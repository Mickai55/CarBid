import express from "express";
import db from "../db/conn.mjs";

const router = express.Router();

// This section will help you get a list of all the cars.
router.get("/", async (req, res) => {
  let collection = await db.collection("cars");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you create a new car.
router.post("/", async (req, res) => {
  let newDocument = {
    id: req.body.id,
    brand: req.body.brand,
    model: req.body.model,
    fabricationYear: req.body.fabricationYear,
    fuelType: req.body.fuelType,
    transmissionType: req.body.transmissionType,
    mileage: req.body.mileage,
    power: req.body.power,
    engineSize: req.body.engineSize,
    bodyType: req.body.bodyType,
    description: req.body.description,
    pictures: req.body.pictures,
    numberOfSeats: req.body.numberOfSeats,
    color: req.body.color,
    biddingInfo: {
      startingPrice: req.body.startingPrice,
      currentPrice: req.body.currentPrice,
      currency: req.body.currency,
      numberOfBids: req.body.numberOfBids,
      listingTime: req.body.listingTime,
      sellingTime: req.body.sellingTime,
    },
  };
  let collection = await db.collection("cars");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// This section will help you get a list of all the available filters. 
router.get("/filters", async (req, res) => {
  let collection = await db.collection("cars");
  let results = await collection.find({}).toArray();

  let availableYears = results.map(x => x.fabricationYear);
  availableYears = [...new Set(availableYears)];

  let availableBrands = results.map(x => x.brand);
  availableBrands = [...new Set(availableBrands)];

  let availableTransmissions = results.map(x => x.transmissionType);
  availableTransmissions = [...new Set(availableTransmissions)];

  let availableEngineSizes = results.map(x => x.engineSize);
  availableEngineSizes = [...new Set(availableEngineSizes)];

  const resp = ({availableYears, availableBrands, availableTransmissions, availableEngineSizes})

  res.send(resp).status(200);
});

// This section will help you get a single car by id
router.get("/:id", async (req, res) => {
  console.log(req.params);
  let collection = await db.collection("cars");
  let query = {id: req.params.id};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you update a car by id.
router.patch("/:id", async (req, res) => {
  let query = {id: req.params.id};
  const updates =  {
    $set: {
      id: req.body.id,
      brand: req.body.brand,
      model: req.body.model,
      fabricationYear: req.body.fabricationYear,
      fuelType: req.body.fuelType,
      transmissionType: req.body.transmissionType,
      mileage: req.body.mileage,
      power: req.body.power,
      engineSize: req.body.engineSize,
      bodyType: req.body.bodyType,
      description: req.body.description,
      pictures: req.body.pictures,
      numberOfSeats: req.body.numberOfSeats,
      color: req.body.color,
      biddingInfo: {
        startingPrice: req.body.startingPrice,
        currentPrice: req.body.currentPrice,
        currency: req.body.currency,
        numberOfBids: req.body.numberOfBids,
        listingTime: req.body.listingTime,
        sellingTime: req.body.sellingTime,
      },
    }
  };

  let collection = await db.collection("cars");
  let result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});

// This section will help you delete a car
router.delete("/:id", async (req, res) => {
  let query = {id: req.params.id};

  const collection = db.collection("cars");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;
