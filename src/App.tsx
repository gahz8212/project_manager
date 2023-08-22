import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/LoginPage";
import Join from "./pages/JoinPage";
import Main from "./pages/MainPage";
import Item from "./pages/ItemPage";
import "./App.css";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/join" element={<Join />}></Route>
      <Route path="/main" element={<Main />}></Route>
      <Route path="/item" element={<Item />}></Route>
    </Routes>
  );
};

export default App;
