import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { useEffect, useState } from "react";

function AddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, SetImage] = useState("");
  const [price, setPrice] = useState(0);
  return (
    <div style={{ padding: 150, display: "flex", justifyContent: "center" }}>
      <Card variant="outlined" style={{ width: 400, padding: 20 }}>
        <Typography>
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
                alert("course added");
              }
              function callback1(res) {
                res.json().then(callback2);
              }
              fetch("http://localhost:3000/admin/courses", {
                method: "POST",
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
            ADD COURSE
          </Button>
        </Typography>
      </Card>
    </div>
  );
}

export default AddCourse;
