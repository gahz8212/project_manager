import React from "react";
import HeaderContainer from "../containers/common/HeaderContainer";
// import MainContainer from "../containers/main/MainContainer";
import ListContainer from "../containers/list/ListContainer";
import SearchContainer from "../containers/list/SearchContainer";

const MainPage = () => {
  return (
    <div>
      <HeaderContainer />
      <ListContainer>
        <SearchContainer />
      </ListContainer>
    </div>
  );
};

export default MainPage;
