import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { useState } from "react";

function AddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  return (
    <div style={{ padding: 150, display: "flex", justifyContent: "center" }}>
      <Card variant="outlined" style={{ width: 400, padding: 20 }}>
        <Typography>
          <TextField
            onChange={() => {
              setTitle(t.target.value);
            }}
            fullWidth
            label="Title"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            onChange={() => {
              setDescription(d.target.value);
            }}
            fullWidth
            label="description"
            variant="outlined"
          />
          <br />
          <br />
          <Button
            size="large"
            variant="contained"
            onClick={() => {
              fetch("http://localhost:3000/admin/courses", {
                method: "POST",
                body: JSON.stringify({
                  title: title,
                  description: description,
                }),
                headers: {
                  "content-type": "application/json",
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              })
                .then((res) => {
                  return res.json();
                })
                .then((data) => {
                  console.log(data);
                });
            }}
          >
            Submit
          </Button>
        </Typography>
      </Card>
    </div>
  );
}

export default AddCourse;
