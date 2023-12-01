const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const adminRouter = require("../routes/admin");
const userRouter = require("../routes/user");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/admin", adminRouter);
app.use("/user", userRouter);
//connect to the mongoDB
mongoose.connect(
  "mongodb+srv://azeemibrahim333:1234567890@cluster0.lhbve3b.mongodb.net/CourseSellingWebsite"
);
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
