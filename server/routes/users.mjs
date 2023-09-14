import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();
// auth.js
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (password.length < 6) {
    return res.send({ message: "Password less than 6 characters" }).status(400);
  }
  try {
    let newDocument = {
      username, // should be unique
      password,
      role: "Basic",
    };
    let collection = await db.collection("users");
    let result = await collection.insertOne(newDocument);
    res
      .send({ message: "User successfully created", result, newDocument })
      .status(204);
  } catch (err) {
    res.status(401).json({
      message: "User not successful created",
      error: err.mesage,
    });
  }
});

router.post("/login", async (req, res, next) => {
  try {
    console.log(req.body);
    let collection = await db.collection("users");
    let query = {
      username: req.body.username,
      password: req.body.password,
    };
    let result = await collection.findOne(query);
    console.log(result);
    if (!result) {
      res.status(401).json({
        message: "Login not successful",
        error: "User not found",
      });
    } else {
      res.status(200).json({
        message: "Login successful",
        result,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
});

router.put("/update", async (req, res, next) => {
  const { role, id } = req.body;
  // First - Verifying if role and id is presnt
  if (role && id) {
    // Second - Verifying if the value of role is admin
    if (role === "Admin") {
      // Finds the user with the id
        let collection = await db.collection("users");
        let query = {
          _id: new ObjectId(req.body.id),
        };
        let result = collection.findOne(query);
        result.then(async (user) => {
            console.log(user);
          // Third - Verifies the user is not an admin
          if (user.role !== "Admin") {
            user.role = role; 
            try {
                await collection.updateOne(query, {$set: user});
            }
            catch(err) {
                res
                  .status(400)
                  .json({ message: "An error occurred", error: err.message });
                process.exit(1);
            };
            res.status(201).json({ message: "Update successful", user });
          } else {
            res.status(400).json({ message: "User is already an Admin" });
          }
        })
        .catch((error) => {
          res
            .status(400)
            .json({ message: "An error occurred", error: error.message });
        });
    }
  }
});

export default router;
