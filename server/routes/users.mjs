import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();
const jwtSecret = process.env.SECRET_KEY;

export const adminAuth = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(401).json({ message: `Not authenticated.` });
  }
  const token = auth.split(" ")[1];
  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        return res
          .status(401)
          .json({ message: `Not authorized, error: ${err}` });
      } else {
        if (decodedToken.role !== "Admin") {
          return res
            .status(401)
            .json({ message: "Not authorized, user is not admin" });
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

export const userAuth = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(401).json({ message: `Not authenticated.` });
  }
  const token = auth.split(" ")[1];
  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        return res
          .status(401)
          .json({ message: `Not authorized, error: ${err}` });
      } else {
        next();
      }
    });
  } else {
    return res
      .status(401)
      .json({ message: "Not authorized, token not available" });
  }
};

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (password.length < 6) {
    return res.status(400).send({ message: "Password less than 6 characters" });
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
          token,
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
    return res.status(201).json({
      message: "Users fetched successfully",
      users: users.map((u) => ({
        id: u._id,
        username: u.username,
        role: u.role,
      })),
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "An error occurred", error: error.message });
  }
  res.status(400).json({ message: "An error occurred" });
});

router.put("/update", adminAuth, async (req, res, next) => {
  const { role, id } = req.body;
  if (role && id) {
    let collection = await db.collection("users");
    let query = {
      _id: new ObjectId(id),
    };
    let user = collection.findOne(query);
    user
      .then(async (user) => {
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
      })
      .catch((error) => {
        res
          .status(400)
          .json({ message: "An error occurred", error: error.message });
      });
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

router.get("/admin", (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(401).json({ message: `Not authenticated.` });
  }
  const token = auth.split(" ")[1];
  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        return res
          .status(401)
          .json({ message: `Not authorized, error: ${err}` });
      } else {
        if (decodedToken.role !== "Admin") {
          return res.status(200).json({ isAdmin: false });
        } else {
          return res.status(200).json({ isAdmin: true });
        }
      }
    });
  } else {
    return res
      .status(401)
      .json({ message: "Not authorized, token not available" });
  }
});

router.get("/basic", userAuth, (req, res) => res.send("User Route"));

export default router;
