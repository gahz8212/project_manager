import React from "react";
import { Link } from "react-router-dom";
import SearchContainer from "../../containers/list/SearchContainer";
type Props = {
  searchVisible: boolean;
  setSearchVisible: (e: boolean) => void;
  menuItem:string;

};
const MenuComponent: React.FC<Props> = ({
  searchVisible,
  setSearchVisible,
menuItem
}) => {
  // const[menuItem,setMenuItem]=useState('main')

  const underbar=(item:string,menuItem:string)=>{
return(item===menuItem)
  }
  return (
    <>
      <div className={"menu-wrapper"}>
        <SearchContainer show={searchVisible} setShow={setSearchVisible} />
        <ul className={`menu ${searchVisible ? "" : "show"}`}>
          <li  className={underbar('main',menuItem)?'selected':''} >
            <Link to="/main">Home</Link>
          </li>
          <li    className={underbar('relation',menuItem)?'selected':''} >
            <Link to="/relation">Relation Setting</Link>
          </li>
          <li  className={underbar('relation_view',menuItem)?'selected':''} >
            <Link to="/relation_view">Relation View</Link>
          </li>
          <li  className={underbar('about',menuItem)?'selected':''} >
            <Link to="/">About</Link>
          </li>
        </ul>
        <div className={`space ${searchVisible ? "show" : ""}`}></div>
      </div>
    </>
  );
};

export default MenuComponent;
