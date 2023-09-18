import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/common/header/Header";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../modules/user";
import { RootState } from "../../modules";
import io from "socket.io-client";
// const socket = io.connect("http://localhost:4000");

const socket = io();
const HeaderContainer = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => ({
    user: state.user.user,
  }));

  const [userNames, setUserName] = useState([] as string[]);

  const onClick = () => {
    socket.emit("id", user?.id);

    dispatch(logout());
  };
  const once = useRef(true);
  useEffect(() => {
    if (once.current) {
      once.current = false;
      return;
    } else {
      socket.on("login_user", (data: string) => {
        setUserName((prev) => [...prev, data]);
      });
      socket.on("id", (data) => {
        console.log(data);
      });
      once.current = true;
    }
  }, []);

  return <Header user={user} onClick={onClick} userNames={userNames}></Header>;
};

export default HeaderContainer;
