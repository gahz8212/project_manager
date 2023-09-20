import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/common/header/Header";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../modules/user";
import { RootState } from "../../modules";
import io from "socket.io-client";
// const socket = io.connect("http://localhost:4000");

const socket = io("http://localhost:4000", {
  withCredentials: true,
  transports: ["websocket"],
});
const HeaderContainer = () => {
  const dispatch = useDispatch();
  const { user, userList } = useSelector((state: RootState) => ({
    user: state.user.user,
    userList: state.user.userList,
  }));

  const [userNames, setUserName] = useState([] as { name: string }[]);

  const onClick = () => {
    socket.emit("id", user?.id);
    // setUserName((prev) => [...prev, "bbb"]);
    dispatch(logout(user?.name));
    // setUserName((prev) => prev.filter((p) => p !== user?.name));
    // console.log(userNames);
  };

  const once = useRef(true);

  // useEffect(() => {
  //   if (once.current) {
  //     // console.log("시작", userList);
  //     userList.forEach((list) => {
  //       const el = Object.values(list);
  //       console.log(el[0]);
  //       setUserName((prev) => [...prev, el[0]]);
  //     });
  //     once.current = false;
  //     return;
  //   } else {
  //     return;
  //   }
  // }, [userList]);

  // useEffect(() => {
  //   if (once.current) {
  //     socket.on("login_user", (data: string) => {
  //       setUserName((prev) => [...prev, data]);
  //       console.log("login_user", data);
  //       once.current = false;
  //     });

  //     socket.on("logout_user", (data: string) => {
  //       setUserName((prev) => prev.filter((p) => p !== data));
  //       console.log("logout_user");
  //       once.current = false;
  //     });
  //   } else {
  //     return;
  //   }
  // }, []);

  useEffect(() => {
    if (once.current) {
      console.log(userNames);
      once.current = false;
    } else {
      return;
    }
  }, [userNames]);
  return <Header user={user} onClick={onClick} userNames={userNames}></Header>;
};

export default HeaderContainer;
