import React from "react";
import { Link } from "react-router-dom";
import SearchContainer from "../../containers/list/SearchContainer";
type Props = {
  show: boolean;
  setShow: (e: boolean) => void;
};
const MenuComponent: React.FC<Props> = ({ show, setShow }) => {
  return (
    <>
      <div className={"menu-wrapper"}>
        <SearchContainer show={show} setShow={setShow} />
        <ul className={`menu ${show ? "show" : ""}`}>
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
      <div className={`space ${show ? "show" : ""}`}></div>
    </>
  );
};

export default MenuComponent;
