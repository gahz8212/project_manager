import React from "react";
import { Link } from "react-router-dom";
type Props = {};
const MenuComponent = () => {
  return (
    <div className="menu-wrapper">
      <ul className="menu">
        <li>
          <Link to="/main">Home</Link>
        </li>
        <li>
          <Link to="/">Relation Setting</Link>
        </li>
        <li>
          <Link to="/">Relation View</Link>
        </li>

        <li>
          <Link to="/">About</Link>
        </li>
      </ul>
    </div>
  );
};

export default MenuComponent;
