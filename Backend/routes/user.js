const express = require("express");
const mongoose = require("mongoose");
const { User, Admin, Course } = require("../DB");
const { generateJwt } = require("../middleware/auth");
const { authenticateJwt } = require("../middleware/auth");
const router = express.Router();

// User routes
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await User.findOne({ username, password });
  if (existingUser) {
    res.status(404).json({ message: "existing user" });
  } else {
    const newUser = new User({ username, password });
    newUser.save();
    const token = generateJwt(User);
    res.json({ message: "User created successfully", token });
  }
});
router.post("/login", async (req, res) => {
  const { username, password } = req.headers;
  const user = await User.findOne({ username, password });
  if (user) {
    const token = generateJwt(user);
    res.json({ message: "user logged in successfully", token });
  } else {
    res.status(403).json({ message: "authentication failed" });
  }
});
//user get courser
router.get("/courses", authenticateJwt, async (req, res) => {
  const courses = await Course.find({ published: true });
  res.json({ courses });
});
router.post("/courses/:courseId", authenticateJwt, async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  if (course) {
    const user = await User.findOne({ username: req.user.username });
    if (user) {
      user.purchasedCourses.push(course);
      await user.save();
      res.json({ message: "Course purchased successfully" });
    } else {
      res.status(403).json({ message: "User not found" });
    }
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});
router.get("/purchasedCourses", authenticateJwt, async (req, res) => {
  const user = await User.findOne({ username: req.user.username }).populate(
    "purchasedCourses"
  );
  if (user) {
    res.json({ purchasedCourses: user.purchasedCourses || [] });
  } else {
    res.status(403).json({ message: "User not found" });
  }
});
module.exports = router;
