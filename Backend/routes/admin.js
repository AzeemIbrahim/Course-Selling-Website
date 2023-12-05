const express = require("express");
const mongoose = require("mongoose");
const { User, Admin, Course } = require("../DB");
const { generateJwt } = require("../middleware/auth");
const { authenticateJwt } = require("../middleware/auth");

const router = express.Router();

// Admin routes
// Example in your server-side code
router.get("/me", authenticateJwt, (req, res) => {
  res.json({ username: req.user.username });
});

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const existingadmin = await Admin.findOne({ username });
  if (existingadmin) {
    res
      .status(403)
      .json({ error: "Forbidden", message: "Admin already exists" });
  } else {
    const newAdmin = new Admin({ username: username, password: password });
    await newAdmin.save();
    const token = generateJwt(newAdmin);
    res.json({ message: "admin created succesfully", token });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.headers;
  const admin = await Admin.findOne({ username, password });
  if (admin) {
    const token = generateJwt(admin);
    res.json({ message: "logged in successfully", token });
  } else {
    res
      .status(403)
      .json({ error: "Forbidden", message: "Admin already exists" });
  }
});

router.post("/courses", authenticateJwt, async (req, res) => {
  const course = new Course({ ...req.body, user: req.user._id });
  await course.save();
  res.json({ message: "course created successfully", courseId: course.id });
});

router.put("/courses/:courseId", authenticateJwt, async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.courseId, req.body);
  if (course) {
    res.json({ message: "course updated successfully" });
  } else {
    res.status(404).json({ message: "course not found" });
  }
});
router.get("/getCourses", authenticateJwt, async (req, res) => {
  const courses = await Course.find({ user: req.user._id });
  res.json(courses);
});
router.get("/course/:courseId", authenticateJwt, async (req, res) => {
  const courseId = req.params.courseId;
  const course = await Course.findById(courseId);
  res.json({ course });
});

module.exports = router;
