import React from "react";
import HeaderContainer from "../../containers/common/HeaderContainer";
import MenuContainer from "../../containers/menu/MenuContainer";
type Props = {
  searchVisible: boolean;
  setSearchVisible: (e: boolean) => void;
   menuItem:string;
};
const Relation_viewPage: React.FC<Props> = ({
  searchVisible,
  setSearchVisible,
  menuItem
}) => {
  return (
    <div>
      <HeaderContainer />
      <MenuContainer
      menuItem={menuItem}
        searchVisible={searchVisible}
        setSearchVisible={setSearchVisible}
      />
      view
    </div>
  );
};

export default Relation_viewPage;
