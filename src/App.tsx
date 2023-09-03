import React from "react";
// import "./index.css";
import "./components/styles/style.scss";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/LoginPage";
import Join from "./pages/JoinPage";
import Main from "./pages/MainPage";

import "./App.css";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/join" element={<Join />}></Route>
      <Route path="/main" element={<Main />}></Route>

      {/* <Route path="/list" element={<List />}></Route> */}
    </Routes>
  );
};

export default App;
