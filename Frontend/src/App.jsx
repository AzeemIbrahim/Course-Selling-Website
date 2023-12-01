import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import AddCourse from "./AddCourse.jsx";
import "./App.css";
import Signup from "./signup.jsx";
import Signin from "./signin.jsx";
import Appbar from "./Appbar.jsx";

function App() {
  return (
    <>
      <Router>
        <Appbar />
        <div
          style={{
            height: "100vh",
            width: "100vw",
            backgroundColor: "#EEF5FF",
          }}
        >
          <Routes>
            <Route path="/addcourse" element={<AddCourse />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}
export default App;
