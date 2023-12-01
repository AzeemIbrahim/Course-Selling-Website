import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { useState } from "react";
function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div style={{ paddingTop: 140, marginBottom: 10 }}>
        <Typography variant="h6">
          <i>Courzease</i>
        </Typography>
      </div>
      <Card variant="outlined" style={{ width: 400, padding: 20 }}>
        <Typography>
          <TextField
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            fullWidth
            label="username"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            fullWidth
            label="password"
            variant="outlined"
            type="password"
          />
          <br />
          <br />
          <Button
            size="large"
            variant="contained"
            onClick={() => {
              fetch("http://localhost:3000/admin/login", {
                method: "POST",
                body: JSON.stringify({ username: email, password: password }),
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
            Sign In
          </Button>
          <br />
          <br />
        </Typography>
      </Card>
    </div>
  );
}

export default Signin;
