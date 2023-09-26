import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();
const jwtSecret = process.env.SECRET_KEY;

const adminAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Not authorized" });
      } else {
        if (decodedToken.role !== "Basic") {
          return res.status(401).json({ message: "Not authorized" });
        } else {
          next();
        }
      }
    });
  } else {
    return res
      .status(401)
      .json({ message: "Not authorized, token not available" });
  }
};

const userAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Not authorized" });
      } else {
        if (decodedToken.role !== "Admin") {
          return res.status(401).json({ message: "Not authorized" });
        } else {
          next();
        }
      }
    });
  } else {
    return res
      .status(401)
      .json({ message: "Not authorized, token not available" });
  }
};

// auth.js
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (password.length < 6) {
    return res.send({ message: "Password less than 6 characters" }).status(400);
  }
  try {
    let collection = await db.collection("users");

    let query = {
      username: req.body.username,
    };
    let usernameExists = await collection.findOne(query);
    if (usernameExists) {
      return res.status(401).send({
        message: "Username already exists",
      });
    }

    const hashPass = bcrypt.hashSync(password, 10);
    let newDocument = {
      username, // is unique
      password: hashPass,
      role: "Basic",
    };
    let user = await collection.insertOne(newDocument);

    const maxAge = 3 * 60 * 60;
    const token = jwt.sign(
      { id: user._id, username, role: user.role },
      jwtSecret,
      {
        expiresIn: maxAge, // 3hrs in sec
      }
    );
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000, // 3hrs in ms
    });

    res
      .send({ message: "User successfully created", user, newDocument })
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
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({
        message: "Username or Password not present",
      });
    }
    let collection = await db.collection("users");
    let query = {
      username: req.body.username,
    };
    let user = await collection.findOne(query);
    if (!user) {
      res.status(401).json({
        message: "Login not successful - username not found",
        error: "User not found",
      });
    } else {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const maxAge = 3 * 60 * 60;
        const token = jwt.sign(
          { id: user._id, username: user.username, role: user.role },
          jwtSecret,
          {
            expiresIn: maxAge, // 3hrs in sec
          }
        );
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: maxAge * 1000, // 3hrs in ms
        });

        res.status(200).json({
          message: "Login successful",
          username: user.username,
          role: user.role,
        });
      } else {
        res.status(400).json({
          message: "Password is incorrect",
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
});

router.get("/users", adminAuth, async (req, res, next) => {
  try {
    let collection = await db.collection("users");
    let users = await collection.find({}).toArray();
    return res
      .status(201)
      .json({ message: "Users fetched successfully", users });
  } catch (error) {
    res
      .status(400)
      .json({ message: "An error occurred", error: error.message });
  }
  res.status(400).json({ message: "An error occurred" });
});

router.put("/update", adminAuth, async (req, res, next) => {
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
      let user = collection.findOne(query);
      user
        .then(async (user) => {
          // Third - Verifies the user is not an admin
          if (user.role !== "Admin") {
            user.role = role;
            try {
              await collection.updateOne(query, { $set: user });
            } catch (err) {
              res
                .status(400)
                .json({ message: "An error occurred", error: err.message });
              process.exit(1);
            }
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

router.delete("/delete", adminAuth, async (req, res) => {
  let query = {
    _id: new ObjectId(req.body.id),
  };

  const collection = db.collection("users");
  let user = await collection.deleteOne(query);
  try {
    res.send(user).status(200);
  } catch (error) {
    res
      .status(400)
      .json({ message: "An error occurred", error: error.message });
  }
});

router.get("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: "1" });
  res.status(200).json({ message: "Logout successful" });
});

router.get("/admin", userAuth, (req, res) => res.send("Admin Route"));

router.get("/basic", adminAuth, (req, res) => res.send("User Route"));

export default router;
