import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
function Courses() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    function callback2(data) {
      setCourses(data);
    }
    function callback1(res) {
      res.json().then(callback2);
    }
    fetch("http://localhost:3000/admin/getCourses", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then(callback1);
  }, []);
  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {courses.map((course) => {
        return <Course course={course} />;
      })}
    </div>
  );
}
export function Course(props) {
  return (
    <div>
      <Card
        variant="outlined"
        style={{
          width: 300,
          margin: 10,
          minHeight: 250,
        }}
      >
        <Typography textAlign={"center"} variant="h5">
          {props.course.title}
        </Typography>

        <Typography textAlign={"center"} variant="subtitle1">
          {props.course.description}
        </Typography>
        <img
          src={props.course.imageLink}
          style={{ width: 300, height: 200 }}
        ></img>
      </Card>
    </div>
  );
}
export default Courses;
