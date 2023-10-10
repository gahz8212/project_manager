import React from "react";


import MenuComponent from "../../components/menu/MenuComponent";
type Props = {
  searchVisible: boolean;
  setSearchVisible: (show: boolean) => void;
  menuItem:string;
};
const MenuContainer: React.FC<Props> = ({
  searchVisible,
  setSearchVisible,
  menuItem
}) => {
  return (
    <MenuComponent
      searchVisible={searchVisible}
      setSearchVisible={setSearchVisible}
      menuItem={menuItem}

    ></MenuComponent>
  );
};

export default MenuContainer;
