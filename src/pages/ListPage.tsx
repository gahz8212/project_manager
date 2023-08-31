import React from "react";
import HeaderContainer from "../containers/common/HeaderContainer";
import ListContainer from "../containers/list/ListContainer";
import SearchContainer from "../containers/list/SearchContainer";
const ListPage = () => {
  return (
    <div>
      <HeaderContainer />
      <ListContainer>
        <SearchContainer />
      </ListContainer>
    </div>
  );
};

export default ListPage;
