import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import { Typography, TextField, Button } from "@mui/material/";

function Course() {
  let { courseId } = useParams();
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
  let course = null;
  for (let i = 0; i < courses.length; i++) {
    if (courses[i]._id == courseId) {
      course = courses[i];
    }
  }
  if (!course) {
    return (
      <div>
        <h2>
          <i>SORRY</i> we dont find any relevant courses
        </h2>
      </div>
    );
  }
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <CourseCard course={course} />
      <UpdateCard course={course} courses={courses} setCourses={setCourses} />
    </div>
  );
}
function UpdateCard(props) {
  const course = props.course;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, SetImage] = useState("");

  return (
    <div
      style={{
        padding: 150,
        display: "flex",
        justifyContent: "center",
        width: "fullWidth",
      }}
    >
      <Card variant="outlined" style={{ width: 500, padding: 20 }}>
        <Typography>Update Course Details</Typography>

        <TextField
          style={{ marginBottom: 10 }}
          onChange={(t) => {
            setTitle(t.target.value);
          }}
          fullWidth
          label="Title"
          variant="outlined"
        />

        <br />
        <TextField
          onChange={(d) => {
            setDescription(d.target.value);
          }}
          fullWidth
          label="description"
          variant="outlined"
        />
        <br />
        <TextField
          onChange={(d) => {
            SetImage(d.target.value);
          }}
          fullWidth
          label="Image Link"
          variant="outlined"
        />
        <br />
        <Button
          size="large"
          variant="contained"
          onClick={() => {
            function callback2(data) {
              let updatedcourse = [];
              for (let i = 0; i < props.courses.length; i++) {
                if (props.courses[i]._id == course._id) {
                  updatedcourse.push({
                    _id: course._id,
                    title: title,
                    imageLink: image,
                    description: description,
                  });
                } else {
                  updatedcourse.push(props.courses[i]);
                }
              }
              props.setCourses(updatedcourse);
            }
            function callback1(res) {
              res.json().then(callback2);
            }
            fetch("http://localhost:3000/admin/courses/" + course._id, {
              method: "PUT",
              body: JSON.stringify({
                title: title,
                description: description,
                imageLink: image,
                published: true,
              }),
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json",
              },
            }).then(callback1);
          }}
        >
          UPDATE COURSE
        </Button>
      </Card>
    </div>
  );
}
function CourseCard(props) {
  const course = props.course;

  return (
    <div style={{ padding: 150 }}>
      <Card
        variant="outlined"
        style={{
          width: 300,
          margin: 10,
          minHeight: 250,
        }}
      >
        <Typography textAlign={"center"} variant="h5">
          {course.title}
        </Typography>

        <Typography textAlign={"center"} variant="subtitle1">
          {course.description}
        </Typography>
        <img src={course.imageLink} style={{ width: 300, height: 200 }}></img>
      </Card>
    </div>
  );
}

export default Course;
