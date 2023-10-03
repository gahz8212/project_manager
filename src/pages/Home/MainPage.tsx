import React from "react";
import HeaderContainer from "../../containers/common/HeaderContainer";

import ListContainer from "../../containers/list/ListContainer";

import MenuContainer from "../../containers/menu/MenuContainer";
type Props = {
  searchVisible: boolean;
  setSearchVisible: (show: boolean) => void;
};
const MainPage: React.FC<Props> = ({ searchVisible, setSearchVisible }) => {
  return (
    <div>
      <HeaderContainer />
      <MenuContainer
        searchVisible={searchVisible}
        setSearchVisible={setSearchVisible}
      />
      <ListContainer searchVisible={searchVisible} />
    </div>
  );
};

export default MainPage;
