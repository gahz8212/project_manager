import React from "react";
import HeaderContainer from "../containers/common/HeaderContainer";
// import MainContainer from "../containers/main/MainContainer";
import ListContainer from "../containers/list/ListContainer";
// import SearchContainer from "../containers/list/SearchContainer";
import MenuContainer from "../containers/menu/MenuContainer";

const MainPage = () => {
  return (
    <div>
      <HeaderContainer />
      <ListContainer>
        <MenuContainer />
        {/* <SearchContainer /> */}
      </ListContainer>
    </div>
  );
};

export default MainPage;
