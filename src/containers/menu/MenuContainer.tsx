import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import MenuComponent from "../../components/menu/MenuComponent";
type Props = {
  searchVisible: boolean;
  setSearchVisible: (show: boolean) => void;
};
const MenuContainer: React.FC<Props> = ({
  searchVisible,
  setSearchVisible,
}) => {
  // const [show, setShow] = useState(false);
  return (
    <MenuComponent
      searchVisible={searchVisible}
      setSearchVisible={setSearchVisible}
    ></MenuComponent>
  );
};

export default MenuContainer;
