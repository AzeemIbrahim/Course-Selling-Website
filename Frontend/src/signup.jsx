import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { useState } from "react";

function Signup() {
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
            id="username"
            label="username"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            onChange={(p) => {
              setPassword(p.target.value);
            }}
            fullWidth
            id="password"
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
              fetch("http://localhost:3000/admin/signup", {
                method: "POST",
                body: JSON.stringify({ username: email, password: password }),
                headers: { "content-type": "application/json" },
              })
                .then((res) => {
                  return res.json();
                })
                .then((data) => {
                  console.log(data);
                  localStorage.setItem("token", data.token);
                });
            }}
          >
            Sign Up
          </Button>
          <br />
          <br />
        </Typography>
      </Card>
    </div>
  );
}

export default Signup;
