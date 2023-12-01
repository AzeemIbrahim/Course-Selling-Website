import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
function Appbar() {
  const navigate = useNavigate();
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <Typography variant="h4">courzease</Typography>
      </div>
      <div>
        <Button
          variant="contained"
          style={{ margin: 12 }}
          onClick={() => {
            navigate("/signup");
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
export default Appbar;
