import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function Appbar() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null);
  useEffect(() => {
    function callback2(data) {
      console.log("Callback 2 data:", data);
      if (data.username) {
        setUserEmail(data.username);
      }
    }
    function callback1(res) {
      res.json().then(callback2);
    }
    fetch("http://localhost:3000/admin/me", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then(callback1);
  }, []);
  if (userEmail) {
    return (
      <div
        style={{ display: "flex", justifyContent: "space-between", padding: 4 }}
      >
        <div>
          <Typography variant="h4">courzease</Typography>
        </div>
        <div>
          <div style={{ display: "flex" }}>
            <div>{userEmail}</div>
          </div>
          <Button
            variant="contained"
            style={{ marginRight: 12 }}
            onClick={() => {
              localStorage.setItem("token", null);
              window.location = "/";
            }}
          >
            log Out
          </Button>
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{ display: "flex", justifyContent: "space-between", padding: 4 }}
      >
        <div>
          <Typography variant="h4">courzease</Typography>
        </div>
        <div>
          <Button
            variant="contained"
            style={{ margin: 12 }}
            onClick={() => {
              window.location = "/signup";
            }}
          >
            sign up
          </Button>

          <Button
            variant="contained"
            style={{ marginRight: 12 }}
            onClick={() => {
              navigate("/signin");
            }}
          >
            sign in
          </Button>
        </div>
      </div>
    );
  }
}

export default Appbar;
