import React, { useState } from "react";
// import "./index.css";
import "./components/styles/style.scss";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Home/LoginPage";
import Join from "./pages/Home/JoinPage";
import Main from "./pages/Home/MainPage";
import Relation from "./pages/Relation-Setting/RelationPage";
import RelationView from "./pages/Relation-Setting/Relation_viewPage";

import "./App.css";
const App = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/join" element={<Join />}></Route>
      <Route
        path="/main"
        element={
          <Main
          menuItem="main"
            searchVisible={searchVisible}
            setSearchVisible={setSearchVisible}
          />
        }
      ></Route>
      <Route
        path="/relation"
        element={
          <Relation
          menuItem="relation"
            searchVisible={searchVisible}
            setSearchVisible={setSearchVisible}
          />
        }
      ></Route>
      <Route
        path="/relation_view"
        element={
          <RelationView
          menuItem="relation_view"
            searchVisible={searchVisible}
            setSearchVisible={setSearchVisible}
          />
        }
      ></Route>

      {/* <Route path="/list" element={<List />}></Route> */}
    </Routes>
  );
};

export default App;
