import express from "express";
import db from "../db/conn.mjs";

const router = express.Router();

router.get("/count", async (req, res) => {
  let collection = await db.collection("cars");
  let results = await collection.find({}).toArray();

  res.send({count: results.length}).status(200);
});

// This section will help you get a list of all the cars.
router.get("/", async (req, res) => {
  let collection = await db.collection("cars");
  let cars = await collection.find({}).toArray();
  if (req.query.years && req.query.years != '') {
    const requestedYears = req.query.years.split(',');
    cars = cars.filter(car => requestedYears.includes(car.fabricationYear));
  }
  if (req.query.brands && req.query.brands != '') {
    const requestedBrands = req.query.brands.split(',');
    cars = cars.filter(car => requestedBrands.includes(car.brand));
  }
  if (req.query.transmissions && req.query.transmissions != '') {
    const requestedTransmissions = req.query.transmissions.split(',');
    cars = cars.filter(car => requestedTransmissions.includes(car.transmissionType));
  }
  if (req.query.engineSize && req.query.engineSize != '') {
    const requestedEngineSize = req.query.engineSize.split(',');
    cars = cars.filter(car => requestedEngineSize.includes(car.engineSize));
  }
  if (req.query.sort && req.query.sort != '') {
    if (req.query.sort === 'dateOfAddition') {
      cars.sort((a, b) => a.biddingInfo.listingTime > b.biddingInfo.listingTime);
    } else if (req.query.sort === 'price') {
      cars.sort((a, b) => parseInt(a.biddingInfo.currentPrice) - parseInt(b.biddingInfo.currentPrice));
    }
  }

  const perPageDefault = 9;
  const pageDefault = 1;
  let page = req.query.page;
  let perPage = req.query.perPage;

  if (!perPage || perPage === '') {
    perPage = perPageDefault;
  }
  if (!page || page === '') {
    page = pageDefault;
  }

  cars = cars.slice((page - 1) * perPage, page * perPage)

  res.send(cars).status(200);
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
router.get("/filters/all", async (req, res) => {
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
