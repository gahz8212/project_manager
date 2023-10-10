import React from "react";
import HeaderContainer from "../../containers/common/HeaderContainer";
import MenuContainer from "../../containers/menu/MenuContainer";
import RelationMain from "../../containers/relation/RelationContainer";
type Props = {
  searchVisible: boolean;
  setSearchVisible: (e: boolean) => void;
  menuItem:string;
};
const Relation: React.FC<Props> = ({ searchVisible, setSearchVisible,menuItem }) => {
  return (
    <div>
      <HeaderContainer />
      <MenuContainer
      menuItem={menuItem}
        searchVisible={searchVisible}
        setSearchVisible={setSearchVisible}
      />
      <RelationMain />
    </div>
  );
};

export default Relation;
