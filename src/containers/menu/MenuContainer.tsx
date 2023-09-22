import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import MenuComponent from "../../components/menu/MenuComponent";
const MenuContainer = () => {
  const [show, setShow] = useState(false);
  return <MenuComponent show={show} setShow={setShow}></MenuComponent>;
};

export default MenuContainer;
