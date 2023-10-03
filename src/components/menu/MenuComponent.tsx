import React from "react";
import { Link } from "react-router-dom";
import SearchContainer from "../../containers/list/SearchContainer";
type Props = {
  searchVisible: boolean;
  setSearchVisible: (e: boolean) => void;
};
const MenuComponent: React.FC<Props> = ({
  searchVisible,
  setSearchVisible,
}) => {
  return (
    <>
      <div className={"menu-wrapper"}>
        <SearchContainer show={searchVisible} setShow={setSearchVisible} />
        <ul className={`menu ${searchVisible ? "" : "show"}`}>
          <li>
            <Link to="/main">Home</Link>
          </li>
          <li>
            <Link to="/relation">Relation Setting</Link>
          </li>
          <li>
            <Link to="/relation_view">Relation View</Link>
          </li>

          <li>
            <Link to="/">About</Link>
          </li>
        </ul>
        <div className={`space ${searchVisible ? "show" : ""}`}></div>
      </div>
    </>
  );
};

export default MenuComponent;
