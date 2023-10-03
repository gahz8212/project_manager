import React from "react";
import HeaderContainer from "../../containers/common/HeaderContainer";
import MenuContainer from "../../containers/menu/MenuContainer";
import RelationMain from "../../containers/relation/RelationContainer";
type Props = {
  searchVisible: boolean;
  setSearchVisible: (e: boolean) => void;
};
const Relation: React.FC<Props> = ({ searchVisible, setSearchVisible }) => {
  return (
    <div>
      <HeaderContainer />
      <MenuContainer
        searchVisible={searchVisible}
        setSearchVisible={setSearchVisible}
      />
      <RelationMain />
    </div>
  );
};

export default Relation;
