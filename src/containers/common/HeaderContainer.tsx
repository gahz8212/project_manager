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

  const [userNames, setUserName] = useState(
    [] as { id: number; name: string; rank: string }[]
  );

  const onClick = () => {
    socket.emit("id", user?.id);
    // setUserName((prev) => [...prev, "bbb"]);
    dispatch(logout(user?.id));
    setUserName((prev) => prev.filter((p) => p.id !== user?.id));
    // console.log(userNames);
  };

  const once = useRef(true);

  useEffect(() => {
    setUserName(userList);
  }, [userList]);

  useEffect(() => {
    if (once.current) {
      socket.on(
        "login_user",
        (data: { id: number; name: string; rank: string }) => {
          setUserName((prev) => [...prev, data]);
          console.log("login_user", data);
          once.current = false;
        }
      );

      socket.on("logout_user", (id: number) => {
        setUserName((prev) => prev.filter((p) => p.id !== id));
        console.log("logout_user");
        once.current = false;
      });
    }
  }, []);

  // useEffect(() => {
  //   if (once.current) {
  //     console.log(userNames);
  //     once.current = false;
  //   } else {
  //     return;
  //   }
  // }, [userNames]);
  return <Header user={user} onClick={onClick} userNames={userNames}></Header>;
};

export default HeaderContainer;
