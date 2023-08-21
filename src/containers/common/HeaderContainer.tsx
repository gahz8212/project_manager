import React from "react";
import Header from "../../components/common/header/Header";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../modules/user";
import { RootState } from "../../modules";
const HeaderContainer = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => ({
    user: state.user.user,
  }));
  const onClick = () => {
    dispatch(logout());
  };
  return <Header user={user} onClick={onClick}></Header>;
};

export default HeaderContainer;
