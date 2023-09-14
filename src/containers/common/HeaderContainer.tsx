import React, { useEffect } from "react";
import Header from "../../components/common/header/Header";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../modules/user";
import { RootState } from "../../modules";
import io from "socket.io-client";
const socket = io("http://localhost:4000");
const HeaderContainer = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => ({
    user: state.user.user,
  }));
  const onClick = () => {
    dispatch(logout());
  };
  useEffect(() => {
    socket.on("login", (data) => {
      console.log(data);
    });
  });
  return <Header user={user} onClick={onClick}></Header>;
};

export default HeaderContainer;
