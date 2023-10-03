import React from "react";
import HeaderContainer from "../../containers/common/HeaderContainer";
import MenuContainer from "../../containers/menu/MenuContainer";
type Props = {
  searchVisible: boolean;
  setSearchVisible: (e: boolean) => void;
};
const Relation_viewPage: React.FC<Props> = ({
  searchVisible,
  setSearchVisible,
}) => {
  return (
    <div>
      <HeaderContainer />
      <MenuContainer
        searchVisible={searchVisible}
        setSearchVisible={setSearchVisible}
      />
      view
    </div>
  );
};

export default Relation_viewPage;
