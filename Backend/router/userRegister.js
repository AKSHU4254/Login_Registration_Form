const express = require("express");
const User = require("../schema/userSchema");
const Jwt = require("jsonwebtoken");
const jwtKey = "MERN-stack";
const router0 = express.Router();

router0.post("/register", async (req, res) => {
  try {
  
    let user = new User(req.body);
    
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
      if (err) {
        res.send("Something went wrong, please try after sometime");
      }
      res.send({ user, auth: token });
      res.status(200).json({
        result: "User registration successful.",
      });
    });
  } catch (error) {
    res.status(500).json({
      result: "Something went wrong, please try again later.",
    });
  }
});

router0.post("/login", async (req, res) => {
 
  if (req.body.password && req.body.username) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          res.send("Something went wrong, please try after sometime");
        }
        res.send({ user, auth: token });
      });
    } else {
      res.send({ result: "User not found" });
    }
  } else {
    res.send({ result: "User not found" });
  }
});

router0.get("/users", async (req, res) => {
  let users = await User.find();
  if (users.length > 0) {
    res.send(users);
  } else res.send({ result: "No Product Found" });
});

module.exports = router0;
